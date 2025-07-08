const Joi = require("joi")
const validateRequest = require("_middleware/validate-request")

/**
 * ---------------------------------------
 * Schema Functions for Post API
 * ---------------------------------------
 */

module.exports = {
  getPostList,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  addComment,
  getPostComments,
}

// Get Post List Schema
function getPostList(req, res, next) {
  const schema = Joi.object().keys({
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).max(100).optional(),
    search: Joi.string().allow("").optional(),
    category_id: Joi.string().uuid().optional(),
  })
  validateRequest(req, res, next, schema)
}

// Get Post By ID Schema
function getPostById(req, res, next) {
  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
  })
  validateRequest(req, res, next, schema)
}

// Create Post Schema
function createPost(req, res, next) {
  const schema = Joi.object().keys({
    category_id: Joi.string().uuid().optional(),
    title: Joi.string().min(1).max(255).required(),
    post_data: Joi.string().optional(),
  })
  validateRequest(req, res, next, schema)
}

// Update Post Schema
function updatePost(req, res, next) {
  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
    category_id: Joi.string().uuid().optional(),
    title: Joi.string().min(1).max(255).optional(),
    post_data: Joi.string().optional(),
  })
  validateRequest(req, res, next, schema)
}

// Delete Post Schema
function deletePost(req, res, next) {
  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
  })
  validateRequest(req, res, next, schema)
}

// Like Post Schema
function likePost(req, res, next) {
  const schema = Joi.object().keys({
    post_id: Joi.string().uuid().required(),
  })
  validateRequest(req, res, next, schema)
}

// Add Comment Schema
function addComment(req, res, next) {
  const schema = Joi.object().keys({
    post_id: Joi.string().uuid().required(),
    comment: Joi.string().min(1).max(255).required(),
  })
  validateRequest(req, res, next, schema)
}

// Get Post Comments Schema
function getPostComments(req, res, next) {
  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).max(100).optional(),
  })
  validateRequest(req, res, next, schema)
}
