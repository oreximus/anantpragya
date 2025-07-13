const responseHandler = require("_middleware/response-handler")
const service = require("../services/user.service")
const msg = require("_config/message.json")

module.exports = {
  getUserList,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserStatus,
}

// Get User List
async function getUserList(req, res, next) {
  service
    .getUserList(req.query)
    .then((result) => responseHandler(req, res, msg.user.list, true, result))
    .catch((error) => responseHandler(req, res, error))
}

// Get User By ID
async function getUserById(req, res, next) {
  service
    .getUserById(req.params.id)
    .then((result) => responseHandler(req, res, msg.user.fetch, true, result))
    .catch((error) => responseHandler(req, res, error))
}

// Create User
async function createUser(req, res, next) {
  service
    .createUser(req.body, req.auth_params)
    .then((result) => responseHandler(req, res, msg.user.create, true, result))
    .catch((error) => responseHandler(req, res, error))
}

// Update User
async function updateUser(req, res, next) {
  service
    .updateUser(req.body, req.auth_params)
    .then((result) => responseHandler(req, res, msg.user.update, true, result))
    .catch((error) => responseHandler(req, res, error))
}

// Delete User
async function deleteUser(req, res, next) {
  service
    .deleteUser(req.body, req.auth_params)
    .then((result) => responseHandler(req, res, msg.user.delete, true, result))
    .catch((error) => responseHandler(req, res, error))
}

// Update User Status
async function updateUserStatus(req, res, next) {
  service
    .updateUserStatus(req.body, req.auth_params)
    .then((result) => responseHandler(req, res, msg.user.statusUpdate, true, result))
    .catch((error) => responseHandler(req, res, error))
}
