import express from "express";
import Todo from "../models/todoModel.js";

const todoRouter = express.Router();

todoRouter.post("/new", async (req, res) => {
  const { task } = req.body;
  try {
    const newTodo = await Todo.create({ task, completed: false });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "Failed to create todo" });
  }
});

todoRouter.get("/all", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Failed to fetch todos" });
  }
});

todoRouter.put("/update", async (req, res) => {
  try {
    const { id, ...updates } = req.body;
const updated = await Todo.findByIdAndUpdate(id, updates, { new: true });
    res.json({ message: `${updated.modifiedCount} todos updated` });
  } catch (error) {
    res.status(500).json({ message: "Failed to update todos" });
  }
});

todoRouter.delete("/delete", async (req, res) => {
  try {
    const deleted = await Todo.deleteMany();
    res.json({ message: `${deleted.deletedCount} todos deleted` });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todos" });
  }
});

export default todoRouter;
