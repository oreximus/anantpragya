const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const { Op } = require("sequelize")
const db = require("_helpers/db")
const common = require("_helpers/common")
const catchError = require("_middleware/catch-error")
const sendEmail = require("_helpers/send-email")
const config = require("_config/config.json")
const securePassword = require("_helpers/secure-password")

module.exports = {
  register,
  verifyEmail,
  authenticate,
  refreshToken,
  revokeToken,
  forgotPassword,
  validateResetToken,
  resetPassword,
  changePassword,
}

// Register
async function register(params, origin) {
  try {
    // Validate
    if (await db.User.findOne({ where: { email: params.email } })) {
      throw 'Email "' + params.email + '" is already registered'
    }

    const user = new db.User(params)

    // Hash password
    user.password_hash = securePassword.hash(params.password)

    // Set date
    user.created_at = common.curDateTime()
    user.updated_at = common.curDateTime()

    // Save user
    await user.save()

    // Send email verification
    await sendVerificationEmail(user, origin)

    return { message: "Registration successful, please check your email" }
  } catch (err) {
    console.log(err)
    throw catchError(err)
  }
}

// Verify Email
async function verifyEmail(params) {
  try {
    const user = await db.User.findOne({
      where: { verification_token: params.token },
    })

    if (!user) throw "Verification failed"

    user.verified_at = common.curDateTime()
    user.verification_token = null
    user.is_active = 1
    user.updated_at = common.curDateTime()
    await user.save()

    return { message: "Verification successful, you can now login" }
  } catch (err) {
    console.log(err)
    throw catchError(err)
  }
}

// Authenticate
async function authenticate({ email, password, ipAddress }) {
  try {
    const user = await db.User.scope("withHash").findOne({ where: { email } })

    if (!user || !securePassword.compare(password, user.password_hash)) {
      throw "Email or Password incorrect"
    }

    // Authenticate successful
    const jwtToken = generateJwtToken(user)
    const refreshToken = generateRefreshToken(user, ipAddress)
    await refreshToken.save()

    // Return basic user details and tokens
    return {
      ...user.toJSON(),
      jwtToken,
      refreshToken: refreshToken.token,
    }
  } catch (err) {
    console.log(err)
    throw catchError(err)
  }
}

// Refresh Token
async function refreshToken({ token, ipAddress }) {
  try {
    const refreshToken = await getRefreshToken(token)
    const { user } = refreshToken

    // Replace old refresh token with a new one and save
    const newRefreshToken = generateRefreshToken(user, ipAddress)
    refreshToken.revoked_at = common.curDateTime()
    refreshToken.revoked_by_ip = ipAddress
    refreshToken.replaced_by_token = newRefreshToken.token
    await refreshToken.save()
    await newRefreshToken.save()

    // Generate new jwt
    const jwtToken = generateJwtToken(user)

    return {
      ...user.toJSON(),
      jwtToken,
      refreshToken: newRefreshToken.token,
    }
  } catch (err) {
    console.log(err)
    throw catchError(err)
  }
}

// Revoke Token
async function revokeToken({ token, ipAddress }) {
  try {
    const refreshToken = await getRefreshToken(token)

    refreshToken.revoked_at = common.curDateTime()
    refreshToken.revoked_by_ip = ipAddress
    await refreshToken.save()
  } catch (err) {
    console.log(err)
    throw catchError(err)
  }
}

// Forgot Password
async function forgotPassword(params, origin) {
  try {
    const user = await db.User.findOne({ where: { email: params.email } })

    // Always return ok to prevent email enumeration
    if (!user) return

    // Create reset token that expires in 24 hours
    user.reset_token = generateResetToken()
    user.reset_token_expires = common.addHours(common.curDateTime(), 24)
    user.updated_at = common.curDateTime()
    await user.save()

    // Send email
    await sendPasswordResetEmail(user, origin)
  } catch (err) {
    console.log(err)
    throw catchError(err)
  }
}

// Validate Reset Token
async function validateResetToken(params) {
  try {
    const refreshToken = await getResetToken(params.token)
    return { message: "Token is valid" }
  } catch (err) {
    console.log(err)
    throw catchError(err)
  }
}

// Reset Password
async function resetPassword(params) {
  try {
    const refreshToken = await getResetToken(params.token)
    const user = refreshToken.user

    // Update password and remove reset token
    user.password_hash = securePassword.hash(params.password)
    user.password_reset_at = common.curDateTime()
    user.reset_token = null
    user.reset_token_expires = null
    user.updated_at = common.curDateTime()
    await user.save()

    // Revoke all refresh tokens
    await db.RefreshToken.destroy({ where: { user_id: user.id } })

    // Send email
    await sendPasswordResetConfirmationEmail(user)
  } catch (err) {
    console.log(err)
    throw catchError(err)
  }
}

// Change Password
async function changePassword(params, auth) {
  try {
    const user = await db.User.scope("withHash").findOne({
      where: { id: auth.user_id },
    })

    if (!user) throw "User not found"

    // Validate current password
    if (!securePassword.compare(params.current_password, user.password_hash)) {
      throw "Current password incorrect"
    }

    // Update password
    user.password_hash = securePassword.hash(params.new_password)
    user.password_reset_at = common.curDateTime()
    user.updated_at = common.curDateTime()
    await user.save()

    // Revoke all refresh tokens
    await db.RefreshToken.destroy({ where: { user_id: user.id } })

    return { message: "Password changed successfully" }
  } catch (err) {
    console.log(err)
    throw catchError(err)
  }
}

// Helper Functions
function generateJwtToken(user) {
  // Create a jwt token containing the user id that expires in 15 minutes
  return jwt.sign({ id: user.id, role: user.role }, config.secret, {
    expiresIn: "15m",
  })
}

function generateRefreshToken(user, ipAddress) {
  // Create a refresh token that expires in 7 days
  return new db.RefreshToken({
    user_id: user.id,
    token: crypto.randomBytes(40).toString("hex"),
    expires: common.addDays(common.curDateTime(), 7),
    created_at: common.curDateTime(),
    created_by_ip: ipAddress,
  })
}

function generateResetToken() {
  return crypto.randomBytes(40).toString("hex")
}

async function getRefreshToken(token) {
  const refreshToken = await db.RefreshToken.findOne({
    where: { token },
    include: db.User,
  })
  if (!refreshToken || !refreshToken.is_active) throw "Invalid Token"
  return refreshToken
}

async function getResetToken(token) {
  const resetToken = await db.User.findOne({
    where: {
      reset_token: token,
      reset_token_expires: { [Op.gt]: common.curDateTime() },
    },
  })
  if (!resetToken) throw "Invalid Token"
  return resetToken
}

async function sendVerificationEmail(user, origin) {
  let message
  if (origin) {
    const verifyUrl = `${origin}/auth/verify-email?token=${user.verification_token}`
    message = `<p>Please click the below link to verify your email address:</p>
                   <p><a href="${verifyUrl}">${verifyUrl}</a></p>`
  } else {
    message = `<p>Please use the below token to verify your email address with the <code>/auth/verify-email</code> api route:</p>
                   <p><code>${user.verification_token}</code></p>`
  }

  await sendEmail({
    to: user.email,
    subject: "Sign-up Verification API - Verify Email",
    template: "email-verification-otp",
    context: {
      name: user.first_name,
      message: message,
    },
  })
}

async function sendPasswordResetEmail(user, origin) {
  let message
  if (origin) {
    const resetUrl = `${origin}/auth/reset-password?token=${user.reset_token}`
    message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`
  } else {
    message = `<p>Please use the below token to reset your password with the <code>/auth/reset-password</code> api route:</p>
                   <p><code>${user.reset_token}</code></p>`
  }

  await sendEmail({
    to: user.email,
    subject: "Sign-up Verification API - Reset Password",
    template: "forgot-password-link",
    context: {
      name: user.first_name,
      message: message,
    },
  })
}

async function sendPasswordResetConfirmationEmail(user) {
  await sendEmail({
    to: user.email,
    subject: "Sign-up Verification API - Password Reset Successfully",
    template: "password-reset-confirmation",
    context: {
      name: user.first_name,
    },
  })
}
