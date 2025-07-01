const nodemailer = require("nodemailer");
const logger = require("../utils/logger");

class EmailConfig {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    try {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      // Verify connection configuration
      this.transporter.verify((error, success) => {
        if (error) {
          logger.error("Email configuration error:", error);
        } else {
          logger.info("Email server is ready to send messages");
        }
      });
    } catch (error) {
      logger.error("Failed to initialize email transporter:", error);
    }
  }

  getTransporter() {
    return this.transporter;
  }
}

module.exports = new EmailConfig();
