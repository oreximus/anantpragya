const express = require("express")
const masterController = require("../controllers/master.controller")
const { authenticate, authorize } = require("../middleware/auth")
const { validate } = require("../middleware/validation")
const { createCategorySchema, updateCategorySchema } = require("../validation_schema/master.schema")

const router = express.Router()

// Public routes
router.get("/categories", masterController.getAllCategories)
router.get("/categories/:id", masterController.getCategoryById)

// Admin only routes
router.use(authenticate)
router.use(authorize("admin"))

router.post("/categories", validate(createCategorySchema), masterController.createCategory)
router.put("/categories/:id", validate(updateCategorySchema), masterController.updateCategory)
router.delete("/categories/:id", masterController.deleteCategory)

module.exports = router
