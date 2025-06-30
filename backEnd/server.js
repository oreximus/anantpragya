const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const compression = require("compression")
const morgan = require("morgan")

const logger = require("./src/utils/logger")
const { sequelize } = require("./src/config/database")
const routes = require("./src/routes")
const { errorHandler, notFound } = require("./src/middleware/errorHandler")

const app = express()

// Security middleware
app.use(helmet())
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"],
    credentials: true,
  }),
)

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
})
app.use("/api/", limiter)

// Body parsing middleware
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(compression())

// Logging middleware
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  }),
)

// Routes
app.use("/api", routes)

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  })
})

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

// Database connection and server start
const startServer = async () => {
  try {
    await sequelize.authenticate()
    logger.info("Database connection established successfully.")

    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true })
      logger.info("Database synchronized.")
    }

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`)
    })
  } catch (error) {
    logger.error("Unable to start server:", error)
    process.exit(1)
  }
}

// Graceful shutdown
process.on("SIGTERM", async () => {
  logger.info("SIGTERM received, shutting down gracefully")
  await sequelize.close()
  process.exit(0)
})

process.on("SIGINT", async () => {
  logger.info("SIGINT received, shutting down gracefully")
  await sequelize.close()
  process.exit(0)
})

startServer()
