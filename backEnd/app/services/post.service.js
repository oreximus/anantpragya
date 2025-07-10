/**
 * The post service is responsible for all database interaction and core business logic
 * related to post operations
 */
const { Op } = require("sequelize");
const db = require("_helpers/db");
const common = require("_helpers/common");
const catchError = require("_middleware/catch-error");

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
async function createPost(params, auth) {
  try {
    const post = new db.Post();
    post.category_id = params.category_id || null;
    post.title = params.title;
    post.post_data = params.post_data || null;
    post.created_at = common.curDateTime();
    post.created_by = auth.user_id;
    post.updated_at = common.curDateTime();
    post.updated_by = auth.user_id;

    const savedPost = await post.save();

    return { id: savedPost.id, message: "Post created successfully" };
  } catch (err) {
    console.log(err);
    throw catchError(err);
  }
}

// Update Post
async function updatePost(params, auth) {
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

    post.category_id = params.category_id || post.category_id;
    post.title = params.title || post.title;
    post.post_data = params.post_data || post.post_data;
    post.updated_at = common.curDateTime();
    post.updated_by = auth.user_id;

    await post.save();

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
