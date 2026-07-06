import mongoose from "mongoose";

const skillItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  icon: {
    type: String, // SVG string or image URL
    required: true,
  },
});

const skillCategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
    },
    skills: [skillItemSchema],
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model("Skill", skillCategorySchema);
export default Skill;
