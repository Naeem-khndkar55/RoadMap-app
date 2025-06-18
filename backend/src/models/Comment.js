const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Please add some content"],
    maxlength: [300, "Comment cannot be more than 300 characters"],
  },
  roadmapItem: {
    type: mongoose.Schema.ObjectId,
    ref: "RoadmapItem",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  parentComment: {
    type: mongoose.Schema.ObjectId,
    ref: "Comment",
    default: null,
  },
  replies: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
    },
  ],
  depth: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent nesting deeper than 3 levels
CommentSchema.pre("save", async function (next) {
  if (this.parentComment) {
    const parent = await this.model("Comment").findById(this.parentComment);
    if (parent.depth >= 2) {
      throw new Error("Maximum comment depth reached (3 levels)");
    }
    this.depth = parent.depth + 1;
  }
  next();
});

module.exports = mongoose.model("Comment", CommentSchema);
