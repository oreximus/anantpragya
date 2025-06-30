const Joi = require("joi")

const createPostSchema = Joi.object({
  title: Joi.string().min(5).max(255).required().messages({
    "string.min": "Title must be at least 5 characters long",
    "string.max": "Title cannot exceed 255 characters",
    "any.required": "Title is required",
  }),
  content: Joi.string().min(10).required().messages({
    "string.min": "Content must be at least 10 characters long",
    "any.required": "Content is required",
  }),
  category_id: Joi.string().uuid().optional().messages({
    "string.uuid": "Category ID must be a valid UUID",
  }),
  tags: Joi.string().max(500).optional().messages({
    "string.max": "Tags cannot exceed 500 characters",
  }),
})

const updatePostSchema = Joi.object({
  title: Joi.string().min(5).max(255).optional(),
  content: Joi.string().min(10).optional(),
  category_id: Joi.string().uuid().optional().allow(null),
  tags: Joi.string().max(500).optional().allow(""),
})

const postActivitySchema = Joi.object({
  like_count: Joi.number().integer().min(0).optional(),
  comment: Joi.string().max(1000).optional().allow(""),
  share_count: Joi.number().integer().min(0).optional(),
})

const postQuerySchema = Joi.object({
  page: Joi.number().integer().min(0).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  category_id: Joi.string().uuid().optional(),
  user_id: Joi.string().uuid().optional(),
  search: Joi.string().max(255).optional(),
})

module.exports = {
  createPostSchema,
  updatePostSchema,
  postActivitySchema,
  postQuerySchema,
}
