import { Schema, model, models } from "mongoose";

const ServiceSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Service description is required"],
      trim: true,
    },
    icon: {
      type: String,
      default: "Home",
      trim: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default models.Service || model("Service", ServiceSchema);
