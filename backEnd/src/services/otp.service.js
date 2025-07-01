const crypto = require("crypto");
const { User } = require("../models");
const logger = require("../utils/logger");

class OTPService {
  constructor() {
    this.otpLength = 6;
    this.otpExpiry = 10 * 60 * 1000; // 10 minutes in milliseconds
  }

  generateOTP() {
    return crypto.randomInt(100000, 999999).toString();
  }

  async generateAndStoreEmailVerificationOTP(userId) {
    try {
      const otp = this.generateOTP();
      const expiresAt = new Date(Date.now() + this.otpExpiry);

      await User.update(
        {
          email_verification_token: otp,
          email_verification_expires: expiresAt,
          updated_at: new Date(),
        },
        {
          where: { id: userId },
        },
      );

      logger.info(`Email verification OTP generated for user: ${userId}`);
      return otp;
    } catch (error) {
      logger.error("Error generating email verification OTP:", error);
      throw error;
    }
  }

  async generateAndStorePasswordResetOTP(userId) {
    try {
      const otp = this.generateOTP();
      const expiresAt = new Date(Date.now() + this.otpExpiry);

      await User.update(
        {
          password_reset_token: otp,
          password_reset_expires: expiresAt,
          updated_at: new Date(),
        },
        {
          where: { id: userId },
        },
      );

      logger.info(`Password reset OTP generated for user: ${userId}`);
      return otp;
    } catch (error) {
      logger.error("Error generating password reset OTP:", error);
      throw error;
    }
  }

  async verifyEmailVerificationOTP(email, otp) {
    try {
      const user = await User.findOne({
        where: {
          email: email.toLowerCase(),
          email_verification_token: otp,
          is_deleted: false,
        },
      });

      if (!user) {
        const error = new Error("Invalid verification code");
        error.statusCode = 400;
        throw error;
      }

      if (new Date() > user.email_verification_expires) {
        const error = new Error("Verification code has expired");
        error.statusCode = 400;
        throw error;
      }

      // Mark email as verified and clear OTP
      await User.update(
        {
          is_email_verified: true,
          email_verification_token: null,
          email_verification_expires: null,
          updated_at: new Date(),
        },
        {
          where: { id: user.id },
        },
      );

      logger.info(`Email verified successfully for user: ${user.id}`);
      return user;
    } catch (error) {
      logger.error("Error verifying email OTP:", error);
      throw error;
    }
  }

  async verifyPasswordResetOTP(email, otp) {
    try {
      const user = await User.findOne({
        where: {
          email: email.toLowerCase(),
          password_reset_token: otp,
          is_active: true,
          is_deleted: false,
        },
      });

      if (!user) {
        const error = new Error("Invalid reset code");
        error.statusCode = 400;
        throw error;
      }

      if (new Date() > user.password_reset_expires) {
        const error = new Error("Reset code has expired");
        error.statusCode = 400;
        throw error;
      }

      logger.info(`Password reset OTP verified for user: ${user.id}`);
      return user;
    } catch (error) {
      logger.error("Error verifying password reset OTP:", error);
      throw error;
    }
  }

  async clearEmailVerificationOTP(userId) {
    try {
      await User.update(
        {
          email_verification_token: null,
          email_verification_expires: null,
          updated_at: new Date(),
        },
        {
          where: { id: userId },
        },
      );
    } catch (error) {
      logger.error("Error clearing email verification OTP:", error);
      throw error;
    }
  }

  async clearPasswordResetOTP(userId) {
    try {
      await User.update(
        {
          password_reset_token: null,
          password_reset_expires: null,
          updated_at: new Date(),
        },
        {
          where: { id: userId },
        },
      );
    } catch (error) {
      logger.error("Error clearing password reset OTP:", error);
      throw error;
    }
  }

  async resendEmailVerificationOTP(email) {
    try {
      const user = await User.findOne({
        where: {
          email: email.toLowerCase(),
          is_deleted: false,
        },
      });

      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      if (user.is_email_verified) {
        const error = new Error("Email is already verified");
        error.statusCode = 400;
        throw error;
      }

      const otp = await this.generateAndStoreEmailVerificationOTP(user.id);
      return { user, otp };
    } catch (error) {
      logger.error("Error resending email verification OTP:", error);
      throw error;
    }
  }
}

module.exports = new OTPService();
