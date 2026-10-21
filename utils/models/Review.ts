import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
    },
    location: {
      type: String,
      default: "Indore",
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
      default: 5,
    },
    text: {
      type: String,
      required: [true, "Review text is required"],
      trim: true,
    },
    imgUrl: {
      type: String,
      default: "",
    },
    projectTitle: {
      type: String,
      default: "Modern Villa Construction",
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default models.Review || model("Review", ReviewSchema);
