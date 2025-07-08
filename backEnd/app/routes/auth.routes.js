/**
 * Define Authentication routes
 */
const express = require("express")
const router = express.Router()
const verifyToken = require("_middleware/verify-token")
const controllers = require("../controllers/auth.controller")
const schema = require("../validate_schema/auth.schema")

// API routes
router.post("/register", schema.userRegister, controllers.userRegister)
router.post("/login", schema.userLogin, controllers.userLogin)
router.get("/profile", verifyToken, controllers.getProfile)
router.post("/update-profile", verifyToken, schema.updateProfile, controllers.updateProfile)
router.post("/change-password", verifyToken, schema.changePassword, controllers.changePassword)
router.post("/forgot-password", schema.forgotPassword, controllers.forgotPassword)
router.post("/reset-password", schema.resetPassword, controllers.resetPassword)

module.exports = router
