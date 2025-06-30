const ApiResponse = require("../utils/response")
const logger = require("../utils/logger")

const errorHandler = (err, req, res, next) => {
  logger.error("Error occurred:", {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
  })

  // Sequelize validation error
  if (err.name === "SequelizeValidationError") {
    const errors = err.errors.map((error) => ({
      field: error.path,
      message: error.message,
    }))
    return ApiResponse.validationError(res, errors)
  }

  // Sequelize unique constraint error
  if (err.name === "SequelizeUniqueConstraintError") {
    return ApiResponse.error(res, "Resource already exists", 409)
  }

  // Sequelize foreign key constraint error
  if (err.name === "SequelizeForeignKeyConstraintError") {
    return ApiResponse.error(res, "Invalid reference", 400)
  }

  // Default error
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  return ApiResponse.error(res, message, statusCode)
}

const notFound = (req, res, next) => {
  return ApiResponse.error(res, `Route ${req.originalUrl} not found`, 404)
}

module.exports = { errorHandler, notFound }
