/**
 * Define User routes
 */
const express = require("express")
const router = express.Router()
const verifyToken = require("_middleware/verify-token")
const controllers = require("../controllers/user.controller")
const schema = require("../validate_schema/user.schema")

// API routes
router.get("/list", verifyToken, schema.getUserList, controllers.getUserList)
router.get("/:id", verifyToken, schema.getUserById, controllers.getUserById)
router.post("/update-status", verifyToken, schema.updateUserStatus, controllers.updateUserStatus)

module.exports = router
