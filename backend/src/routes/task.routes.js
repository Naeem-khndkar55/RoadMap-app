const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

router.route("/").get(protect, getTasks).post(protect, createTask);
router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
