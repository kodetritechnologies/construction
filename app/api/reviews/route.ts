import { NextResponse } from "next/server";
import dbConnect from "@/utils/lib/dbConnect";
import Review from "@/utils/models/Review";
import { verifyAdmin } from "@/utils/lib/auth";

export async function GET() {
  try {
    await dbConnect();
    const reviews = await Review.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, count: reviews.length, reviews }, { status: 200 });
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

    if (!body.name || !body.text) {
      return NextResponse.json(
        { success: false, message: "Name and Review text are required." },
        { status: 400 }
      );
    }

    const review = await Review.create(body);
    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
