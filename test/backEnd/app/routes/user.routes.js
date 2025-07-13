const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")
const userSchema = require("../validate_schema/user.schema")
const verifyToken = require("_middleware/verify-token")
const verifyRoles = require("_middleware/verfiy-roles")
const ROLES_LIST = require("_config/roles_list")

// User Routes
router.get("/list", verifyToken, verifyRoles(ROLES_LIST.Admin), userSchema.getUserList, userController.getUserList)
router.get("/:id", verifyToken, verifyRoles(ROLES_LIST.Admin), userSchema.getUserById, userController.getUserById)
router.post("/create", verifyToken, verifyRoles(ROLES_LIST.Admin), userSchema.createUser, userController.createUser)
router.put("/update", verifyToken, verifyRoles(ROLES_LIST.Admin), userSchema.updateUser, userController.updateUser)
router.delete("/delete", verifyToken, verifyRoles(ROLES_LIST.Admin), userSchema.deleteUser, userController.deleteUser)
router.put(
  "/status",
  verifyToken,
  verifyRoles(ROLES_LIST.Admin),
  userSchema.updateUserStatus,
  userController.updateUserStatus,
)

module.exports = router
