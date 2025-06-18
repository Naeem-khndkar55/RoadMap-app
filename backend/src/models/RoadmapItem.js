const mongoose = require("mongoose");

const RoadmapItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    trim: true,
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description cannot be more than 500 characters"],
  },
  status: {
    type: String,
    enum: ["Planned", "In Progress", "Completed", "On Hold"],
    default: "Planned",
  },
  category: {
    type: String,
    enum: ["Feature", "Improvement", "Bug Fix", "Other"],
    default: "Feature",
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  upvotedBy: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("RoadmapItem", RoadmapItemSchema);
