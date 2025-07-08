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
  updateUserStatus,
}

// Get User List Schema
function getUserList(req, res, next) {
  const schema = Joi.object().keys({
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).max(100).optional(),
    search: Joi.string().allow("").optional(),
    is_active: Joi.number().valid(0, 1).optional(),
  })
  validateRequest(req, res, next, schema)
}

// Get User By ID Schema
function getUserById(req, res, next) {
  const schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
  })
  validateRequest(req, res, next, schema)
}

// Update User Status Schema
function updateUserStatus(req, res, next) {
  const schema = Joi.object().keys({
    user_id: Joi.string().uuid().required(),
    is_active: Joi.number().valid(0, 1).required(),
  })
  validateRequest(req, res, next, schema)
}
