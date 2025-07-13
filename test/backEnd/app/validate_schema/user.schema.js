const Joi = require("joi")
const validateRequest = require("_middleware/validate-request")

/**
 * ---------------------------------------
 * Schema Functions for User API
 * ---------------------------------------
 */

module.exports = {
  getUserList,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserStatus,
}

// Get User List Schema
function getUserList(req, res, next) {
  const schema = Joi.object().keys({
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).max(100).optional(),
    search: Joi.string().allow("").optional(),
  })
  validateRequest(req, res, next, schema)
}

// Get User By ID Schema
function getUserById(req, res, next) {
  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
  })
  validateRequest(req, res, next, schema, "params")
}

// Create User Schema
function createUser(req, res, next) {
  const schema = Joi.object().keys({
    first_name: Joi.string().min(1).max(255).required(),
    last_name: Joi.string().min(1).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("User", "Editor", "Admin").required(),
  })
  validateRequest(req, res, next, schema)
}

// Update User Schema
function updateUser(req, res, next) {
  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
    first_name: Joi.string().min(1).max(255).optional(),
    last_name: Joi.string().min(1).max(255).optional(),
    email: Joi.string().email().optional(),
    role: Joi.string().valid("User", "Editor", "Admin").optional(),
  })
  validateRequest(req, res, next, schema)
}

// Delete User Schema
function deleteUser(req, res, next) {
  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
  })
  validateRequest(req, res, next, schema)
}

// Update User Status Schema
function updateUserStatus(req, res, next) {
  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
    is_active: Joi.number().valid(0, 1).required(),
  })
  validateRequest(req, res, next, schema)
}
