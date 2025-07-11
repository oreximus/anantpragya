/**
 * The post service is responsible for all database interaction and core business logic
 * related to post operations
 */
const { Op } = require("sequelize");
const db = require("_helpers/db");
const common = require("_helpers/common");
const catchError = require("_middleware/catch-error");
const path = require("path");
const fs = require("fs");

module.exports = {
  getPostCategories,
  getPostList,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  addComment,
  getPostComments,
};

// Get Post Categories
async function getPostCategories() {
  try {
    const categories = await db.PostCategory.findAll({
      where: {
        is_deleted: 0,
        is_active: 1,
      },
      order: [["name", "ASC"]],
    });

    if (!categories || categories.length === 0) {
      throw "No categories found!";
    }

    return categories;
  } catch (err) {
    console.log(err);
    throw catchError(err);
  }
}

// Get Post List
async function getPostList(params) {
  try {
    const pageAttr = await common.pagination(
      params.page || 1,
      params.limit || 10,
    );

    const whereCondition = {
      is_deleted: 0,
      is_active: 1,
    };

    // Search functionality
    if (params.search) {
      whereCondition[Op.or] = [
        { title: { [Op.like]: `%${params.search}%` } },
        { post_data: { [Op.like]: `%${params.search}%` } },
        { summary: { [Op.like]: `%${params.search}%` } }, // Search in summary
        { tags: { [Op.like]: `%${params.search}%` } }, // Search in tags
      ];
    }

    // Filter by category
    if (params.category_id) {
      whereCondition.category_id = params.category_id;
    }

    const output = await db.Post.findAndCountAll({
      where: whereCondition,
      include: [
        {
          model: db.PostCategory,
          attributes: ["id", "name"],
        },
        {
          model: db.User,
          as: "author",
          attributes: ["id", "first_name", "last_name", "email"],
        },
        {
          model: db.PostActivity,
          as: "activities",
          where: { is_deleted: 0 },
          required: false,
          attributes: ["id", "is_liked", "created_by"],
        },
        {
          model: db.PostFile, // Include post files
          as: "files",
          where: { is_deleted: 0 },
          required: false,
          attributes: ["id", "original_name", "file_path"],
        },
      ],
      order: [["created_at", "DESC"]],
      limit: pageAttr.limit,
      offset: pageAttr.offset,
    });

    if (output.count <= 0) {
      throw "No posts found!";
    }

    return output;
  } catch (err) {
    console.log(err);
    throw catchError(err);
  }
}

// Get Post By ID
async function getPostById(postId) {
  console.log("YEH RUN HO RAHA HAI");
  try {
    console.log(postId, "<==POST ID");
    const post = await db.Post.findOne({
      where: {
        id: postId,
        is_deleted: 0,
        is_active: 1,
      },
      include: [
        {
          model: db.PostCategory,
          attributes: ["id", "name"],
        },
        {
          model: db.User,
          as: "author",
          attributes: ["id", "first_name", "last_name", "email"],
        },
        {
          model: db.PostActivity,
          as: "activities",
          where: { is_deleted: 0 },
          required: false,
          include: [
            {
              model: db.User,
              as: "user",
              attributes: ["id", "first_name", "last_name"],
            },
          ],
        },
        {
          model: db.PostFile,
          as: "files",
          where: { is_deleted: 0 },
          required: false,
          attributes: ["id", "original_name", "file_path"],
        },
      ],
    });

    if (!post) {
      throw "Post not found!";
    }

    return post;
  } catch (err) {
    console.log(err);
    throw catchError(err);
  }
}

// Create Post
async function createPost(params, auth, file) {
  // Added file parameter
  try {
    // Find category ID from category name
    let categoryId = null;
    if (params.category) {
      const category = await db.PostCategory.findOne({
        where: { name: params.category, is_deleted: 0, is_active: 1 },
      });
      if (category) {
        categoryId = category.id;
      } else {
        throw "Invalid category provided!";
      }
    }

    const post = new db.Post();
    post.category_id = categoryId;
    post.title = params.title;
    post.summary = params.summary || null; // New field
    post.post_data = params.content || null; // Maps to content from frontend
    post.tags = params.tags || []; // New field, will be JSON stringified by model setter
    post.status = params.status || "draft"; // New field
    post.created_at = common.curDateTime();
    post.created_by = auth.user_id;
    post.updated_at = common.curDateTime();
    post.updated_by = auth.user_id;

    const savedPost = await post.save();

    // Handle featured image upload
    if (file) {
      const postFile = new db.PostFile();
      postFile.post_id = savedPost.id;
      postFile.original_name = file.originalname;
      // file.path is the absolute path, file.uploaded_path is the relative path from public
      postFile.file_path = path.join("/", file.uploaded_path, file.filename); // Store relative path
      postFile.created_at = common.curDateTime(); // Assuming created_at/by are not in model, add if needed
      postFile.created_by = auth.user_id;
      await postFile.save();
    }

    return { id: savedPost.id, message: "Post created successfully" };
  } catch (err) {
    console.log(err);
    throw catchError(err);
  }
}

// Update Post
async function updatePost(params, auth, file) {
  // Added file parameter
  try {
    const post = await db.Post.findOne({
      where: {
        id: params.id,
        is_deleted: 0,
      },
    });

    if (!post) {
      throw "Post not found!";
    }

    // Check if user is the author or admin
    const user = await db.User.findOne({
      where: { id: auth.user_id },
    });

    if (post.created_by !== auth.user_id && !user.is_admin) {
      throw "Unauthorized! You can only edit your own posts.";
    }

    // Find category ID from category name if provided
    let categoryId = post.category_id;
    if (params.category) {
      const category = await db.PostCategory.findOne({
        where: { name: params.category, is_deleted: 0, is_active: 1 },
      });
      if (category) {
        categoryId = category.id;
      } else {
        throw "Invalid category provided!";
      }
    }

    post.category_id = categoryId;
    post.title = params.title || post.title;
    post.summary = params.summary !== undefined ? params.summary : post.summary; // New field
    post.post_data =
      params.content !== undefined ? params.content : post.post_data; // Maps to content
    post.tags = params.tags !== undefined ? params.tags : post.tags; // New field
    post.status = params.status !== undefined ? params.status : post.status; // New field
    post.updated_at = common.curDateTime();
    post.updated_by = auth.user_id;

    await post.save();

    // Handle featured image update
    if (file) {
      // Delete existing featured image for this post if any
      await db.PostFile.destroy({
        where: {
          post_id: post.id,
          is_deleted: 0,
        },
      });

      const postFile = new db.PostFile();
      postFile.post_id = post.id;
      postFile.original_name = file.originalname;
      postFile.file_path = path.join("/", file.uploaded_path, file.filename); // Store relative path
      postFile.created_at = common.curDateTime(); // Assuming created_at/by are not in model, add if needed
      postFile.created_by = auth.user_id;
      await postFile.save();
    }

    return { message: "Post updated successfully" };
  } catch (err) {
    console.log(err);
    throw catchError(err);
  }
}

// Delete Post
async function deletePost(params, auth) {
  try {
    const post = await db.Post.findOne({
      where: {
        id: params.id,
        is_deleted: 0,
      },
    });

    if (!post) {
      throw "Post not found!";
    }

    // Check if user is the author or admin
    const user = await db.User.findOne({
      where: { id: auth.user_id },
    });

    if (post.created_by !== auth.user_id && !user.is_admin) {
      throw "Unauthorized! You can only delete your own posts.";
    }

    post.is_deleted = 1;
    post.updated_at = common.curDateTime();
    post.updated_by = auth.user_id;

    await post.save();

    return { message: "Post deleted successfully" };
  } catch (err) {
    console.log(err);
    throw catchError(err);
  }
}

// Like/Unlike Post
async function likePost(params, auth) {
  try {
    const post = await db.Post.findOne({
      where: {
        id: params.post_id,
        is_deleted: 0,
        is_active: 1,
      },
    });

    if (!post) {
      throw "Post not found!";
    }

    // Check if user already liked the post
    const existingActivity = await db.PostActivity.findOne({
      where: {
        post_id: params.post_id,
        created_by: auth.user_id,
        is_deleted: 0,
      },
    });

    if (existingActivity) {
      // Toggle like status
      existingActivity.is_liked = existingActivity.is_liked ? 0 : 1;
      existingActivity.updated_at = common.curDateTime();
      existingActivity.updated_by = auth.user_id;
      await existingActivity.save();
    } else {
      // Create new activity
      const activity = new db.PostActivity();
      activity.post_id = params.post_id;
      activity.is_liked = 1;
      activity.created_at = common.curDateTime();
      activity.created_by = auth.user_id;
      activity.updated_at = common.curDateTime();
      activity.updated_by = auth.user_id;
      await activity.save();
    }

    return { message: "Post liked/unliked successfully" };
  } catch (err) {
    console.log(err);
    throw catchError(err);
  }
}

// Add Comment
async function addComment(params, auth) {
  try {
    const post = await db.Post.findOne({
      where: {
        id: params.post_id,
        is_deleted: 0,
        is_active: 1,
      },
    });

    if (!post) {
      throw "Post not found!";
    }

    const comment = new db.PostComment();
    comment.post_id = params.post_id;
    comment.comment = params.comment;
    comment.created_at = common.curDateTime();
    comment.created_by = auth.user_id;
    comment.updated_at = common.curDateTime();
    comment.updated_by = auth.user_id;

    const savedComment = await comment.save();

    return { id: savedComment.id, message: "Comment added successfully" };
  } catch (err) {
    console.log(err);
    throw catchError(err);
  }
}

// Get Post Comments
async function getPostComments(postId, params) {
  try {
    const pageAttr = await common.pagination(
      params.page || 1,
      params.limit || 10,
    );

    const output = await db.PostComment.findAndCountAll({
      where: {
        post_id: postId,
        is_deleted: 0,
        is_active: 1,
      },
      include: [
        {
          model: db.User,
          as: "author",
          attributes: ["id", "first_name", "last_name", "email"],
        },
        {
          model: db.CommentFile,
          as: "files",
          where: { is_deleted: 0 },
          required: false,
          attributes: ["id", "original_name", "file_path"],
        },
      ],
      order: [["created_at", "DESC"]],
      limit: pageAttr.limit,
      offset: pageAttr.offset,
    });

    if (output.count <= 0) {
      throw "No comments found!";
    }

    return output;
  } catch (err) {
    console.log(err);
    throw catchError(err);
  }
}
