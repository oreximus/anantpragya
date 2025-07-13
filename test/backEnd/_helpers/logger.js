/**
 * Logger
 */
const winston = require("winston")
const path = require("path")

const logDir = "logs" // Directory for log files

// Create the log directory if it doesn't exist
if (!require("fs").existsSync(logDir)) {
  require("fs").mkdirSync(logDir)
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf((info) => `${info.timestamp} - ${info.level}: ${info.message}`),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
    }),
  ],
})

module.exports = logger
