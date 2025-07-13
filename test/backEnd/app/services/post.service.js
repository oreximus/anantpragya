/**
 * The post service is responsible for all database interaction and core business logic
 * related to post operations
 */
const { Op } = require("sequelize")
const db = require("_helpers/db")
const common = require("_helpers/common")
const catchError = require("_middleware/catch-error")
const path = require("path")
const fs = require("fs") // Still needed if other parts of the app use local file system
const { s3UploadSingle } = require("_middleware/s3Upload") // Import S3 upload service

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
}

// Get Post Categories
async function getPostCategories() {
  try {
    const categories = await db.PostCategory.findAll({
      where: {
        is_deleted: 0,
        is_active: 1,
      },
      order: [["name", "ASC"]],
    })

    if (!categories || categories.length === 0) {
      throw "No categories found!"
    }

    return categories
  } catch (err) {
    console.log(err)
    throw catchError(err)
  }
}

// Get Post List
async function getPostList(params) {
  try {
    const pageAttr = await common.pagination(params.page || 1, params.limit || 10)

    const whereCondition = {
      is_deleted: 0,
      is_active: 1,
    }

    // Search functionality
    if (params.search) {
      whereCondition[Op.or] = [
        { title: { [Op.like]: `%${params.search}%` } },
        { post_data: { [Op.like]: `%${params.search}%` } },
        { summary: { [Op.like]: `%${params.search}%` } }, // Search in summary
        { tags: { [Op.like]: `%${params.search}%` } }, // Search in tags
      ]
    }

    // Filter by category
    if (params.category_id) {
      whereCondition.category_id = params.category_id
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
    })

    if (output.count <= 0) {
      throw "No posts found!"
    }

    return output
  } catch (err) {
    console.log(err)
    throw catchError(err)
  }
}

// Get Post By ID
async function getPostById(postId) {
  console.log("YEH RUN HO RAHA HAI")
  try {
    console.log(postId, "<==POST ID")
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
    })

    if (!post) {
      throw "Post not found!"
    }

    return post
  } catch (err) {
    console.log(err)
    throw catchError(err)
  }
}

// Create Post
async function createPost(params, auth, file) {
  try {
    // Find category ID from category name
    let categoryId = null
    if (params.category) {
      const category = await db.PostCategory.findOne({
        where: { name: params.category, is_deleted: 0, is_active: 1 },
      })
      if (category) {
        categoryId = category.id
      } else {
        throw "Invalid category provided!"
      }
    }

    const post = new db.Post()
    post.category_id = categoryId
    post.title = params.title
    post.summary = params.summary || null
    post.post_data = params.content || null
    post.tags = params.tags || []
    post.status = params.status || "draft"
    post.created_at = common.curDateTime()
    post.created_by = auth.user_id
    post.updated_at = common.curDateTime()
    post.updated_by = auth.user_id

    const savedPost = await post.save()

    // Handle featured image upload to S3
    if (file) {
      const s3Result = await s3UploadSingle(file, "posts") // Upload to 'posts' folder in S3
      if (s3Result.status) {
        const postFile = new db.PostFile()
        postFile.post_id = savedPost.id
        postFile.original_name = s3Result.originalname // Store original name
        postFile.file_path = s3Result.Location // Store S3 URL
        postFile.created_at = common.curDateTime()
        postFile.created_by = auth.user_id
        await postFile.save()
      } else {
        // Handle S3 upload failure, e.g., log error or throw
        console.error("S3 upload failed:", s3Result)
        // Optionally, delete the created post if file upload is critical
        // await savedPost.destroy();
        throw "Failed to upload featured image to S3."
      }
    }

    return { id: savedPost.id, message: "Post created successfully" }
  } catch (err) {
    console.log(err)
    throw catchError(err)
  }
}

// Update Post
async function updatePost(params, auth, file) {
  try {
    const post = await db.Post.findOne({
      where: {
        id: params.id,
        is_deleted: 0,
      },
    })

    if (!post) {
      throw "Post not found!"
    }

    // Check if user is the author or admin
    const user = await db.User.findOne({
      where: { id: auth.user_id },
    })

    if (post.created_by !== auth.user_id && !user.is_admin) {
      throw "Unauthorized! You can only edit your own posts."
    }

    // Find category ID from category name if provided
    let categoryId = post.category_id
    if (params.category) {
      const category = await db.PostCategory.findOne({
        where: { name: params.category, is_deleted: 0, is_active: 1 },
      })
      if (category) {
        categoryId = category.id
      } else {
        throw "Invalid category provided!"
      }
    }

    post.category_id = categoryId
    post.title = params.title || post.title
    post.summary = params.summary !== undefined ? params.summary : post.summary
    post.post_data = params.content !== undefined ? params.content : post.post_data
    post.tags = params.tags !== undefined ? params.tags : post.tags
    post.status = params.status !== undefined ? params.status : post.status
    post.updated_at = common.curDateTime()
    post.updated_by = auth.user_id

    await post.save()

    // Handle featured image update to S3
    if (file) {
      // Delete existing featured image record for this post if any
      // Note: This only deletes the database record, not the actual file from S3.
      // Implementing S3 file deletion would require an additional S3 delete function.
      await db.PostFile.destroy({
        where: {
          post_id: post.id,
          is_deleted: 0,
        },
      })

      const s3Result = await s3UploadSingle(file, "posts") // Upload to 'posts' folder in S3
      if (s3Result.status) {
        const postFile = new db.PostFile()
        postFile.post_id = post.id
        postFile.original_name = s3Result.originalname // Store original name
        postFile.file_path = s3Result.Location // Store S3 URL
        postFile.created_at = common.curDateTime()
        postFile.created_by = auth.user_id
        await postFile.save()
      } else {
        // Handle S3 upload failure
        console.error("S3 upload failed:", s3Result)
        throw "Failed to upload featured image to S3."
      }
    }

    return { message: "Post updated successfully" }
  } catch (err) {
    console.log(err)
    throw catchError(err)
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
    })

    if (!post) {
      throw "Post not found!"
    }

    // Check if user is the author or admin
    const user = await db.User.findOne({
      where: { id: auth.user_id },
    })

    if (post.created_by !== auth.user_id && !user.is_admin) {
      throw "Unauthorized! You can only delete your own posts."
    }

    post.is_deleted = 1
    post.updated_at = common.curDateTime()
    post.updated_by = auth.user_id

    await post.save()

    return { message: "Post deleted successfully" }
  } catch (err) {
    console.log(err)
    throw catchError(err)
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
    })

    if (!post) {
      throw "Post not found!"
    }

    // Check if user already liked the post
    const existingActivity = await db.PostActivity.findOne({
      where: {
        post_id: params.post_id,
        created_by: auth.user_id,
        is_deleted: 0,
      },
    })

    if (existingActivity) {
      // Toggle like status
      existingActivity.is_liked = existingActivity.is_liked ? 0 : 1
      existingActivity.updated_at = common.curDateTime()
      existingActivity.updated_by = auth.user_id
      await existingActivity.save()
    } else {
      // Create new activity
      const activity = new db.PostActivity()
      activity.post_id = params.post_id
      activity.is_liked = 1
      activity.created_at = common.curDateTime()
      activity.created_by = auth.user_id
      activity.updated_at = common.curDateTime()
      activity.updated_by = auth.user_id
      await activity.save()
    }

    return { message: "Post liked/unliked successfully" }
  } catch (err) {
    console.log(err)
    throw catchError(err)
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
    })

    if (!post) {
      throw "Post not found!"
    }

    const comment = new db.PostComment()
    comment.post_id = params.post_id
    comment.comment = params.comment
    comment.created_at = common.curDateTime()
    comment.created_by = auth.user_id
    comment.updated_at = common.curDateTime()
    comment.updated_by = auth.user_id

    const savedComment = await comment.save()

    return { id: savedComment.id, message: "Comment added successfully" }
  } catch (err) {
    console.log(err)
    throw catchError(err)
  }
}

// Get Post Comments
async function getPostComments(postId, params) {
  try {
    const pageAttr = await common.pagination(params.page || 1, params.limit || 10)

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
    })

    if (output.count <= 0) {
      throw "No comments found!"
    }

    return output
  } catch (err) {
    console.log(err)
    throw catchError(err)
  }
}
