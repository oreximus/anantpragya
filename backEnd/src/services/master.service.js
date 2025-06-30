const { Category } = require("../models")
const Helpers = require("../utils/helpers")
const { Op } = require("sequelize")

class MasterService {
  async createCategory(categoryData) {
    // Check if category already exists
    const existingCategory = await Category.findOne({
      where: {
        name: { [Op.iLike]: categoryData.name },
        is_deleted: false,
      },
    })

    if (existingCategory) {
      const error = new Error("Category already exists with this name")
      error.statusCode = 409
      throw error
    }

    const category = await Category.create({
      id: Helpers.generateUUID(),
      ...categoryData,
    })

    return category
  }

  async getAllCategories(queryParams) {
    const { page, limit, search } = queryParams

    const whereClause = {
      is_active: true,
      is_deleted: false,
    }

    if (search) {
      whereClause.name = { [Op.like]: `%${search}%` }
    }

    if (page !== undefined && limit !== undefined) {
      const { limit: pageLimit, offset } = Helpers.getPagination(page, limit)

      const categories = await Category.findAndCountAll({
        where: whereClause,
        limit: pageLimit,
        offset,
        order: [["name", "ASC"]],
      })

      return Helpers.getPagingData(categories, page, pageLimit)
    }

    const categories = await Category.findAll({
      where: whereClause,
      order: [["name", "ASC"]],
    })

    return categories
  }

  async getCategoryById(categoryId) {
    const category = await Category.findOne({
      where: {
        id: categoryId,
        is_active: true,
        is_deleted: false,
      },
    })

    if (!category) {
      const error = new Error("Category not found")
      error.statusCode = 404
      throw error
    }

    return category
  }

  async updateCategory(categoryId, updateData) {
    const category = await Category.findOne({
      where: {
        id: categoryId,
        is_active: true,
        is_deleted: false,
      },
    })

    if (!category) {
      const error = new Error("Category not found")
      error.statusCode = 404
      throw error
    }

    // Check if name is being updated and if it already exists
    if (updateData.name) {
      const existingCategory = await Category.findOne({
        where: {
          name: { [Op.iLike]: updateData.name },
          id: { [Op.ne]: categoryId },
          is_deleted: false,
        },
      })

      if (existingCategory) {
        const error = new Error("Category name already exists")
        error.statusCode = 409
        throw error
      }
    }

    await Category.update(updateData, {
      where: { id: categoryId },
    })

    return await this.getCategoryById(categoryId)
  }

  async deleteCategory(categoryId, userId) {
    const category = await Category.findOne({
      where: {
        id: categoryId,
        is_active: true,
        is_deleted: false,
      },
    })

    if (!category) {
      const error = new Error("Category not found")
      error.statusCode = 404
      throw error
    }

    await Category.update(
      {
        is_deleted: true,
        updated_by: userId,
        updated_at: new Date(),
      },
      { where: { id: categoryId } },
    )
  }
}

module.exports = new MasterService()
