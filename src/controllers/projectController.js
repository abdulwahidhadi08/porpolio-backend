import mongoose from "mongoose";
import Project from "../models/Project.js";
import { DEFAULT_PROJECTS } from "../config/defaultData.js";
import fs from "fs/promises";
import path from "path";

const projectsFilePath = path.resolve("data", "projects.json");

// Ensure data directory exists
const ensureDataDir = async () => {
  const dirPath = path.resolve("data");
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    // Ignore
  }
};

export const getProjects = async (req, res, next) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      // Fetch from MongoDB, sorted by order ascending
      const projects = await Project.find().sort({ order: 1 });
      
      // If DB is empty, return the defaults (or seed them)
      if (projects.length === 0) {
        return res.json(DEFAULT_PROJECTS);
      }
      
      return res.json(projects);
    } else {
      // Fallback: Fetch from local JSON file
      await ensureDataDir();
      try {
        const fileContent = await fs.readFile(projectsFilePath, "utf8");
        const projects = JSON.parse(fileContent);
        return res.json(projects);
      } catch (err) {
        // File doesn't exist or is invalid; seed it with DEFAULT_PROJECTS
        await fs.writeFile(projectsFilePath, JSON.stringify(DEFAULT_PROJECTS, null, 2), "utf8");
        return res.json(DEFAULT_PROJECTS);
      }
    }
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  const { title, description, tech, image, github, live, order } = req.body;
  try {
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      const newProject = new Project({ title, description, tech, image, github, live, order });
      await newProject.save();
      return res.status(201).json({ success: true, data: newProject });
    } else {
      await ensureDataDir();
      let projects = [];
      try {
        const fileContent = await fs.readFile(projectsFilePath, "utf8");
        projects = JSON.parse(fileContent);
      } catch (err) {
        projects = [...DEFAULT_PROJECTS];
      }

      const newProject = {
        _id: `proj_${Date.now()}`,
        title,
        description,
        tech: tech || [],
        image: image || "💻",
        github: github || "#",
        live: live || "#",
        order: Number(order) || 0,
        createdAt: new Date().toISOString(),
      };

      projects.push(newProject);
      // Sort projects by order ascending
      projects.sort((a, b) => (a.order || 0) - (b.order || 0));
      await fs.writeFile(projectsFilePath, JSON.stringify(projects, null, 2), "utf8");
      
      return res.status(201).json({ success: true, data: newProject });
    }
  } catch (error) {
    console.error("❌ Error creating project:", error);
    next(error);
  }
};
