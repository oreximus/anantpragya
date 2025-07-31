const express = require("express")
const router = express.Router()

// import all api routes
router.use("/auth", require("./auth.routes"))
router.use("/user", require("./user.routes"))
router.use("/post", require("./post.routes"))

// Exports
module.exports = router
