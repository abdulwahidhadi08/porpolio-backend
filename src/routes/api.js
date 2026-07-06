import { Router } from "express";
import { body } from "express-validator";
import { submitContactForm } from "../controllers/contactController.js";
import { getProjects, createProject } from "../controllers/projectController.js";
import { getSkills, createSkillCategory } from "../controllers/skillController.js";
import { contactLimiter } from "../middlewares/rateLimiter.js";
import mongoose from "mongoose";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import { DEFAULT_PROJECTS, DEFAULT_SKILLS } from "../config/defaultData.js";
import fs from "fs/promises";
import path from "path";

const router = Router();

// --- Contact Route ---
router.post(
  "/contact",
  contactLimiter,
  [
    body("name").trim().notEmpty().withMessage("Name is required").escape(),
    body("email").trim().isEmail().withMessage("Please enter a valid email address").normalizeEmail(),
    body("subject").trim().notEmpty().withMessage("Subject is required").escape(),
    body("message").trim().notEmpty().withMessage("Message content is required").escape(),
  ],
  submitContactForm
);

// --- Projects Routes ---
router.get("/projects", getProjects);
router.post("/projects", createProject);

// --- Skills Routes ---
router.get("/skills", getSkills);
router.post("/skills", createSkillCategory);

// --- Database Seeding Route ---
// Allows you to reset the database/files to default values
router.post("/seed", async (req, res, next) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      // Clear existing records
      await Project.deleteMany({});
      await Skill.deleteMany({});

      // Seed defaults
      await Project.insertMany(DEFAULT_PROJECTS);
      await Skill.insertMany(DEFAULT_SKILLS);

      console.log("🌱 Database seeded successfully!");
      return res.status(200).json({
        success: true,
        message: "Database seeded successfully with default projects and skills!",
      });
    } else {
      // Fallback: Write default arrays to local JSON files
      const dataDir = path.resolve("data");
      await fs.mkdir(dataDir, { recursive: true });

      await fs.writeFile(path.join(dataDir, "projects.json"), JSON.stringify(DEFAULT_PROJECTS, null, 2), "utf8");
      await fs.writeFile(path.join(dataDir, "skills.json"), JSON.stringify(DEFAULT_SKILLS, null, 2), "utf8");

      console.log("🌱 Fallback JSON files seeded successfully!");
      return res.status(200).json({
        success: true,
        message: "Fallback JSON files seeded successfully with default projects and skills!",
      });
    }
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    next(error);
  }
});

export default router;
