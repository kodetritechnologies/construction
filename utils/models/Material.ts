import { Schema, model, models } from "mongoose";

const MaterialSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Material name is required"],
      trim: true,
    },
    standard: {
      type: String,
      required: [true, "Standard or grade is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    icon: {
      type: String,
      default: "ShieldCheck",
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default models.Material || model("Material", MaterialSchema);
