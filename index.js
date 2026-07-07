import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./src/config/db.js";
import mongoose from "mongoose";

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Connect to MongoDB Database
connectDB();

// Start server listening
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Graceful Shutdown on termination signals
const gracefulShutdown = (signal) => {
  console.log(`\n👋 Received ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    console.log("🔒 HTTP server closed.");
    try {
      if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
        console.log("💾 MongoDB connection closed.");
      }
    } catch (err) {
      console.error("Error during database close:", err);
    }
    process.exit(0);
  });
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
