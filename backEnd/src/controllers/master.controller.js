const masterService = require("../services/master.service")
const ApiResponse = require("../utils/response")
const logger = require("../utils/logger")

class MasterController {
  async createCategory(req, res) {
    try {
      const categoryData = { ...req.body, created_by: req.user.id }
      const result = await masterService.createCategory(categoryData)
      logger.info(`New category created: ${req.body.name} by user: ${req.user.id}`)
      return ApiResponse.success(res, result, "Category created successfully", 201)
    } catch (error) {
      logger.error("Create category error:", error)
      return ApiResponse.error(res, error.message, error.statusCode || 500)
    }
  }

  async getAllCategories(req, res) {
    try {
      const result = await masterService.getAllCategories(req.query)
      return ApiResponse.success(res, result, "Categories retrieved successfully")
    } catch (error) {
      logger.error("Get all categories error:", error)
      return ApiResponse.error(res, error.message, error.statusCode || 500)
    }
  }

  async getCategoryById(req, res) {
    try {
      const result = await masterService.getCategoryById(req.params.id)
      return ApiResponse.success(res, result, "Category retrieved successfully")
    } catch (error) {
      logger.error("Get category by ID error:", error)
      return ApiResponse.error(res, error.message, error.statusCode || 500)
    }
  }

  async updateCategory(req, res) {
    try {
      const updateData = { ...req.body, updated_by: req.user.id }
      const result = await masterService.updateCategory(req.params.id, updateData)
      logger.info(`Category updated: ${req.params.id} by user: ${req.user.id}`)
      return ApiResponse.success(res, result, "Category updated successfully")
    } catch (error) {
      logger.error("Update category error:", error)
      return ApiResponse.error(res, error.message, error.statusCode || 500)
    }
  }

  async deleteCategory(req, res) {
    try {
      await masterService.deleteCategory(req.params.id, req.user.id)
      logger.info(`Category deleted: ${req.params.id} by user: ${req.user.id}`)
      return ApiResponse.success(res, null, "Category deleted successfully")
    } catch (error) {
      logger.error("Delete category error:", error)
      return ApiResponse.error(res, error.message, error.statusCode || 500)
    }
  }
}

module.exports = new MasterController()
