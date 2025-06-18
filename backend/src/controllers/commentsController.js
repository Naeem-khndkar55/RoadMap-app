const Comment = require("../models/Comment");
const RoadmapItem = require("../models/RoadmapItem");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc    Get comments for a roadmap item
// @route   GET /api/roadmap/:roadmapItemId/comments
// @access  Public
exports.getComments = asyncHandler(async (req, res, next) => {
  if (!req.params.roadmapItemId) {
    return next(new ErrorResponse("Please provide a roadmap item ID", 400));
  }

  const comments = await Comment.find({
    roadmapItem: req.params.roadmapItemId,
    parentComment: null,
  })
    .populate("user", "name")
    .populate({
      path: "replies",
      populate: {
        path: "user",
        select: "name",
      },
    })
    .sort("-createdAt");

  res.status(200).json({
    success: true,
    count: comments.length,
    data: comments,
  });
});

// @desc    Add comment to roadmap item
// @route   POST /api/roadmap/:roadmapItemId/comments
// @access  Private
exports.addComment = asyncHandler(async (req, res, next) => {
  req.body.roadmapItem = req.params.roadmapItemId;
  req.body.user = req.user.id;

  const roadmapItem = await RoadmapItem.findById(req.params.roadmapItemId);

  if (!roadmapItem) {
    return next(
      new ErrorResponse(
        `No roadmap item with the id of ${req.params.roadmapItemId}`,
        404
      )
    );
  }

  const comment = await Comment.create(req.body);

  // If it's a reply, add to parent comment's replies array
  if (req.body.parentComment) {
    await Comment.findByIdAndUpdate(req.body.parentComment, {
      $addToSet: { replies: comment._id },
    });
  }

  res.status(201).json({
    success: true,
    data: comment,
  });
});

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
exports.updateComment = asyncHandler(async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is comment owner
  if (comment.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this comment`,
        401
      )
    );
  }

  comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: comment,
  });
});

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is comment owner
  if (comment.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this comment`,
        401
      )
    );
  }

  // If it's a reply, remove from parent comment's replies array
  if (comment.parentComment) {
    await Comment.findByIdAndUpdate(comment.parentComment, {
      $pull: { replies: comment._id },
    });
  }

  // Delete all replies first
  if (comment.replies && comment.replies.length > 0) {
    await Comment.deleteMany({ _id: { $in: comment.replies } });
  }

  await comment.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
