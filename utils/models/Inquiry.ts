import { Schema, model, models } from "mongoose";

const InquirySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    projectType: {
      type: String,
      default: "Residential Construction",
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    budget: {
      type: String,
      default: "",
      trim: true,
    },
    plotSize: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["New", "In Progress", "Contacted", "Completed", "Archived"],
      default: "New",
    },
  },
  { timestamps: true }
);

export default models.Inquiry || model("Inquiry", InquirySchema);
