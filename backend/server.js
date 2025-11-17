import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { generateReport } from "./controllers/reportController.js";

dotenv.config();

// Check if API key is loaded
console.log("Gemini API Key Loaded:", !!process.env.GEMINI_API_KEY);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simple request logger
app.use((req, res, next) => {
  console.log(`🛜 ${req.method} ${req.url}`);
  next();
});

// Routes
app.post("/api/report/generate", generateReport);

// Root route
app.get("/", (req, res) => {
  res.send("✅ Gemini Report Generator Backend is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
