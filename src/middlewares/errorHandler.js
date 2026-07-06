// Global error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error("❌ Error caught by global handler:", err.stack || err);

  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    // Only send the stack trace in development mode
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
