const express = require("express");
const {
  getComments,
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentsController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router
  .route("/:roadmapItemId/comments")
  .get(getComments)
  .post(protect, addComment);

router
  .route("/comments/:id")
  .put(protect, updateComment)
  .delete(protect, deleteComment);

module.exports = router;
