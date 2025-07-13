/**
 * Verify Token
 */
const jwt = require("express-jwt")
const { expressjwt: expressJwt } = require("express-jwt")
const { secret } = require("_config/config.json")
const db = require("_helpers/db")

module.exports = verifyToken

function verifyToken(req, res, next) {
  expressJwt({
    secret,
    algorithms: ["HS256"],
    requestProperty: "auth_params",
    getToken: function fromHeaderOrQuerystring(req) {
      if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1]
      } else if (req.query && req.query.token) {
        return req.query.token
      }
      return null
    },
  }).unless({
    path: [
      // Public routes that don't require authentication
      "/api/auth/authenticate",
      "/api/auth/register",
      "/api/auth/verify-email",
      "/api/auth/refresh-token",
      "/api/auth/forgot-password",
      "/api/auth/validate-reset-token",
      "/api/auth/reset-password",
      "/api/post/list",
      "/api/post/categories",
      /^\/api\/post\/\w+$/, // Regex for /api/post/:id
      /^\/api\/post\/comments\/\w+$/, // Regex for /api/post/comments/:id
    ],
  })(req, res, async () => {
    if (req.auth_params) {
      // Attach full user record to request
      req.auth_params.user = await db.User.findByPk(req.auth_params.id)
      req.auth_params.user_id = req.auth_params.id
      req.auth_params.isAdmin = req.auth_params.role === "Admin"
      req.auth_params.ownsToken = (token) =>
        !!db.RefreshToken.findOne({
          where: { token, user_id: req.auth_params.id },
        })
    }
    next()
  })
}
