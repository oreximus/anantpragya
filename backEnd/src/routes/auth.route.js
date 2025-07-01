const express = require("express");
const authController = require("../controllers/auth.controller");
const { authenticate } = require("../middleware/auth");
const { validate } = require("../middleware/validation");
const {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  resendVerificationEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
  changePasswordSchema,
} = require("../validation_schema/auth.schema");

const router = express.Router();

// Public routes
router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post(
  "/verify-email",
  validate(verifyEmailSchema),
  authController.verifyEmail,
);
router.post(
  "/resend-verification",
  validate(resendVerificationEmailSchema),
  authController.resendVerificationEmail,
);
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  authController.forgotPassword,
);
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  authController.resetPassword,
);
router.post("/refresh-token", authController.refreshToken);

// Protected routes
router.use(authenticate);
router.get("/profile", authController.getProfile);
router.put(
  "/profile",
  validate(updateProfileSchema),
  authController.updateProfile,
);
router.post(
  "/change-password",
  validate(changePasswordSchema),
  authController.changePassword,
);
router.post("/logout", authController.logout);

module.exports = router;
