/**
 * The User controller defines all routes for user management
 */
const responseHandler = require("_middleware/response-handler");
const service = require("../services/user.service");
const msg = require("_config/message.json");

module.exports = {
  getUserList,
  getUserById,
  updateUserStatus,
};

// Get User List
async function getUserList(req, res, next) {
  service
    .getUserList(req.query, req.auth_params)
    .then((result) => responseHandler(req, res, msg.user.list, true, result))
    .catch((error) => responseHandler(req, res, error));
}

// Get User By ID
async function getUserById(req, res, next) {
  service
    .getUserById(req.params.id, req.auth_params)
    .then((result) => responseHandler(req, res, msg.user.fetch, true, result))
    .catch((error) => responseHandler(req, res, error));
}

// Update User Status
async function updateUserStatus(req, res, next) {
  service
    .updateUserStatus(req.body, req.auth_params)
    .then((result) => responseHandler(req, res, msg.user.status, true, result))
    .catch((error) => responseHandler(req, res, error));
}
