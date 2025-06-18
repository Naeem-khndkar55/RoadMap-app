const express = require("express");
const router = express.Router();

// Import route files
const authRoutes = require("./authRoutes");
const roadmapRoutes = require("./roadmapRoutes");
const commentsRoutes = require("./commentsRoutes");

// Mount routers
router.use("/auth", authRoutes);
router.use("/api", roadmapRoutes);
router.use("/api", commentsRoutes);

module.exports = router;
