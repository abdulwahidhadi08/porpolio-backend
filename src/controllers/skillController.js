import mongoose from "mongoose";
import Skill from "../models/Skill.js";
import { DEFAULT_SKILLS } from "../config/defaultData.js";
import fs from "fs/promises";
import path from "path";

const skillsFilePath = path.resolve("data", "skills.json");

// Ensure data directory exists
const ensureDataDir = async () => {
  const dirPath = path.resolve("data");
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    // Ignore
  }
};

export const getSkills = async (req, res, next) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      // Fetch from MongoDB, sorted by order ascending
      const skills = await Skill.find().sort({ order: 1 });
      
      // If DB is empty, return the defaults
      if (skills.length === 0) {
        return res.json(DEFAULT_SKILLS);
      }
      
      return res.json(skills);
    } else {
      // Fallback: Fetch from local JSON file
      await ensureDataDir();
      try {
        const fileContent = await fs.readFile(skillsFilePath, "utf8");
        const skills = JSON.parse(fileContent);
        return res.json(skills);
      } catch (err) {
        // File doesn't exist; seed it with DEFAULT_SKILLS
        await fs.writeFile(skillsFilePath, JSON.stringify(DEFAULT_SKILLS, null, 2), "utf8");
        return res.json(DEFAULT_SKILLS);
      }
    }
  } catch (error) {
    console.error("❌ Error fetching skills:", error);
    next(error);
  }
};

export const createSkillCategory = async (req, res, next) => {
  const { category, skills, order } = req.body;
  try {
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      const newCategory = new Skill({ category, skills: skills || [], order });
      await newCategory.save();
      return res.status(201).json({ success: true, data: newCategory });
    } else {
      await ensureDataDir();
      let skillCategories = [];
      try {
        const fileContent = await fs.readFile(skillsFilePath, "utf8");
        skillCategories = JSON.parse(fileContent);
      } catch (err) {
        skillCategories = [...DEFAULT_SKILLS];
      }

      const newCategory = {
        _id: `cat_${Date.now()}`,
        category,
        skills: skills || [],
        order: Number(order) || 0,
        createdAt: new Date().toISOString(),
      };

      skillCategories.push(newCategory);
      // Sort by order ascending
      skillCategories.sort((a, b) => (a.order || 0) - (b.order || 0));
      await fs.writeFile(skillsFilePath, JSON.stringify(skillCategories, null, 2), "utf8");
      
      return res.status(201).json({ success: true, data: newCategory });
    }
  } catch (error) {
    console.error("❌ Error creating skill category:", error);
    next(error);
  }
};
