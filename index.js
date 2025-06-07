import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import todoRouter from "./routes/todoRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const MONGODB_URI = process.env.MONGODB_URI


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.use("/users", userRouter);
app.use("/todos", todoRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(8080, () => {
      console.log("Server started on port 8080");
    });
  })
  .catch((error) => {
    console.log(error);
  });


export default app;
