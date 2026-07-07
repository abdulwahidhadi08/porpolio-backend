import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import apiRoutes from "./src/routes/api.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import { apiLimiter } from "./src/middlewares/rateLimiter.js";
import { config } from "dotenv";
config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security Headers: Helmet configures HTTP headers securely
app.use(
  helmet({
    contentSecurityPolicy: false, // Disabled to prevent blocking local scripts/styles in dev
    crossOriginEmbedderPolicy: false,
  }),
);

// CORS: Enable Cross-Origin Resource Sharing for all origins in development
app.use(
  cors({
    origin: "https://portpolio-frontend-pi.vercel.app",
  }),
);

// Morgan: HTTP request logger middleware
app.use(morgan("dev"));

// Body Parser: Parse JSON bodies
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Rate Limiter: Apply rate limit to all /api requests
app.use("/api", apiLimiter);

// API Routing: Link API endpoints
app.use("/api", apiRoutes);

// Production Static Serving
// If running in production mode and frontend build exists, Express will serve the static files from the compiled frontend dist folder
const distPath = path.resolve(__dirname, "../frontend/dist");
if (process.env.NODE_ENV === "production" && fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  // Simple welcome landing for backend server URL
  app.get("/", (req, res) => {
    res.json({
      success: true,
      message: "Portfolio API is online. Direct frontend requests to /api.",
    });
  });
}

// Global Error Handler Middleware (MUST be defined last)
app.use(errorHandler);

export default app;
