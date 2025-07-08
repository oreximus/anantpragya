/**
 * The Auth controller defines all routes for authentication
 */
const responseHandler = require("_middleware/response-handler");
const service = require("../services/auth.service");
const msg = require("_config/message.json");

module.exports = {
  userRegister,
  userLogin,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
};

// User Registration
async function userRegister(req, res, next) {
  service
    .userRegister(req.body)
    .then((result) =>
      responseHandler(req, res, msg.user.register, true, result),
    )
    .catch((error) => responseHandler(req, res, error));
}

// User Login
async function userLogin(req, res, next) {
  service
    .userLogin(req.body)
    .then((result) => responseHandler(req, res, msg.user.login, true, result))
    .catch((error) => responseHandler(req, res, error));
}

// Get User Profile
async function getProfile(req, res, next) {
  service
    .getProfile(req.auth_params)
    .then((result) => responseHandler(req, res, msg.user.profile, true, result))
    .catch((error) => responseHandler(req, res, error));
}

// Update Profile
async function updateProfile(req, res, next) {
  service
    .updateProfile(req.body, req.auth_params)
    .then((result) =>
      responseHandler(req, res, msg.user.updateProfile, true, result),
    )
    .catch((error) => responseHandler(req, res, error));
}

// Change Password
async function changePassword(req, res, next) {
  service
    .changePassword(req.body, req.auth_params)
    .then((result) =>
      responseHandler(req, res, msg.user.changePassword, true, result),
    )
    .catch((error) => responseHandler(req, res, error));
}

// Forgot Password
async function forgotPassword(req, res, next) {
  service
    .forgotPassword(req.body)
    .then((result) =>
      responseHandler(req, res, msg.user.forgotPassword, true, result),
    )
    .catch((error) => responseHandler(req, res, error));
}

// Reset Password
async function resetPassword(req, res, next) {
  service
    .resetPassword(req.body)
    .then((result) =>
      responseHandler(req, res, msg.user.resetPassword, true, result),
    )
    .catch((error) => responseHandler(req, res, error));
}
