import { NextResponse } from "next/server";
import dbConnect from "@/utils/lib/dbConnect";
import Service from "@/utils/models/Service";
import { verifyAdmin } from "@/utils/lib/auth";

export async function GET() {
  try {
    await dbConnect();
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    return NextResponse.json({ success: true, count: services.length, services }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
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

    if (!body.title || !body.description) {
      return NextResponse.json(
        { success: false, message: "Title and Description are required." },
        { status: 400 }
      );
    }

    const service = await Service.create(body);
    return NextResponse.json({ success: true, service }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
