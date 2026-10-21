import { Schema, model, models } from "mongoose";

const SettingSchema = new Schema(
  {
    companyName: {
      type: String,
      default: "Shreeji Constructions",
      trim: true,
    },
    tagline: {
      type: String,
      default: "Building Your Tomorrow",
      trim: true,
    },
    phone: {
      type: String,
      default: "+91 98765 43210",
      trim: true,
    },
    whatsapp: {
      type: String,
      default: "+919876543210",
      trim: true,
    },
    email: {
      type: String,
      default: "info@shreejiconstructions.com",
      trim: true,
    },
    address: {
      type: String,
      default: "Indore, Madhya Pradesh, India",
      trim: true,
    },
    experienceYears: {
      type: String,
      default: "15+",
      trim: true,
    },
    projectsCompleted: {
      type: String,
      default: "120+",
      trim: true,
    },
    happyClients: {
      type: String,
      default: "98%",
      trim: true,
    },
    bannerText: {
      type: String,
      default: "Now accepting bookings for Q1 Villa & Bungalow Construction in Indore & MP.",
      trim: true,
    },
    showBanner: {
      type: Boolean,
      default: true,
    },
    heroHeading: {
      type: String,
      default: "Complete Home, Bungalow & Villa Construction",
      trim: true,
    },
    heroSubheading: {
      type: String,
      default: "From foundation to finishing — we bring your vision to life with quality, transparency and commitment.",
      trim: true,
    },
    facebook: {
      type: String,
      default: "https://facebook.com",
      trim: true,
    },
    instagram: {
      type: String,
      default: "https://instagram.com",
      trim: true,
    },
    linkedin: {
      type: String,
      default: "https://linkedin.com",
      trim: true,
    },
  },
  { timestamps: true }
);

export default models.Setting || model("Setting", SettingSchema);
