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
};

// Get Post Categories
async function getPostCategories(req, res, next) {
  service
    .getPostCategories()
    .then((result) =>
      responseHandler(req, res, msg.category.fetch, true, result),
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
    .createPost(req.body, req.auth_params)
    .then((result) => responseHandler(req, res, msg.post.create, true, result))
    .catch((error) => responseHandler(req, res, error));
}

// Update Post
async function updatePost(req, res, next) {
  service
    .updatePost(req.body, req.auth_params)
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
      responseHandler(req, res, msg.post.comments, true, result),
    )
    .catch((error) => responseHandler(req, res, error));
}
