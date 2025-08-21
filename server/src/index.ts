import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import "dotenv/config";
import { connect as DBconnect } from "./lib/database";

import authRoutes from "./routes/auth.route";
import questionRoutes from "./routes/question.route";
import answerRoutes from "./routes/answer.route";

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/answer", answerRoutes);

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await DBconnect();
});
