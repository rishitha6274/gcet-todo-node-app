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
todoRouter.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const updated = await Todo.findByIdAndUpdate(id, { completed }, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update todo" });
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


todoRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo" });
  }
});


export default todoRouter;
