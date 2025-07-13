const express = require("express")
const router = express.Router()

// API Routes
router.use("/auth", require("./auth.routes"))
router.use("/user", require("./user.routes"))
router.use("/post", require("./post.routes"))

module.exports = router
