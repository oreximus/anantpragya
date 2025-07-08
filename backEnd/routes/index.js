const express = require("express");
const router = express.Router();

// import all api routes
router.use("/api", require("../app/routes"));

// Exports
module.exports = router;
