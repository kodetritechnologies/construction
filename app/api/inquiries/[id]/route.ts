import { NextResponse } from "next/server";
import dbConnect from "@/utils/lib/dbConnect";
import Inquiry from "@/utils/models/Inquiry";
import { verifyAdmin } from "@/utils/lib/auth";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    const { status } = await req.json();

    await dbConnect();
    const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });

    if (!updated) {
      return NextResponse.json({ success: false, message: "Inquiry not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry: updated }, { status: 200 });
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
    await Inquiry.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Inquiry deleted." }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
