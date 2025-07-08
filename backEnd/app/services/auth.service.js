/**
 * Fixed auth service with proper password field inclusion
 */
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const db = require("_helpers/db");
const common = require("_helpers/common");
const securePwd = require("_helpers/secure-password");
const catchError = require("_middleware/catch-error");

module.exports = {
  userRegister,
  userLogin,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
};

// User Registration
async function userRegister(params) {
  try {
    // Check if user already exists
    const existingUser = await db.User.findOne({
      where: {
        email: params.email,
        is_deleted: 0,
      },
    });

    if (existingUser) {
      throw "User with this email already exists!";
    }

    // Hash password
    const hashedPassword = await securePwd.securePassword(params.password);

    // Create new user
    const user = new db.User();
    user.first_name = params.first_name;
    user.last_name = params.last_name;
    user.email = params.email;
    user.phone_no = params.phone_no || null;
    user.password = hashedPassword;
    user.created_at = common.curDateTime();
    user.updated_at = common.curDateTime();

    const savedUser = await user.save();

    // Generate JWT Token
    const jwtData = {
      time: Date(),
      userId: savedUser.id,
      isAdmin: savedUser.is_admin,
    };
    const token = jwt.sign(jwtData, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    // Update access token
    await db.User.update(
      { access_token: token, updated_at: common.curDateTime() },
      { where: { id: savedUser.id } },
    );

    const output = {
      id: savedUser.id,
      first_name: savedUser.first_name,
      last_name: savedUser.last_name,
      email: savedUser.email,
      phone_no: savedUser.phone_no,
      is_admin: savedUser.is_admin,
      access_token: token,
      expire_token: "7 days",
    };

    return output;
  } catch (err) {
    console.log(err);
    throw catchError(err);
  }
}

// User Login - FIXED VERSION
async function userLogin(params) {
  try {
    // Input validation
    if (!params.email || !params.password) {
      throw "Email and password are required!";
    }

    // Find user by email - IMPORTANT: Use withHash scope to include password field
    const user = await db.User.scope("withHash").findOne({
      where: {
        email: params.email,
        is_deleted: 0,
        is_active: 1,
      },
    });

    if (!user) {
      throw "Invalid credentials. Please try again!";
    }

    // Debug logging
    console.log("Login attempt for:", params.email);
    console.log("User found:", !!user);
    console.log("Password field exists:", !!user.password);
    console.log("Input password provided:", !!params.password);

    // Validate password
    if (!user.password) {
      throw "User password not found. Please contact administrator.";
    }

    const isPasswordValid = await securePwd.comparePassword(
      params.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw "Invalid credentials. Please try again!";
    }

    // Generate JWT Token
    const jwtData = {
      time: Date(),
      userId: user.id,
      isAdmin: user.is_admin,
    };
    const token = jwt.sign(jwtData, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    // Update access token
    await db.User.update(
      { access_token: token, updated_at: common.curDateTime() },
      { where: { id: user.id } },
    );

    const output = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_no: user.phone_no,
      is_admin: user.is_admin,
      access_token: token,
      expire_token: "7 days",
    };

    return output;
  } catch (err) {
    console.log("Login error:", err);
    throw catchError(err);
  }
}

// Get Profile
async function getProfile(auth) {
  try {
    const user = await db.User.findOne({
      where: {
        id: auth.user_id,
        is_deleted: 0,
        is_active: 1,
      },
    });

    if (!user) {
      throw "User not found!";
    }

    return user;
  } catch (err) {
    console.log(err);
    throw catchError(err);
  }
}

// Update Profile
async function updateProfile(params, auth) {
  try {
    const user = await db.User.findOne({
      where: {
        id: auth.user_id,
        is_deleted: 0,
        is_active: 1,
      },
    });

    if (!user) {
      throw "User not found!";
    }

    // Check if email is already taken by another user
    if (params.email && params.email !== user.email) {
      const existingUser = await db.User.findOne({
        where: {
          email: params.email,
          id: { [Op.not]: auth.user_id },
          is_deleted: 0,
        },
      });

      if (existingUser) {
        throw "Email is already taken by another user!";
      }
    }

    // Update user
    user.first_name = params.first_name || user.first_name;
    user.last_name = params.last_name || user.last_name;
    user.email = params.email || user.email;
    user.phone_no = params.phone_no || user.phone_no;
    user.updated_at = common.curDateTime();
    user.updated_by = auth.user_id;

    await user.save();

    return user;
  } catch (err) {
    console.log(err);
    throw catchError(err);
  }
}

// Change Password
async function changePassword(params, auth) {
  try {
    const user = await db.User.scope("withHash").findOne({
      where: {
        id: auth.user_id,
        is_deleted: 0,
        is_active: 1,
      },
    });

    if (!user) {
      throw "User not found!";
    }

    // Validate current password
    if (
      !(await securePwd.comparePassword(params.current_password, user.password))
    ) {
      throw "Current password is incorrect!";
    }

    // Hash new password
    const hashedPassword = await securePwd.securePassword(params.new_password);

    // Update password
    user.password = hashedPassword;
    user.updated_at = common.curDateTime();
    user.updated_by = auth.user_id;

    await user.save();

    return { message: "Password changed successfully" };
  } catch (err) {
    console.log(err);
    throw catchError(err);
  }
}

// Forgot Password
async function forgotPassword(params) {
  try {
    const user = await db.User.findOne({
      where: {
        email: params.email,
        is_deleted: 0,
        is_active: 1,
      },
    });

    if (!user) {
      throw "User with this email does not exist!";
    }

    // Generate reset token
    const resetToken = common.generateRandomString(32);

    // Here you would typically save the reset token to database and send email
    // For now, we'll just return success message

    return { message: "Password reset instructions sent to your email" };
  } catch (err) {
    console.log(err);
    throw catchError(err);
  }
}

// Reset Password
async function resetPassword(params) {
  try {
    // Here you would typically validate the reset token
    // For now, we'll just find user by email

    const user = await db.User.scope("withHash").findOne({
      where: {
        email: params.email,
        is_deleted: 0,
        is_active: 1,
      },
    });

    if (!user) {
      throw "Invalid reset token or user not found!";
    }

    // Hash new password
    const hashedPassword = await securePwd.securePassword(params.new_password);

    // Update password
    user.password = hashedPassword;
    user.updated_at = common.curDateTime();

    await user.save();

    return { message: "Password reset successfully" };
  } catch (err) {
    console.log(err);
    throw catchError(err);
  }
}
