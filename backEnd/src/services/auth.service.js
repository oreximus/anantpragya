const { User } = require("../models")
const Helpers = require("../utils/helpers")
const { Op } = require("sequelize")

class AuthService {
  async register(userData) {
    const { first_name, last_name, email, password } = userData

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        email: email.toLowerCase(),
        is_deleted: false,
      },
    })

    if (existingUser) {
      const error = new Error("User already exists with this email")
      error.statusCode = 409
      throw error
    }

    // Hash password
    const hashedPassword = await Helpers.hashPassword(password)

    // Create user
    const user = await User.create({
      id: Helpers.generateUUID(),
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 1, // Normal user
    })

    // Generate tokens
    const tokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    }

    const accessToken = Helpers.generateToken(tokenPayload)
    const refreshToken = Helpers.generateRefreshToken(tokenPayload)

    return {
      user: Helpers.sanitizeUser(user),
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }

  async login(loginData) {
    const { email, password } = loginData

    // Find user
    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
        is_active: true,
        is_deleted: false,
      },
    })

    if (!user) {
      const error = new Error("Invalid email or password")
      error.statusCode = 401
      throw error
    }

    // Verify password
    const isPasswordValid = await Helpers.comparePassword(password, user.password)
    if (!isPasswordValid) {
      const error = new Error("Invalid email or password")
      error.statusCode = 401
      throw error
    }

    // Generate tokens
    const tokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    }

    const accessToken = Helpers.generateToken(tokenPayload)
    const refreshToken = Helpers.generateRefreshToken(tokenPayload)

    return {
      user: Helpers.sanitizeUser(user),
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }

  async refreshToken(refreshToken) {
    if (!refreshToken) {
      const error = new Error("Refresh token is required")
      error.statusCode = 400
      throw error
    }

    try {
      const decoded = Helpers.verifyToken(refreshToken)

      const user = await User.findOne({
        where: {
          id: decoded.id,
          is_active: true,
          is_deleted: false,
        },
      })

      if (!user) {
        const error = new Error("User not found")
        error.statusCode = 404
        throw error
      }

      const tokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
      }

      const newAccessToken = Helpers.generateToken(tokenPayload)
      const newRefreshToken = Helpers.generateRefreshToken(tokenPayload)

      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      }
    } catch (error) {
      const tokenError = new Error("Invalid refresh token")
      tokenError.statusCode = 401
      throw tokenError
    }
  }

  async getProfile(userId) {
    const user = await User.findOne({
      where: {
        id: userId,
        is_active: true,
        is_deleted: false,
      },
    })

    if (!user) {
      const error = new Error("User not found")
      error.statusCode = 404
      throw error
    }

    return Helpers.sanitizeUser(user)
  }

  async updateProfile(userId, updateData) {
    const { first_name, last_name, email } = updateData

    // Check if email is being updated and if it already exists
    if (email) {
      const existingUser = await User.findOne({
        where: {
          email: email.toLowerCase(),
          id: { [Op.ne]: userId },
          is_deleted: false,
        },
      })

      if (existingUser) {
        const error = new Error("Email already exists")
        error.statusCode = 409
        throw error
      }
    }

    const [updatedRowsCount] = await User.update(
      {
        ...(first_name && { first_name }),
        ...(last_name && { last_name }),
        ...(email && { email: email.toLowerCase() }),
        updated_by: userId,
        updated_at: new Date(),
      },
      {
        where: {
          id: userId,
          is_active: true,
          is_deleted: false,
        },
      },
    )

    if (updatedRowsCount === 0) {
      const error = new Error("User not found or no changes made")
      error.statusCode = 404
      throw error
    }

    const updatedUser = await User.findByPk(userId)
    return Helpers.sanitizeUser(updatedUser)
  }

  async changePassword(userId, passwordData) {
    const { current_password, new_password } = passwordData

    const user = await User.findOne({
      where: {
        id: userId,
        is_active: true,
        is_deleted: false,
      },
    })

    if (!user) {
      const error = new Error("User not found")
      error.statusCode = 404
      throw error
    }

    // Verify current password
    const isCurrentPasswordValid = await Helpers.comparePassword(current_password, user.password)
    if (!isCurrentPasswordValid) {
      const error = new Error("Current password is incorrect")
      error.statusCode = 400
      throw error
    }

    // Hash new password
    const hashedNewPassword = await Helpers.hashPassword(new_password)

    await User.update(
      {
        password: hashedNewPassword,
        updated_by: userId,
        updated_at: new Date(),
      },
      {
        where: { id: userId },
      },
    )
  }
}

module.exports = new AuthService()
