import express from "express";
import { clerkWenbhook } from "../controllers/webhookController.js";
import bodyParser from "body-parser";
const router = express.Router();

router.post(
    "/clerk",
    bodyParser.raw({ type: "application/json" }),
    clerkWenbhook
);

export default router;
