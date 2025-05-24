import dotenv from "dotenv";

import express from "express";

import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";

import userRouter from "./routes/userRoute.js";
import postRouter from "./routes/postRoute.js";
import webhookRouter from "./routes/webhookRoute.js";
import commentRouter from "./routes/commentRoute.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
connectDB();

app.use(cors(process.env.CLIENT_URL));

app.use(clerkMiddleware());

app.get("/protect", requireAuth(), (req, res) => {
    res.status(200).json("content");
});

app.get("/", (req, res) => {
    res.status(200).json("Server is running");
});

app.use("/webhooks", webhookRouter);
app.use(express.json());

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message || "Internal Server Error",
        status: error.status || 500,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
