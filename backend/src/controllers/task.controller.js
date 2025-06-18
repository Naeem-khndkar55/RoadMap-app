const Task = require("../models/task.model");

const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

const createTask = async (req, res) => {
  const { title, description, priority, status, dueDate } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Please add a title");
  }

  const task = await Task.create({
    user: req.user._id,
    title,
    description,
    priority,
    status,
    dueDate,
  });

  res.status(201).json(task);
};

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updatedTask);
};

const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await task.deleteOne();
  res.json({ id: req.params.id });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
