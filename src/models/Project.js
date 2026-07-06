import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },
    tech: {
      type: [String],
      required: true,
      default: [],
    },
    image: {
      type: String,
      required: true,
      default: "💻", // Fallback emoji or icon string
    },
    github: {
      type: String,
      required: true,
      default: "#",
    },
    live: {
      type: String,
      required: true,
      default: "#",
    },
    order: {
      type: Number,
      default: 0, // Used to sort projects
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
