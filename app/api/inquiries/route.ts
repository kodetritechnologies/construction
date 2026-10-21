import { NextResponse } from "next/server";
import dbConnect from "@/utils/lib/dbConnect";
import Inquiry from "@/utils/models/Inquiry";
import { getPaginatedData } from "@/utils/lib/pagination";
import { verifyAdmin } from "@/utils/lib/auth";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, email, phone, projectType, message, budget, plotSize } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields (Name, Phone, and Message)." },
        { status: 400 }
      );
    }

    const newInquiry = await Inquiry.create({
      name,
      email: email || "Not provided",
      phone,
      projectType: projectType || "Residential Construction",
      message,
      budget: budget || "",
      plotSize: plotSize || "",
      status: "New",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been received! Our construction team will contact you shortly.",
        inquiry: newInquiry,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create Inquiry Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit inquiry. Please try again.", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    await dbConnect();
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const search = url.searchParams.get("search");
    const page = url.searchParams.get("page");
    const limit = url.searchParams.get("limit") || "10";

    let query: any = {};
    if (status && status !== "All") {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { projectType: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const { data: inquiries, totalCount, totalPages, currentPage } = await getPaginatedData(
      Inquiry,
      query,
      { page, limit },
      { createdAt: -1 }
    );

    return NextResponse.json(
      {
        success: true,
        count: inquiries.length,
        totalCount,
        totalPages,
        currentPage,
        inquiries,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get Inquiries Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error fetching inquiries.", error: error.message },
      { status: 500 }
    );
  }
}
