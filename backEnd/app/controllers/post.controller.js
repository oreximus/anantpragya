/**
 * The Post controller defines all routes for post management
 */
const responseHandler = require("_middleware/response-handler");
const service = require("../services/post.service");
const msg = require("_config/message.json");

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
  getPostLikeCount,
  createPostCategory,
  updatePostCategory,
  deletePostCategory,
};

// Get Post Categories
async function getPostCategories(req, res, next) {
  service
    .getPostCategories()
    .then((result) =>
      responseHandler(req, res, msg.category.fetch, true, result)
    )
    .catch((error) => responseHandler(req, res, error));
}
// Create Post Category
async function createPostCategory(req, res, next) {
  console.log("createPostCategory===Controller");
  service
    .createPostCategory(req.body)
    .then((result) =>
      responseHandler(req, res, "Category created successfully", true, result)
    )
    .catch((error) => responseHandler(req, res, error));
}

// Update Post Category
async function updatePostCategory(req, res, next) {
  service
    .updatePostCategory(req.body)
    .then((result) =>
      responseHandler(req, res, "Category updated successfully", true, result)
    )
    .catch((error) => responseHandler(req, res, error));
}

// Delete Post Category
async function deletePostCategory(req, res, next) {
  service
    .deletePostCategory(req.body)
    .then((result) =>
      responseHandler(req, res, "Category deleted successfully", true, result)
    )
    .catch((error) => responseHandler(req, res, error));
}

// Get Post List
async function getPostList(req, res, next) {
  service
    .getPostList(req.query)
    .then((result) => responseHandler(req, res, msg.post.list, true, result))
    .catch((error) => responseHandler(req, res, error));
}

// Get Post By ID
async function getPostById(req, res, next) {
  service
    .getPostById(req.params.id)
    .then((result) => responseHandler(req, res, msg.post.fetch, true, result))
    .catch((error) => responseHandler(req, res, error));
}

// Create Post
async function createPost(req, res, next) {
  service
    .createPost(req.body, req.auth_params, req.file) // Pass req.file to service
    .then((result) => responseHandler(req, res, msg.post.create, true, result))
    .catch((error) => responseHandler(req, res, error));
}

// Update Post
async function updatePost(req, res, next) {
  service
    .updatePost(req.body, req.auth_params, req.file) // Pass req.file to service
    .then((result) => responseHandler(req, res, msg.post.update, true, result))
    .catch((error) => responseHandler(req, res, error));
}

// Delete Post
async function deletePost(req, res, next) {
  service
    .deletePost(req.body, req.auth_params)
    .then((result) => responseHandler(req, res, msg.post.delete, true, result))
    .catch((error) => responseHandler(req, res, error));
}

// Like Post
async function likePost(req, res, next) {
  service
    .likePost(req.body, req.auth_params)
    .then((result) => responseHandler(req, res, msg.post.like, true, result))
    .catch((error) => responseHandler(req, res, error));
}

// Add Comment
async function addComment(req, res, next) {
  service
    .addComment(req.body, req.auth_params)
    .then((result) => responseHandler(req, res, msg.post.comment, true, result))
    .catch((error) => responseHandler(req, res, error));
}

// Get Post Comments
async function getPostComments(req, res, next) {
  service
    .getPostComments(req.params.id, req.query)
    .then((result) =>
      responseHandler(req, res, msg.post.comments, true, result)
    )
    .catch((error) => responseHandler(req, res, error));
}

// Get Post Like Count
async function getPostLikeCount(req, res, next) {
  service
    .getPostLikeCount(req.params.id)
    .then((result) =>
      responseHandler(req, res, msg.post.likeCount, true, result)
    )
    .catch((error) => responseHandler(req, res, error));
}
