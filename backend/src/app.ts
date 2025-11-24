import express from "express";
import cors from "cors";
import taskRouter from "./routes/tasks.router";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get("/health", (req, res) => {
  res.json({ status: "ok", version: "0.1.0" });
});

// Routes
app.use("/api/tasks", taskRouter);

// Error Middleware (keep after routes)
app.use(errorHandler);

export default app;
