// server/routes/tasks.js
const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const { isLoggedIn } = require("../middleware/middleware");

// 1. GET ALL TASKS
router.get("/", isLoggedIn, async (req, res) => {
  try {
    const tasks = await Task.find({ author: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
});

// 2. CREATE TASK
router.post("/", isLoggedIn, async (req, res) => {
  try {
    const task = new Task(req.body);
    task.author = req.user._id;
    await task.save();
    res.status(201).json(task);
  } catch (e) {
    res.status(400).json({ message: "Error creating task" });
  }
});

// 👇 3. UPDATE TASK (Edit & Mark as Done ke liye) - NEW CODE
router.put("/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    // Check karein ki task user ka hi hai na
    const task = await Task.findOneAndUpdate(
      { _id: id, author: req.user._id },
      req.body, // Jo naya data aaya hai (status ya title/desc)
      { new: true } // Updated task wapas bhejo
    );

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (e) {
    res.status(400).json({ message: "Error updating task" });
  }
});

// 4. DELETE TASK
router.delete("/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findOneAndDelete({ _id: id, author: req.user._id });
    res.json({ message: "Task deleted" });
  } catch (e) {
    res.status(500).json({ message: "Error deleting task" });
  }
});

module.exports = router;
