const express = require("express");
const {
  getRoadmapItems,
  getRoadmapItem,
  upvoteRoadmapItem,
  removeUpvote,
} = require("../controllers/roadmapController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getRoadmapItems);
router.route("/:id").get(getRoadmapItem);
router.route("/:id/upvote").put(protect, upvoteRoadmapItem);
router.route("/:id/remove-upvote").put(protect, removeUpvote);

module.exports = router;
