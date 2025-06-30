const express = require("express")
const blogController = require("../controllers/blog.controller")
const { authenticate, authorize } = require("../middleware/auth")
const { validate } = require("../middleware/validation")
const {
  createPostSchema,
  updatePostSchema,
  postActivitySchema,
  postQuerySchema,
} = require("../validation_schema/blog.schema")

const router = express.Router()

// Public routes
router.get("/posts", blogController.getAllPosts)
router.get("/posts/:id", blogController.getPostById)

// Protected routes
router.use(authenticate)

// Post management
router.post("/posts", validate(createPostSchema), blogController.createPost)
router.put("/posts/:id", validate(updatePostSchema), blogController.updatePost)
router.delete("/posts/:id", blogController.deletePost)
router.get("/my-posts", blogController.getMyPosts)

// Post activities
router.post("/posts/:id/activity", validate(postActivitySchema), blogController.addPostActivity)
router.get("/posts/:id/activities", blogController.getPostActivities)

// Admin only routes
router.delete("/posts/:id/force", authorize("admin"), blogController.forceDeletePost)
router.get("/all-posts", authorize("admin"), blogController.getAllPostsAdmin)

module.exports = router
