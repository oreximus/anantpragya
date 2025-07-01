const { User } = require("../models");
const Helpers = require("../utils/helpers");
const emailService = require("./email.service");
const otpService = require("./otp.service");
const { Op } = require("sequelize");

class AuthService {
  async register(userData) {
    const { first_name, last_name, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        email: email.toLowerCase(),
        is_deleted: false,
      },
    });

    if (existingUser) {
      const error = new Error("User already exists with this email");
      error.statusCode = 409;
      throw error;
    }

    // Hash password
    const hashedPassword = await Helpers.hashPassword(password);

    // Create user
    const user = await User.create({
      id: Helpers.generateUUID(),
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 1, // Normal user
      is_email_verified: false,
    });

    // Generate email verification OTP
    const otp = await otpService.generateAndStoreEmailVerificationOTP(user.id);

    // Send verification email
    try {
      await emailService.sendVerificationEmail(
        user.email,
        user.first_name,
        otp,
      );
    } catch (emailError) {
      // Log email error but don't fail registration
      console.error("Failed to send verification email:", emailError);
    }

    return {
      user: Helpers.sanitizeUser(user),
      message:
        "Registration successful. Please check your email for verification code.",
    };
  }

  async login(loginData) {
    const { email, password } = loginData;

    // Find user
    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
        is_active: true,
        is_deleted: false,
      },
    });

    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    // Verify password
    const isPasswordValid = await Helpers.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    // Check if email is verified
    if (!user.is_email_verified) {
      const error = new Error("Please verify your email before logging in");
      error.statusCode = 403;
      throw error;
    }

    // Generate tokens
    const tokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = Helpers.generateToken(tokenPayload);
    const refreshToken = Helpers.generateRefreshToken(tokenPayload);

    return {
      user: Helpers.sanitizeUser(user),
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async verifyEmail(email, otp) {
    const user = await otpService.verifyEmailVerificationOTP(email, otp);

    // Send welcome email
    try {
      await emailService.sendWelcomeEmail(user.email, user.first_name);
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
    }

    return {
      message: "Email verified successfully",
      user: Helpers.sanitizeUser(user),
    };
  }

  async resendVerificationEmail(email) {
    const { user, otp } = await otpService.resendEmailVerificationOTP(email);

    // Send verification email
    await emailService.sendVerificationEmail(user.email, user.first_name, otp);

    return {
      message: "Verification email sent successfully",
    };
  }

  async forgotPassword(email) {
    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
        is_active: true,
        is_deleted: false,
      },
    });

    if (!user) {
      // Don't reveal if email exists or not
      return {
        message: "If the email exists, you will receive a password reset code",
      };
    }

    // Generate password reset OTP
    const otp = await otpService.generateAndStorePasswordResetOTP(user.id);

    // Send password reset email
    try {
      await emailService.sendPasswordResetEmail(
        user.email,
        user.first_name,
        otp,
      );
    } catch (emailError) {
      console.error("Failed to send password reset email:", emailError);
      const error = new Error("Failed to send password reset email");
      error.statusCode = 500;
      throw error;
    }

    return {
      message: "Password reset code sent to your email",
    };
  }

  async resetPassword(email, otp, newPassword) {
    const user = await otpService.verifyPasswordResetOTP(email, otp);

    // Hash new password
    const hashedPassword = await Helpers.hashPassword(newPassword);

    // Update password and clear reset token
    await User.update(
      {
        password: hashedPassword,
        password_reset_token: null,
        password_reset_expires: null,
        updated_at: new Date(),
      },
      {
        where: { id: user.id },
      },
    );

    // Send password changed confirmation email
    try {
      await emailService.sendPasswordChangedEmail(user.email, user.first_name);
    } catch (emailError) {
      console.error("Failed to send password changed email:", emailError);
    }

    return {
      message: "Password reset successfully",
    };
  }

  async refreshToken(refreshToken) {
    if (!refreshToken) {
      const error = new Error("Refresh token is required");
      error.statusCode = 400;
      throw error;
    }

    try {
      const decoded = Helpers.verifyToken(refreshToken);

      const user = await User.findOne({
        where: {
          id: decoded.id,
          is_active: true,
          is_deleted: false,
          is_email_verified: true,
        },
      });

      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      const tokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const newAccessToken = Helpers.generateToken(tokenPayload);
      const newRefreshToken = Helpers.generateRefreshToken(tokenPayload);

      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      };
    } catch (error) {
      const tokenError = new Error("Invalid refresh token");
      tokenError.statusCode = 401;
      throw tokenError;
    }
  }

  async getProfile(userId) {
    const user = await User.findOne({
      where: {
        id: userId,
        is_active: true,
        is_deleted: false,
      },
    });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    return Helpers.sanitizeUser(user);
  }

  async updateProfile(userId, updateData) {
    const { first_name, last_name, email } = updateData;

    // Check if email is being updated and if it already exists
    if (email) {
      const existingUser = await User.findOne({
        where: {
          email: email.toLowerCase(),
          id: { [Op.ne]: userId },
          is_deleted: false,
        },
      });

      if (existingUser) {
        const error = new Error("Email already exists");
        error.statusCode = 409;
        throw error;
      }
    }

    const updateFields = {
      ...(first_name && { first_name }),
      ...(last_name && { last_name }),
      updated_by: userId,
      updated_at: new Date(),
    };

    // If email is being updated, require re-verification
    if (email) {
      updateFields.email = email.toLowerCase();
      updateFields.is_email_verified = false;
    }

    const [updatedRowsCount] = await User.update(updateFields, {
      where: {
        id: userId,
        is_active: true,
        is_deleted: false,
      },
    });

    if (updatedRowsCount === 0) {
      const error = new Error("User not found or no changes made");
      error.statusCode = 404;
      throw error;
    }

    const updatedUser = await User.findByPk(userId);

    // If email was updated, send new verification email
    if (email) {
      try {
        const otp =
          await otpService.generateAndStoreEmailVerificationOTP(userId);
        await emailService.sendVerificationEmail(
          updatedUser.email,
          updatedUser.first_name,
          otp,
        );
      } catch (emailError) {
        console.error(
          "Failed to send verification email for updated email:",
          emailError,
        );
      }
    }

    return Helpers.sanitizeUser(updatedUser);
  }

  async changePassword(userId, passwordData) {
    const { current_password, new_password } = passwordData;

    const user = await User.findOne({
      where: {
        id: userId,
        is_active: true,
        is_deleted: false,
      },
    });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // Verify current password
    const isCurrentPasswordValid = await Helpers.comparePassword(
      current_password,
      user.password,
    );
    if (!isCurrentPasswordValid) {
      const error = new Error("Current password is incorrect");
      error.statusCode = 400;
      throw error;
    }

    // Hash new password
    const hashedNewPassword = await Helpers.hashPassword(new_password);

    await User.update(
      {
        password: hashedNewPassword,
        updated_by: userId,
        updated_at: new Date(),
      },
      {
        where: { id: userId },
      },
    );

    // Send password changed confirmation email
    try {
      await emailService.sendPasswordChangedEmail(user.email, user.first_name);
    } catch (emailError) {
      console.error("Failed to send password changed email:", emailError);
    }
  }
}

module.exports = new AuthService();
