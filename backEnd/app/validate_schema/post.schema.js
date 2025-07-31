const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");

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
  getPostLikeCount,
  createPostCategory,
  updatePostCategory,
  deletePostCategory,
};

// Get Post List Schema
function getPostList(req, res, next) {
  const schema = Joi.object().keys({
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).max(100).optional(),
    search: Joi.string().allow("").optional(),
    category_id: Joi.string().uuid().optional(),
  });
  validateRequest(req, res, next, schema);
}

// Get Post By ID Schema
function getPostById(req, res, next) {
  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
  });
  validateRequest(req, res, next, schema, "params");
}

// Create Post Schema
function createPost(req, res, next) {
  const schema = Joi.object().keys({
    category: Joi.string().required(), // Frontend sends category name/value
    title: Joi.string().min(1).max(255).required(),
    summary: Joi.string().optional().allow(""), // New field
    content: Joi.string().optional().allow(""), // Maps to post_data
    tags: Joi.array().items(Joi.string()).optional(), // New field
    status: Joi.string().valid("draft", "published").optional(), // New field
  });
  validateRequest(req, res, next, schema);
}

// Create Post Category Schema
// Create Post Category Schema
function createPostCategory(req, res, next) {
  console.log("createPostCategory===Schema");
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
  });
  validateRequest(req, res, next, schema);
}

// Update Post Category Schema
function updatePostCategory(req, res, next) {
  const schema = Joi.object({
    id: Joi.string().guid({ version: "uuidv4" }).required(),
    name: Joi.string().max(255).required(),
    is_active: Joi.number().valid(0, 1).optional(),
  });
  validateRequest(req, res, next, schema);
}

// Delete Post Category Schema
function deletePostCategory(req, res, next) {
  const schema = Joi.object({
    id: Joi.string().guid({ version: "uuidv4" }).required(),
  });
  validateRequest(req, res, next, schema);
}

// Update Post Schema
function updatePost(req, res, next) {
  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
    category: Joi.string().optional(), // Frontend sends category name/value
    title: Joi.string().min(1).max(255).optional(),
    summary: Joi.string().optional().allow(""), // New field
    content: Joi.string().optional().allow(""), // Maps to post_data
    tags: Joi.array().items(Joi.string()).optional(), // New field
    status: Joi.string().valid("draft", "published").optional(), // New field
  });
  validateRequest(req, res, next, schema);
}

// Delete Post Schema
function deletePost(req, res, next) {
  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
  });
  validateRequest(req, res, next, schema);
}

// Like Post Schema
function likePost(req, res, next) {
  const schema = Joi.object().keys({
    post_id: Joi.string().uuid().required(),
  });
  validateRequest(req, res, next, schema);
}

// Add Comment Schema
function addComment(req, res, next) {
  const schema = Joi.object().keys({
    post_id: Joi.string().uuid().required(),
    comment: Joi.string().min(1).max(255).required(),
  });
  validateRequest(req, res, next, schema);
}

// Get Post Comments Schema
function getPostComments(req, res, next) {
  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).max(100).optional(),
  });
  validateRequest(req, res, next, schema, "params");
}

// Get Post Like Count Schema
function getPostLikeCount(req, res, next) {
  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
  });
  validateRequest(req, res, next, schema, "params");
}
