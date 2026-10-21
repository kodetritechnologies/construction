import { NextResponse } from "next/server";
import dbConnect from "@/utils/lib/dbConnect";
import Faq from "@/utils/models/Faq";
import { verifyAdmin } from "@/utils/lib/auth";

export async function GET() {
  try {
    await dbConnect();
    const faqs = await Faq.find({}).sort({ order: 1, createdAt: 1 });
    return NextResponse.json({ success: true, count: faqs.length, faqs }, { status: 200 });
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

    if (!body.question || !body.answer) {
      return NextResponse.json(
        { success: false, message: "Question and Answer are required." },
        { status: 400 }
      );
    }

    const faq = await Faq.create(body);
    return NextResponse.json({ success: true, faq }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
