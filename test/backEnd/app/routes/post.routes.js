const express = require("express")
const router = express.Router()
const postController = require("../controllers/post.controller")
const postSchema = require("../validate_schema/post.schema")
const verifyToken = require("_middleware/verify-token")
const verifyRoles = require("_middleware/verfiy-roles")
const ROLES_LIST = require("_config/roles_list")
const multer = require("multer") // Import multer for S3 upload
const uploadS3 = multer({ storage: multer.memoryStorage() }) // Configure multer to store files in memory

// Post Routes
router.get("/categories", postController.getPostCategories)
router.get("/list", postSchema.getPostList, postController.getPostList)
router.get("/:id", postSchema.getPostById, postController.getPostById)

// Authenticated routes
router.post(
  "/create",
  verifyToken,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
  uploadS3.single("featured_image"), // Use multer for S3 upload, 'featured_image' is the field name
  postSchema.createPost,
  postController.createPost,
)
router.put(
  "/update",
  verifyToken,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
  uploadS3.single("featured_image"), // Use multer for S3 upload
  postSchema.updatePost,
  postController.updatePost,
)
router.delete(
  "/delete",
  verifyToken,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
  postSchema.deletePost,
  postController.deletePost,
)
router.post(
  "/like",
  verifyToken,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User),
  postSchema.likePost,
  postController.likePost,
)
router.post(
  "/comment",
  verifyToken,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User),
  postSchema.addComment,
  postController.addComment,
)
router.get("/comments/:id", postSchema.getPostComments, postController.getPostComments)

module.exports = router
