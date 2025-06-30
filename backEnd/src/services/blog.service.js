const { Post, PostActivity, PostData, User, Category } = require("../models")
const Helpers = require("../utils/helpers")
const { Op } = require("sequelize")

class BlogService {
  async createPost(postData) {
    const post = await Post.create({
      id: Helpers.generateUUID(),
      ...postData,
    })

    return await this.getPostById(post.id)
  }

  async getAllPosts(queryParams) {
    const { page = 0, limit = 10, category_id, search } = queryParams
    const { limit: pageLimit, offset } = Helpers.getPagination(page, limit)

    const whereClause = {
      is_active: true,
      is_deleted: false,
    }

    if (category_id) {
      whereClause.category_id = category_id
    }

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
        { tags: { [Op.like]: `%${search}%` } },
      ]
    }

    const posts = await Post.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "first_name", "last_name", "email"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
      limit: pageLimit,
      offset,
      order: [["created_at", "DESC"]],
    })

    return Helpers.getPagingData(posts, page, pageLimit)
  }

  async getPostById(postId) {
    const post = await Post.findOne({
      where: {
        id: postId,
        is_active: true,
        is_deleted: false,
      },
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "first_name", "last_name", "email"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
        {
          model: PostData,
          as: "attachments",
          where: { is_active: true, is_deleted: false },
          required: false,
        },
      ],
    })

    if (!post) {
      const error = new Error("Post not found")
      error.statusCode = 404
      throw error
    }

    return post
  }

  async updatePost(postId, updateData, user) {
    const post = await Post.findOne({
      where: {
        id: postId,
        is_active: true,
        is_deleted: false,
      },
    })

    if (!post) {
      const error = new Error("Post not found")
      error.statusCode = 404
      throw error
    }

    // Check if user owns the post or is admin
    if (post.user_id !== user.id && user.role !== 0) {
      const error = new Error("You can only update your own posts")
      error.statusCode = 403
      throw error
    }

    await Post.update(updateData, {
      where: { id: postId },
    })

    return await this.getPostById(postId)
  }

  async deletePost(postId, user) {
    const post = await Post.findOne({
      where: {
        id: postId,
        is_active: true,
        is_deleted: false,
      },
    })

    if (!post) {
      const error = new Error("Post not found")
      error.statusCode = 404
      throw error
    }

    // Check if user owns the post or is admin
    if (post.user_id !== user.id && user.role !== 0) {
      const error = new Error("You can only delete your own posts")
      error.statusCode = 403
      throw error
    }

    await Post.update(
      {
        is_deleted: true,
        updated_by: user.id,
        updated_at: new Date(),
      },
      { where: { id: postId } },
    )
  }

  async getMyPosts(userId, queryParams) {
    const { page = 0, limit = 10, search } = queryParams
    const { limit: pageLimit, offset } = Helpers.getPagination(page, limit)

    const whereClause = {
      user_id: userId,
      is_deleted: false,
    }

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
        { tags: { [Op.like]: `%${search}%` } },
      ]
    }

    const posts = await Post.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
      limit: pageLimit,
      offset,
      order: [["created_at", "DESC"]],
    })

    return Helpers.getPagingData(posts, page, pageLimit)
  }

  async addPostActivity(activityData) {
    // Check if post exists
    const post = await Post.findOne({
      where: {
        id: activityData.post_id,
        is_active: true,
        is_deleted: false,
      },
    })

    if (!post) {
      const error = new Error("Post not found")
      error.statusCode = 404
      throw error
    }

    const activity = await PostActivity.create({
      id: Helpers.generateUUID(),
      ...activityData,
    })

    return activity
  }

  async getPostActivities(postId, queryParams) {
    const { page = 0, limit = 10 } = queryParams
    const { limit: pageLimit, offset } = Helpers.getPagination(page, limit)

    const activities = await PostActivity.findAndCountAll({
      where: {
        post_id: postId,
        is_active: true,
        is_deleted: false,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "first_name", "last_name"],
        },
      ],
      limit: pageLimit,
      offset,
      order: [["created_at", "DESC"]],
    })

    return Helpers.getPagingData(activities, page, pageLimit)
  }

  async forceDeletePost(postId) {
    const post = await Post.findByPk(postId)

    if (!post) {
      const error = new Error("Post not found")
      error.statusCode = 404
      throw error
    }

    await Post.destroy({ where: { id: postId } })
  }

  async getAllPostsAdmin(queryParams) {
    const { page = 0, limit = 10, user_id, category_id, search } = queryParams
    const { limit: pageLimit, offset } = Helpers.getPagination(page, limit)

    const whereClause = {}

    if (user_id) {
      whereClause.user_id = user_id
    }

    if (category_id) {
      whereClause.category_id = category_id
    }

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
        { tags: { [Op.like]: `%${search}%` } },
      ]
    }

    const posts = await Post.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "first_name", "last_name", "email"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
      limit: pageLimit,
      offset,
      order: [["created_at", "DESC"]],
    })

    return Helpers.getPagingData(posts, page, pageLimit)
  }
}

module.exports = new BlogService()
