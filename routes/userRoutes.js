import express from 'express'
import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
const SECRET_KEY = "helloworld";

const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashpassword = await bcrypt.hash(pass, 10);
    const result = await userModel.create({ name, email, pass: hashpassword });
    res.json({ message: "User registered successfully", user: result });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  const result = await userModel.findOne({ email });
  if (!result) return res.json({ message: "Invalid User or Password" });
  const matchPassword = await bcrypt.compare(pass, result.pass);
  if(!matchPassword){
    return res.status(400).json({message: "Invalid Password"});
  }
  const token = jwt.sign({email: result.email, id: result._id}, SECRET_KEY);
  return res.json({
    user: result, token: token
    // token: "dummy_token_123", 
    // name: result.name,
    // email: result.email,
    // pass: hashpassword,
  });
});


userRouter.get("/user/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const result = await userModel.findOne({ email });
    if (!result) return res.status(404).json({ message: "User not found" });
    return res.json(result);
  } catch (err) {
    console.error("Fetch user error:", err);
    res.status(500).json({ message: "Error fetching user" });
  }
});

userRouter.get("/user/:email/name", async (req, res) => {
  const email = req.params.email;
  try {
    const result = await userModel.findOne({ email }, { _id: 0, name: 1 });
    if (!result) return res.status(404).json({ message: "User not found" });
    return res.json(result);
  } catch (err) {
    console.error("Fetch user name error:", err);
    res.status(500).json({ message: "Error fetching user name" });
  }
});


export default userRouter