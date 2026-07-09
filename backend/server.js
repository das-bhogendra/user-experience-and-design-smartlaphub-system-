import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import contactRoute from "./routes/contactRoute.js";

// App Config
const app = express();

console.log("PORT env value:", process.env.PORT);
const port = process.env.PORT || 5000;

// Connect DB
connectDB();

// Connect Cloudinary
connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/contact", contactRoute);

app.get("/", (req, res) => {
  res.send("API WORKING");
});


app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});