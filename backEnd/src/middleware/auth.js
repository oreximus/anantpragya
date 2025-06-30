const jwt = require("jsonwebtoken")
const ApiResponse = require("../utils/response")
const logger = require("../utils/logger")
const jwtConfig = require("../config/jwt")
const { User } = require("../models")

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return ApiResponse.error(res, "Access token required", 401)
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, jwtConfig.secret)

    const user = await User.findOne({
      where: {
        id: decoded.id,
        is_active: true,
        is_deleted: false,
      },
    })

    if (!user) {
      return ApiResponse.error(res, "User not found or inactive", 401)
    }

    req.user = user
    next()
  } catch (error) {
    logger.error("Authentication error:", error)

    if (error.name === "TokenExpiredError") {
      return ApiResponse.error(res, "Token expired", 401)
    }

    if (error.name === "JsonWebTokenError") {
      return ApiResponse.error(res, "Invalid token", 401)
    }

    return ApiResponse.error(res, "Authentication failed", 401)
  }
}

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return ApiResponse.error(res, "Authentication required", 401)
    }

    const userRole = req.user.role === 0 ? "admin" : "user"

    if (!roles.includes(userRole)) {
      return ApiResponse.error(res, "Insufficient permissions", 403)
    }

    next()
  }
}

module.exports = { authenticate, authorize }
