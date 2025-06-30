const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require("uuid")
const jwtConfig = require("../config/jwt")

class Helpers {
  static generateUUID() {
    return uuidv4()
  }

  static async hashPassword(password) {
    const saltRounds = 12
    return await bcrypt.hash(password, saltRounds)
  }

  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
  }

  static generateToken(payload) {
    return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn })
  }

  static generateRefreshToken(payload) {
    return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.refreshExpiresIn })
  }

  static verifyToken(token) {
    return jwt.verify(token, jwtConfig.secret)
  }

  static sanitizeUser(user) {
    const { password, ...sanitizedUser } = user.toJSON ? user.toJSON() : user
    return sanitizedUser
  }

  static getPagination(page, size) {
    const limit = size ? +size : 10
    const offset = page ? page * limit : 0
    return { limit, offset }
  }

  static getPagingData(data, page, limit) {
    const { count: totalItems, rows: items } = data
    const currentPage = page ? +page : 0
    const totalPages = Math.ceil(totalItems / limit)

    return {
      totalItems,
      items,
      totalPages,
      currentPage,
      hasNext: currentPage < totalPages - 1,
      hasPrev: currentPage > 0,
    }
  }
}

module.exports = Helpers
