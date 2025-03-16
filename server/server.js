import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
dotenv.config();

const app = express();

// middleware

app.use(express.json());
app.use(cors());

// routes
app.use("/api/todos", todoRoutes);

//error handling
app.use(errorHandler);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port : ${PORT}`);
});
