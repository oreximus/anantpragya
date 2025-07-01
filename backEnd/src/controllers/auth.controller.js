const authService = require("../services/auth.service");
const ApiResponse = require("../utils/response");
const logger = require("../utils/logger");

class AuthController {
  async register(req, res) {
    try {
      const result = await authService.register(req.body);
      logger.info(`New user registered: ${req.body.email}`);
      return ApiResponse.success(res, result, result.message, 201);
    } catch (error) {
      logger.error("Registration error:", error);
      return ApiResponse.error(res, error.message, error.statusCode || 500);
    }
  }

  async login(req, res) {
    try {
      const result = await authService.login(req.body);
      logger.info(`User logged in: ${req.body.email}`);
      return ApiResponse.success(res, result, "Login successful");
    } catch (error) {
      logger.error("Login error:", error);
      return ApiResponse.error(res, error.message, error.statusCode || 500);
    }
  }

  async verifyEmail(req, res) {
    try {
      const { email, otp } = req.body;
      const result = await authService.verifyEmail(email, otp);
      logger.info(`Email verified: ${email}`);
      return ApiResponse.success(res, result, result.message);
    } catch (error) {
      logger.error("Email verification error:", error);
      return ApiResponse.error(res, error.message, error.statusCode || 500);
    }
  }

  async resendVerificationEmail(req, res) {
    try {
      const { email } = req.body;
      const result = await authService.resendVerificationEmail(email);
      logger.info(`Verification email resent: ${email}`);
      return ApiResponse.success(res, result, result.message);
    } catch (error) {
      logger.error("Resend verification email error:", error);
      return ApiResponse.error(res, error.message, error.statusCode || 500);
    }
  }

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const result = await authService.forgotPassword(email);
      logger.info(`Password reset requested: ${email}`);
      return ApiResponse.success(res, result, result.message);
    } catch (error) {
      logger.error("Forgot password error:", error);
      return ApiResponse.error(res, error.message, error.statusCode || 500);
    }
  }

  async resetPassword(req, res) {
    try {
      const { email, otp, new_password } = req.body;
      const result = await authService.resetPassword(email, otp, new_password);
      logger.info(`Password reset completed: ${email}`);
      return ApiResponse.success(res, result, result.message);
    } catch (error) {
      logger.error("Reset password error:", error);
      return ApiResponse.error(res, error.message, error.statusCode || 500);
    }
  }

  async refreshToken(req, res) {
    try {
      const { refresh_token } = req.body;
      const result = await authService.refreshToken(refresh_token);
      return ApiResponse.success(res, result, "Token refreshed successfully");
    } catch (error) {
      logger.error("Token refresh error:", error);
      return ApiResponse.error(res, error.message, error.statusCode || 500);
    }
  }

  async getProfile(req, res) {
    try {
      const result = await authService.getProfile(req.user.id);
      return ApiResponse.success(res, result, "Profile retrieved successfully");
    } catch (error) {
      logger.error("Get profile error:", error);
      return ApiResponse.error(res, error.message, error.statusCode || 500);
    }
  }

  async updateProfile(req, res) {
    try {
      const result = await authService.updateProfile(req.user.id, req.body);
      logger.info(`Profile updated for user: ${req.user.id}`);
      return ApiResponse.success(res, result, "Profile updated successfully");
    } catch (error) {
      logger.error("Update profile error:", error);
      return ApiResponse.error(res, error.message, error.statusCode || 500);
    }
  }

  async changePassword(req, res) {
    try {
      await authService.changePassword(req.user.id, req.body);
      logger.info(`Password changed for user: ${req.user.id}`);
      return ApiResponse.success(res, null, "Password changed successfully");
    } catch (error) {
      logger.error("Change password error:", error);
      return ApiResponse.error(res, error.message, error.statusCode || 500);
    }
  }

  async logout(req, res) {
    try {
      // In a real application, you might want to blacklist the token
      logger.info(`User logged out: ${req.user.id}`);
      return ApiResponse.success(res, null, "Logout successful");
    } catch (error) {
      logger.error("Logout error:", error);
      return ApiResponse.error(res, error.message, error.statusCode || 500);
    }
  }
}

module.exports = new AuthController();
