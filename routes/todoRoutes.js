import express from "express";
import Todo from "../models/todoModel.js";
import userModel from "../models/userModel.js"; 

const todoRouter = express.Router();
// todoRouter.get("/test", (req, res) => {
//   res.json({ message: "Todo router is working!" });
// });
// todoRouter.post("/", (req, res) => {
//   console.log("Received body:", req.body);
//   res.json({ message: "POST /todos works!", received: req.body });
// });


todoRouter.post("/", async (req, res) => {
  const { email, task } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const newTodo = await Todo.create({ userId: user._id, task });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "Failed to create todo" });
  }
});

todoRouter.get("/:email", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const todos = await Todo.find({ userId: user._id });
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Failed to fetch todos" });
  }
});

todoRouter.put("/:email", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const updated = await Todo.updateMany(
      { userId: user._id }, 
      req.body,
      { new: true }
    );

    res.json({ message: `${updated.modifiedCount} todos updated` });
  } catch (error) {
    res.status(500).json({ message: "Failed to update todos" });
  }
});

todoRouter.delete("/:email", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const deleted = await Todo.deleteMany({ userId: user._id });
    res.json({ message: `${deleted.deletedCount} todos deleted` });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todos" });
  }
});


export default todoRouter;
