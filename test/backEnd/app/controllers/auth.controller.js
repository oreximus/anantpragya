const responseHandler = require("_middleware/response-handler")
const service = require("../services/auth.service")
const msg = require("_config/message.json")

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
async function register(req, res, next) {
  service
    .register(req.body, req.get("origin"))
    .then((result) => responseHandler(req, res, msg.auth.register, true, result))
    .catch((error) => responseHandler(req, res, error))
}

// Verify Email
async function verifyEmail(req, res, next) {
  service
    .verifyEmail(req.body)
    .then((result) => responseHandler(req, res, msg.auth.emailVerify, true, result))
    .catch((error) => responseHandler(req, res, error))
}

// Authenticate
async function authenticate(req, res, next) {
  const { email, password } = req.body
  const ipAddress = req.ip
  service
    .authenticate({ email, password, ipAddress })
    .then(({ refreshToken, ...result }) => {
      setTokenCookie(res, refreshToken)
      responseHandler(req, res, msg.auth.login, true, result)
    })
    .catch((error) => responseHandler(req, res, error))
}

// Refresh Token
async function refreshToken(req, res, next) {
  const token = req.cookies.refreshToken
  const ipAddress = req.ip
  service
    .refreshToken({ token, ipAddress })
    .then(({ refreshToken, ...result }) => {
      setTokenCookie(res, refreshToken)
      responseHandler(req, res, msg.auth.refreshToken, true, result)
    })
    .catch((error) => responseHandler(req, res, error))
}

// Revoke Token
async function revokeToken(req, res, next) {
  // accept token from request body or cookie
  const token = req.body.token || req.cookies.refreshToken
  const ipAddress = req.ip

  if (!token) return responseHandler(req, res, msg.auth.tokenRequired)

  // users can revoke their own tokens and admins can revoke any tokens
  if (!req.auth_params.ownsToken(token) && !req.auth_params.isAdmin) {
    return responseHandler(req, res, msg.auth.unauthorized)
  }

  service
    .revokeToken({ token, ipAddress })
    .then((result) => responseHandler(req, res, msg.auth.revokeToken, true, result))
    .catch((error) => responseHandler(req, res, error))
}

// Forgot Password
async function forgotPassword(req, res, next) {
  service
    .forgotPassword(req.body, req.get("origin"))
    .then((result) => responseHandler(req, res, msg.auth.forgotPassword, true, result))
    .catch((error) => responseHandler(req, res, error))
}

// Validate Reset Token
async function validateResetToken(req, res, next) {
  service
    .validateResetToken(req.body)
    .then((result) => responseHandler(req, res, msg.auth.validateResetToken, true, result))
    .catch((error) => responseHandler(req, res, error))
}

// Reset Password
async function resetPassword(req, res, next) {
  service
    .resetPassword(req.body)
    .then((result) => responseHandler(req, res, msg.auth.resetPassword, true, result))
    .catch((error) => responseHandler(req, res, error))
}

// Change Password
async function changePassword(req, res, next) {
  service
    .changePassword(req.body, req.auth_params)
    .then((result) => responseHandler(req, res, msg.auth.changePassword, true, result))
    .catch((error) => responseHandler(req, res, error))
}

// Helper Functions
function setTokenCookie(res, token) {
  // create cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  }
  res.cookie("refreshToken", token, cookieOptions)
}
