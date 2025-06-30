const ApiResponse = require("../utils/response")
const logger = require("../utils/logger")

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false })

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }))

      logger.warn("Validation error:", errors)
      return ApiResponse.validationError(res, errors)
    }

    next()
  }
}

module.exports = { validate }
