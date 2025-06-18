const RoadmapItem = require("../models/RoadmapItem");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc    Get all roadmap items
// @route   GET /api/roadmap
// @access  Public
exports.getRoadmapItems = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resource
  query = RoadmapItem.find(JSON.parse(queryStr));

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await RoadmapItem.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const roadmapItems = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: roadmapItems.length,
    pagination,
    data: roadmapItems,
  });
});

// @desc    Get single roadmap item
// @route   GET /api/roadmap/:id
// @access  Public
exports.getRoadmapItem = asyncHandler(async (req, res, next) => {
  const roadmapItem = await RoadmapItem.findById(req.params.id);

  if (!roadmapItem) {
    return next(
      new ErrorResponse(
        `Roadmap item not found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: roadmapItem,
  });
});

// @desc    Upvote a roadmap item
// @route   PUT /api/roadmap/:id/upvote
// @access  Private
exports.upvoteRoadmapItem = asyncHandler(async (req, res, next) => {
  let roadmapItem = await RoadmapItem.findById(req.params.id);

  if (!roadmapItem) {
    return next(
      new ErrorResponse(
        `Roadmap item not found with id of ${req.params.id}`,
        404
      )
    );
  }

  // Check if user already upvoted
  if (roadmapItem.upvotedBy.includes(req.user.id)) {
    return next(new ErrorResponse("You have already upvoted this item", 400));
  }

  roadmapItem = await RoadmapItem.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { upvotes: 1 },
      $addToSet: { upvotedBy: req.user.id },
    },
    { new: true, runValidators: true }
  );

  // Add to user's upvotedItems
  await User.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { upvotedItems: req.params.id } },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: roadmapItem,
  });
});

// @desc    Remove upvote from a roadmap item
// @route   PUT /api/roadmap/:id/remove-upvote
// @access  Private
exports.removeUpvote = asyncHandler(async (req, res, next) => {
  let roadmapItem = await RoadmapItem.findById(req.params.id);

  if (!roadmapItem) {
    return next(
      new ErrorResponse(
        `Roadmap item not found with id of ${req.params.id}`,
        404
      )
    );
  }

  // Check if user has upvoted
  if (!roadmapItem.upvotedBy.includes(req.user.id)) {
    return next(new ErrorResponse("You have not upvoted this item", 400));
  }

  roadmapItem = await RoadmapItem.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { upvotes: -1 },
      $pull: { upvotedBy: req.user.id },
    },
    { new: true, runValidators: true }
  );

  // Remove from user's upvotedItems
  await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { upvotedItems: req.params.id } },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: roadmapItem,
  });
});
