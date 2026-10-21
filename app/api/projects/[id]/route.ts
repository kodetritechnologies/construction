import { NextResponse } from "next/server";
import dbConnect from "@/utils/lib/dbConnect";
import Project from "@/utils/models/Project";
import { verifyAdmin } from "@/utils/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, project }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    await dbConnect();
    const updated = await Project.findByIdAndUpdate(id, body, { new: true });

    if (!updated) {
      return NextResponse.json({ success: false, message: "Project not found." }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, message: "Project updated successfully.", project: updated },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    await Project.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Project deleted successfully." }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
