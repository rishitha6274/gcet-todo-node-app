import express from 'express'
import userModel from "../models/userModel.js";

const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    const result = await userModel.create({ name, email, pass });
    res.json({ message: "User registered successfully", user: result });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  const result = await userModel.findOne({ email, pass });

  if (!result) return res.json({ message: "Invalid User or Password" });

  return res.json({
    token: "dummy_token_123", 
    name: result.name,
    email: result.email
  });
});


userRouter.get("/:id", async(req, res)=>{
    const {name,email,pass} = req.params.id
    const result = await userModel.findOne({email});
    return res.json(result);
})

userRouter.get("/:id/name", async(req, res)=>{
    const email = req.params.id
    const result = await userModel.findOne({email},{_id:0,name:1});
    return res.json(result);
})

export default userRouter