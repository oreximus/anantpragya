require("rootpath")()
const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const errorHandler = require("_middleware/error-handler")
const ipHandler = require("_middleware/ipHandler")
const logger = require("_helpers/logger")
const config = require("_config/config.json")
const allowDomain = require("_config/allow_domain.json")
const redisCache = require("_helpers/redis-cache")

// Connect to Redis
redisCache.connectRedis()

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(ipHandler) // Custom IP handler

// Enable CORS for specific origins
const corsOptions = {
  origin: (origin, callback) => {
    if (allowDomain.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

// API Routes
app.use("/", require("./routes"))

// Global error handler
app.use(errorHandler)

// Start server
const port = process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000
app.listen(port, () => logger.info("Server listening on port " + port))
