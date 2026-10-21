import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    category: {
      type: String,
      default: "Villa",
      enum: ["Villa", "Bungalow", "Residential", "Commercial", "Renovation"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      default: "Indore, Madhya Pradesh",
      trim: true,
    },
    bhk: {
      type: String,
      default: "4 BHK",
      trim: true,
    },
    sqft: {
      type: String,
      default: "4,200 sq. ft.",
      trim: true,
    },
    duration: {
      type: String,
      default: "12 months",
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default models.Project || model("Project", ProjectSchema);
