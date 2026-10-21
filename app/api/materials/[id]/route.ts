import { NextResponse } from "next/server";
import dbConnect from "@/utils/lib/dbConnect";
import Material from "@/utils/models/Material";
import { verifyAdmin } from "@/utils/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    await dbConnect();
    const updated = await Material.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json({ success: true, material: updated }, { status: 200 });
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
    await Material.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Material deleted." }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
