import { NextResponse } from "next/server";
import dbConnect from "@/utils/lib/dbConnect";
import Material from "@/utils/models/Material";
import { verifyAdmin } from "@/utils/lib/auth";

export async function GET() {
  try {
    await dbConnect();
    const materials = await Material.find({}).sort({ order: 1 });
    return NextResponse.json({ success: true, count: materials.length, materials }, { status: 200 });
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

    if (!body.name || !body.standard) {
      return NextResponse.json(
        { success: false, message: "Material name and standard are required." },
        { status: 400 }
      );
    }

    const material = await Material.create(body);
    return NextResponse.json({ success: true, material }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
