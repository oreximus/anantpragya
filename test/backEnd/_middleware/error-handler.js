/**
 * Error handler
 */
const responseHandler = require("./response-handler")

module.exports = errorHandler

function errorHandler(err, req, res, next) {
  if (typeof err === "string") {
    // Custom application error
    return responseHandler(req, res, err)
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    // Duplicate entry error
    const field = Object.keys(err.fields)[0]
    const value = err.fields[field]
    return responseHandler(req, res, `Duplicate entry for ${field}: ${value}`)
  }

  if (err.name === "SequelizeValidationError") {
    // Sequelize validation error
    const errors = err.errors.map((e) => e.message)
    return responseHandler(req, res, errors.join(", "))
  }

  if (err.name === "UnauthorizedError") {
    // Jwt authentication error
    return responseHandler(req, res, "Invalid Token")
  }

  // Default to 500 server error
  return responseHandler(req, res, err.message || err)
}
