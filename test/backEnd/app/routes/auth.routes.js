const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth.controller")
const authSchema = require("../validate_schema/auth.schema")
const verifyToken = require("_middleware/verify-token")

// Auth Routes
router.post("/register", authSchema.register, authController.register)
router.post("/verify-email", authSchema.verifyEmail, authController.verifyEmail)
router.post("/authenticate", authSchema.authenticate, authController.authenticate)
router.post("/refresh-token", authController.refreshToken)
router.post("/revoke-token", verifyToken, authController.revokeToken)
router.post("/forgot-password", authSchema.forgotPassword, authController.forgotPassword)
router.post("/validate-reset-token", authSchema.validateResetToken, authController.validateResetToken)
router.post("/reset-password", authSchema.resetPassword, authController.resetPassword)
router.post("/change-password", verifyToken, authSchema.changePassword, authController.changePassword)

module.exports = router
