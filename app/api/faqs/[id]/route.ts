import { NextResponse } from "next/server";
import dbConnect from "@/utils/lib/dbConnect";
import Faq from "@/utils/models/Faq";
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
    const updated = await Faq.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json({ success: true, faq: updated }, { status: 200 });
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
    await Faq.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "FAQ deleted." }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
