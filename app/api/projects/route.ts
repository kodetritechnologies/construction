import { NextResponse } from "next/server";
import dbConnect from "@/utils/lib/dbConnect";
import Project from "@/utils/models/Project";
import { verifyAdmin } from "@/utils/lib/auth";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const category = url.searchParams.get("category");
    const featured = url.searchParams.get("featured");

    let query: any = {};
    if (category && category !== "All") {
      query.category = category;
    }
    if (featured === "true") {
      query.isFeatured = true;
    }

    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });

    return NextResponse.json({ success: true, count: projects.length, projects }, { status: 200 });
  } catch (error: any) {
    console.error("Get Projects Error:", error);
    return NextResponse.json(
      { success: false, message: "Error loading projects.", error: error.message },
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

    await dbConnect();
    const body = await req.json();

    if (!body.title || !body.imageUrl) {
      return NextResponse.json(
        { success: false, message: "Title and Image URL are required." },
        { status: 400 }
      );
    }

    const project = await Project.create(body);

    return NextResponse.json(
      { success: true, message: "Project created successfully.", project },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create Project Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create project.", error: error.message },
      { status: 500 }
    );
  }
}
