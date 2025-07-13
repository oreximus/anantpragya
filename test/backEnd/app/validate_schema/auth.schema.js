const Joi = require("joi")
const validateRequest = require("_middleware/validate-request")

/**
 * ---------------------------------------
 * Schema Functions for Auth API
 * ---------------------------------------
 */

module.exports = {
  register,
  verifyEmail,
  authenticate,
  forgotPassword,
  validateResetToken,
  resetPassword,
  changePassword,
}

// Register Schema
function register(req, res, next) {
  const schema = Joi.object().keys({
    first_name: Joi.string().min(1).max(255).required(),
    last_name: Joi.string().min(1).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.string().valid(Joi.ref("password")).required(),
  })
  validateRequest(req, res, next, schema)
}

// Verify Email Schema
function verifyEmail(req, res, next) {
  const schema = Joi.object().keys({
    token: Joi.string().required(),
  })
  validateRequest(req, res, next, schema)
}

// Authenticate Schema
function authenticate(req, res, next) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
  validateRequest(req, res, next, schema)
}

// Forgot Password Schema
function forgotPassword(req, res, next) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
  })
  validateRequest(req, res, next, schema)
}

// Validate Reset Token Schema
function validateResetToken(req, res, next) {
  const schema = Joi.object().keys({
    token: Joi.string().required(),
  })
  validateRequest(req, res, next, schema)
}

// Reset Password Schema
function resetPassword(req, res, next) {
  const schema = Joi.object().keys({
    token: Joi.string().required(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.string().valid(Joi.ref("password")).required(),
  })
  validateRequest(req, res, next, schema)
}

// Change Password Schema
function changePassword(req, res, next) {
  const schema = Joi.object().keys({
    current_password: Joi.string().required(),
    new_password: Joi.string().min(6).required(),
    confirm_new_password: Joi.string().valid(Joi.ref("new_password")).required(),
  })
  validateRequest(req, res, next, schema)
}
