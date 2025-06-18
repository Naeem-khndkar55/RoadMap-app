const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { notFound, errorHandler } = require("./middleware/error.middleware");
const connectDB = require("./config/db.config");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
require("dotenv").config();
const app = express();
const url = process.env.CLIENT_URL;
// Connect to database
connectDB();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: [url],

    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
