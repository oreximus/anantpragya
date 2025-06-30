const Joi = require("joi")

const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(255).required().messages({
    "string.min": "Category name must be at least 2 characters long",
    "string.max": "Category name cannot exceed 255 characters",
    "any.required": "Category name is required",
  }),
})

const updateCategorySchema = Joi.object({
  name: Joi.string().min(2).max(255).optional(),
})

module.exports = {
  createCategorySchema,
  updateCategorySchema,
}
