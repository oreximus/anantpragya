/**
 * Error handler
 */
const logger = require("_helpers/logger")

module.exports = catchError

function catchError(err) {
  if (typeof err === "string") {
    // Custom application error
    return { message: err }
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    // Duplicate entry error
    const field = Object.keys(err.fields)[0]
    const value = err.fields[field]
    return { message: `Duplicate entry for ${field}: ${value}` }
  }

  if (err.name === "SequelizeValidationError") {
    // Sequelize validation error
    const errors = err.errors.map((e) => e.message)
    return { message: errors.join(", ") }
  }

  if (err.name === "UnauthorizedError") {
    // Jwt authentication error
    return { message: "Invalid Token" }
  }

  // Default to 500 server error
  logger.error(err)
  return { message: err.message }
}
