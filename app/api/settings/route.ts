import { NextResponse } from "next/server";
import dbConnect from "@/utils/lib/dbConnect";
import Setting from "@/utils/models/Setting";
import { verifyAdmin } from "@/utils/lib/auth";

export async function GET() {
  try {
    await dbConnect();
    let settings = await Setting.findOne({});
    if (!settings) {
      settings = await Setting.create({
        companyName: "Shreeji Constructions",
        tagline: "Building Your Tomorrow",
        phone: "+91 98765 43210",
        whatsapp: "+919876543210",
        email: "info@shreejiconstructions.com",
        address: "Indore, Madhya Pradesh, India",
        experienceYears: "15+",
        projectsCompleted: "120+",
        happyClients: "98%",
        bannerText: "Now accepting bookings for Q1 Villa & Bungalow Construction in Indore & MP.",
        showBanner: true,
        heroHeading: "Complete Home, Bungalow & Villa Construction",
        heroSubheading: "From foundation to finishing — we bring your vision to life with quality, transparency and commitment.",
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com",
      });
    }

    return NextResponse.json({ success: true, settings }, { status: 200 });
  } catch (error: any) {
    console.error("Get Settings Error:", error);
    return NextResponse.json(
      { success: false, message: "Error loading settings.", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    await dbConnect();

    let settings = await Setting.findOne({});
    if (!settings) {
      settings = await Setting.create(body);
    } else {
      Object.keys(body).forEach((key) => {
        if (key !== "_id" && key !== "createdAt" && key !== "updatedAt" && key !== "__v") {
          settings[key] = body[key];
        }
      });
      await settings.save();
    }

    return NextResponse.json(
      { success: true, message: "Settings updated successfully.", settings },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Update Settings Error:", error);
    return NextResponse.json(
      { success: false, message: "Error updating settings.", error: error.message },
      { status: 500 }
    );
  }
}
