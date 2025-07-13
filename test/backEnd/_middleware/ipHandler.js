/**
 * IP Handler
 */
const requestIp = require("request-ip")

module.exports = ipHandler

function ipHandler(req, res, next) {
  const clientIp = requestIp.getClientIp(req)
  req.ip = clientIp
  next()
}
