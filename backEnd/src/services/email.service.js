const emailConfig = require("../config/email");
const logger = require("../utils/logger");

class EmailService {
  constructor() {
    this.transporter = emailConfig.getTransporter();
    this.fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER;
    this.fromName = process.env.FROM_NAME || "Blog Platform";
  }

  async sendEmail(to, subject, html, text = null) {
    try {
      if (!this.transporter) {
        throw new Error("Email transporter not initialized");
      }

      const mailOptions = {
        from: `"${this.fromName}" <${this.fromEmail}>`,
        to,
        subject,
        html,
        text: text || this.stripHtml(html),
      };

      const result = await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent successfully to ${to}`, {
        messageId: result.messageId,
      });
      return result;
    } catch (error) {
      logger.error("Failed to send email:", error);
      throw error;
    }
  }

  async sendVerificationEmail(email, firstName, otp) {
    const subject = "Verify Your Email Address";
    const html = this.getVerificationEmailTemplate(firstName, otp);

    return await this.sendEmail(email, subject, html);
  }

  async sendPasswordResetEmail(email, firstName, otp) {
    const subject = "Reset Your Password";
    const html = this.getPasswordResetEmailTemplate(firstName, otp);

    return await this.sendEmail(email, subject, html);
  }

  async sendWelcomeEmail(email, firstName) {
    const subject = "Welcome to Our Blog Platform!";
    const html = this.getWelcomeEmailTemplate(firstName);

    return await this.sendEmail(email, subject, html);
  }

  async sendPasswordChangedEmail(email, firstName) {
    const subject = "Password Changed Successfully";
    const html = this.getPasswordChangedEmailTemplate(firstName);

    return await this.sendEmail(email, subject, html);
  }

  getVerificationEmailTemplate(firstName, otp) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #007bff; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background: #f9f9f9; }
          .otp-box { background: #fff; border: 2px solid #007bff; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
          .otp-code { font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 5px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          .button { display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Email Verification</h1>
          </div>
          <div class="content">
            <h2>Hello ${firstName}!</h2>
            <p>Thank you for registering with our Blog Platform. To complete your registration, please verify your email address using the OTP code below:</p>
            
            <div class="otp-box">
              <p>Your verification code is:</p>
              <div class="otp-code">${otp}</div>
              <p><small>This code will expire in 10 minutes</small></p>
            </div>
            
            <p>If you didn't create an account with us, please ignore this email.</p>
            
            <p>Best regards,<br>The Blog Platform Team</p>
          </div>
          <div class="footer">
            <p>This is an automated email. Please do not reply to this message.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getPasswordResetEmailTemplate(firstName, otp) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #dc3545; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background: #f9f9f9; }
          .otp-box { background: #fff; border: 2px solid #dc3545; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
          .otp-code { font-size: 32px; font-weight: bold; color: #dc3545; letter-spacing: 5px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <h2>Hello ${firstName}!</h2>
            <p>We received a request to reset your password. Use the OTP code below to reset your password:</p>
            
            <div class="otp-box">
              <p>Your password reset code is:</p>
              <div class="otp-code">${otp}</div>
              <p><small>This code will expire in 10 minutes</small></p>
            </div>
            
            <div class="warning">
              <strong>Security Notice:</strong> If you didn't request a password reset, please ignore this email and consider changing your password as a precaution.
            </div>
            
            <p>Best regards,<br>The Blog Platform Team</p>
          </div>
          <div class="footer">
            <p>This is an automated email. Please do not reply to this message.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getWelcomeEmailTemplate(firstName) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #28a745; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background: #f9f9f9; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          .feature { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #28a745; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Blog Platform!</h1>
          </div>
          <div class="content">
            <h2>Hello ${firstName}!</h2>
            <p>Congratulations! Your email has been verified successfully and your account is now active.</p>
            
            <p>Here's what you can do now:</p>
            
            <div class="feature">
              <h3>📝 Create Posts</h3>
              <p>Share your thoughts and ideas with the community</p>
            </div>
            
            <div class="feature">
              <h3>💬 Engage</h3>
              <p>Like, comment, and share posts from other users</p>
            </div>
            
            <div class="feature">
              <h3>🏷️ Categorize</h3>
              <p>Organize your posts with categories and tags</p>
            </div>
            
            <p>We're excited to have you as part of our community!</p>
            
            <p>Best regards,<br>The Blog Platform Team</p>
          </div>
          <div class="footer">
            <p>This is an automated email. Please do not reply to this message.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getPasswordChangedEmailTemplate(firstName) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Changed</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #17a2b8; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background: #f9f9f9; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          .security-notice { background: #d1ecf1; border: 1px solid #bee5eb; padding: 15px; border-radius: 5px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Changed Successfully</h1>
          </div>
          <div class="content">
            <h2>Hello ${firstName}!</h2>
            <p>This email confirms that your password has been changed successfully.</p>
            
            <div class="security-notice">
              <strong>Security Information:</strong>
              <ul>
                <li>Date: ${new Date().toLocaleString()}</li>
                <li>If you didn't make this change, please contact our support team immediately</li>
                <li>Consider enabling two-factor authentication for added security</li>
              </ul>
            </div>
            
            <p>Your account security is important to us. If you have any concerns, please don't hesitate to reach out.</p>
            
            <p>Best regards,<br>The Blog Platform Team</p>
          </div>
          <div class="footer">
            <p>This is an automated email. Please do not reply to this message.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  stripHtml(html) {
    return html.replace(/<[^>]*>/g, "");
  }
}

module.exports = new EmailService();
