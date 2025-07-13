/**
 * Verify Roles
 */
const responseHandler = require("./response-handler")
const ROLES_LIST = require("_config/roles_list")
const permissions = require("_config/permissions.json")

module.exports = verifyRoles

function verifyRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.auth_params || !req.auth_params.role) {
      return responseHandler(req, res, "Roles not found")
    }

    const rolesArray = [...allowedRoles]
    const userRole = req.auth_params.role

    // Check if the user's role is in the allowed roles list
    const hasRole = rolesArray.includes(userRole)

    if (hasRole) {
      next()
    } else {
      responseHandler(req, res, "Unauthorized: Insufficient role permissions")
    }
  }
}
