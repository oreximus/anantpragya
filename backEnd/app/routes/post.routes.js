/**
 * Define Post routes
 */
const express = require("express");
const router = express.Router();
const verifyToken = require("_middleware/verify-token");
const uploadImage = require("_middleware/upload-image"); // Import the upload middleware
const controllers = require("../controllers/post.controller");
const schema = require("../validate_schema/post.schema");

// API routes
router.get("/categories", controllers.getPostCategories);
router.get("/list", schema.getPostList, controllers.getPostList);
router.get("/:id", schema.getPostById, controllers.getPostById);
router.post(
  "/create",
  verifyToken,
  uploadImage("featuredImage"),
  schema.createPost,
  controllers.createPost,
);
router.post(
  "/update",
  verifyToken,
  uploadImage("featuredImage"),
  schema.updatePost,
  controllers.updatePost,
);
router.post("/delete", verifyToken, schema.deletePost, controllers.deletePost);
router.post("/like", verifyToken, schema.likePost, controllers.likePost);
router.post("/comment", verifyToken, schema.addComment, controllers.addComment);
router.get(
  "/:id/comments",
  schema.getPostComments,
  controllers.getPostComments,
);

module.exports = router;
