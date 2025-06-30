const blogService = require("../services/blog.service")
const ApiResponse = require("../utils/response")
const logger = require("../utils/logger")

class BlogController {
  async createPost(req, res) {
    try {
      const postData = { ...req.body, user_id: req.user.id, created_by: req.user.id }
      const result = await blogService.createPost(postData)
      logger.info(`New post created by user: ${req.user.id}`)
      return ApiResponse.success(res, result, "Post created successfully", 201)
    } catch (error) {
      logger.error("Create post error:", error)
      return ApiResponse.error(res, error.message, error.statusCode || 500)
    }
  }

  async getAllPosts(req, res) {
    try {
      const result = await blogService.getAllPosts(req.query)
      return ApiResponse.success(res, result, "Posts retrieved successfully")
    } catch (error) {
      logger.error("Get all posts error:", error)
      return ApiResponse.error(res, error.message, error.statusCode || 500)
    }
  }

  async getPostById(req, res) {
    try {
      const result = await blogService.getPostById(req.params.id)
      return ApiResponse.success(res, result, "Post retrieved successfully")
    } catch (error) {
      logger.error("Get post by ID error:", error)
      return ApiResponse.error(res, error.message, error.statusCode || 500)
    }
  }

  async updatePost(req, res) {
    try {
      const updateData = { ...req.body, updated_by: req.user.id }
      const result = await blogService.updatePost(req.params.id, updateData, req.user)
      logger.info(`Post updated: ${req.params.id} by user: ${req.user.id}`)
      return ApiResponse.success(res, result, "Post updated successfully")
    } catch (error) {
      logger.error("Update post error:", error)
      return ApiResponse.error(res, error.message, error.statusCode || 500)
    }
  }

  async deletePost(req, res) {
    try {
      await blogService.deletePost(req.params.id, req.user)
      logger.info(`Post deleted: ${req.params.id} by user: ${req.user.id}`)
      return ApiResponse.success(res, null, "Post deleted successfully")
    } catch (error) {
      logger.error("Delete post error:", error)
      return ApiResponse.error(res, error.message, error.statusCode || 500)
    }
  }

  async getMyPosts(req, res) {
    try {
      const result = await blogService.getMyPosts(req.user.id, req.query)
      return ApiResponse.success(res, result, "Your posts retrieved successfully")
    } catch (error) {
      logger.error("Get my posts error:", error)
      return ApiResponse.error(res, error.message, error.statusCode || 500)
    }
  }

  async addPostActivity(req, res) {
    try {
      const activityData = {
        ...req.body,
        post_id: req.params.id,
        user_id: req.user.id,
        created_by: req.user.id,
      }
      const result = await blogService.addPostActivity(activityData)
      return ApiResponse.success(res, result, "Activity added successfully", 201)
    } catch (error) {
      logger.error("Add post activity error:", error)
      return ApiResponse.error(res, error.message, error.statusCode || 500)
    }
  }

  async getPostActivities(req, res) {
    try {
      const result = await blogService.getPostActivities(req.params.id, req.query)
      return ApiResponse.success(res, result, "Post activities retrieved successfully")
    } catch (error) {
      logger.error("Get post activities error:", error)
      return ApiResponse.error(res, error.message, error.statusCode || 500)
    }
  }

  async forceDeletePost(req, res) {
    try {
      await blogService.forceDeletePost(req.params.id)
      logger.info(`Post force deleted: ${req.params.id} by admin: ${req.user.id}`)
      return ApiResponse.success(res, null, "Post permanently deleted")
    } catch (error) {
      logger.error("Force delete post error:", error)
      return ApiResponse.error(res, error.message, error.statusCode || 500)
    }
  }

  async getAllPostsAdmin(req, res) {
    try {
      const result = await blogService.getAllPostsAdmin(req.query)
      return ApiResponse.success(res, result, "All posts retrieved successfully")
    } catch (error) {
      logger.error("Get all posts admin error:", error)
      return ApiResponse.error(res, error.message, error.statusCode || 500)
    }
  }
}

module.exports = new BlogController()
