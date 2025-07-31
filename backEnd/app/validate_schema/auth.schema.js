const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");

/**
 * ---------------------------------------
 * Schema Functions for Auth API
 * ---------------------------------------
 */

module.exports = {
  userRegister,
  userLogin,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyEmailOtp, // Add this line
};

// User Registration Schema
function userRegister(req, res, next) {
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{6,})/;
  const schema = Joi.object().keys({
    first_name: Joi.string().min(2).max(255).required(),
    last_name: Joi.string().min(2).max(255).required(),
    email: Joi.string().email().lowercase().required(),
    phone_no: Joi.number().integer().min(1000000000).max(9999999999).optional(),
    password: Joi.string()
      .pattern(PASSWORD_REGEX)
      .trim(true)
      .min(6)
      .max(20)
      .required()
      .messages({
        "string.pattern.base": `Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number!`,
      }),
    confirm_password: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .options({
        messages: { "any.only": "{{#label}} does not match" },
      }),
  });
  validateRequest(req, res, next, schema);
}

// User Login Schema
function userLogin(req, res, next) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().messages({
      "any.required": "Password is required!",
    }),
  });
  validateRequest(req, res, next, schema);
}

// Update Profile Schema
function updateProfile(req, res, next) {
  const schema = Joi.object().keys({
    first_name: Joi.string().min(2).max(255).optional(),
    last_name: Joi.string().min(2).max(255).optional(),
    email: Joi.string().email().lowercase().optional(),
    phone_no: Joi.number().integer().min(1000000000).max(9999999999).optional(),
  });
  validateRequest(req, res, next, schema);
}

// Change Password Schema
function changePassword(req, res, next) {
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{6,})/;
  const schema = Joi.object().keys({
    current_password: Joi.string().required(),
    new_password: Joi.string()
      .pattern(PASSWORD_REGEX)
      .trim(true)
      .min(6)
      .max(20)
      .required()
      .messages({
        "string.pattern.base": `Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number!`,
      }),
    confirm_password: Joi.string()
      .valid(Joi.ref("new_password"))
      .required()
      .options({
        messages: { "any.only": "{{#label}} does not match" },
      }),
  });
  validateRequest(req, res, next, schema);
}

// Forgot Password Schema
function forgotPassword(req, res, next) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
  });
  validateRequest(req, res, next, schema);
}

// Reset Password Schema
function resetPassword(req, res, next) {
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{6,})/;
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    reset_token: Joi.string().required(),
    new_password: Joi.string()
      .pattern(PASSWORD_REGEX)
      .trim(true)
      .min(6)
      .max(20)
      .required()
      .messages({
        "string.pattern.base": `Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number!`,
      }),
    confirm_password: Joi.string()
      .valid(Joi.ref("new_password"))
      .required()
      .options({
        messages: { "any.only": "{{#label}} does not match" },
      }),
  });
  validateRequest(req, res, next, schema);
}

// Verify Email OTP Schema
function verifyEmailOtp(req, res, next) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    otp: Joi.string()
      .length(6)
      .pattern(/^[0-9]+$/)
      .required()
      .messages({
        "string.pattern.base": "OTP must be a 6-digit number.",
        "string.length": "OTP must be 6 digits long.",
      }),
  });
  validateRequest(req, res, next, schema);
}
