const express = require("express")
const authRoutes = require("./auth.route")
const blogRoutes = require("./blog.route")
const masterRoutes = require("./master.route")

const router = express.Router()

// API routes
router.use("/auth", authRoutes)
router.use("/blog", blogRoutes)
router.use("/master", masterRoutes)

module.exports = router
