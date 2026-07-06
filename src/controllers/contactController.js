import { validationResult } from "express-validator";
import mongoose from "mongoose";
import Message from "../models/Message.js";
import { sendContactNotification } from "../utils/nodemailer.js";
import fs from "fs/promises";
import path from "path";

// Ensure data directory exists for fallback JSON storage
const ensureDataDir = async () => {
  const dirPath = path.resolve("data");
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    // Ignore if directory already exists
  }
  return dirPath;
};

export const submitContactForm = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({ field: err.path, message: err.msg })),
    });
  }

  const { name, email, subject, message } = req.body;

  try {
    let savedMessage;
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      // Save to MongoDB
      savedMessage = new Message({ name, email, subject, message });
      await savedMessage.save();
      console.log(`💾 Message saved to MongoDB: ${savedMessage._id}`);
    } else {
      // Fallback: Save to local JSON file
      const dirPath = await ensureDataDir();
      const filePath = path.join(dirPath, "messages.json");
      
      let messages = [];
      try {
        const fileContent = await fs.readFile(filePath, "utf8");
        messages = JSON.parse(fileContent);
      } catch (err) {
        // File does not exist yet or is empty
      }

      savedMessage = {
        _id: `local_${Date.now()}`,
        name,
        email,
        subject,
        message,
        createdAt: new Date().toISOString(),
      };

      messages.push(savedMessage);
      await fs.writeFile(filePath, JSON.stringify(messages, null, 2), "utf8");
      console.log("💾 Message saved to local JSON fallback file.");
    }

    // Try to send email notification (non-blocking, won't fail the request if email fails)
    const emailResult = await sendContactNotification({ name, email, subject, message });

    res.status(201).json({
      success: true,
      message: "Your message has been received successfully!",
      data: {
        id: savedMessage._id,
        name: savedMessage.name,
      },
      emailSent: emailResult.success && !emailResult.simulated,
    });
  } catch (error) {
    console.error("❌ Error processing contact submission:", error);
    next(error);
  }
};
