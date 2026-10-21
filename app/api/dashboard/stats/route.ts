import { NextResponse } from "next/server";
import dbConnect from "@/utils/lib/dbConnect";
import Inquiry from "@/utils/models/Inquiry";
import Project from "@/utils/models/Project";
import Review from "@/utils/models/Review";
import Faq from "@/utils/models/Faq";
import { verifyAdmin } from "@/utils/lib/auth";

export async function GET(req: Request) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    await dbConnect();

    const [
      totalInquiries,
      newInquiries,
      totalProjects,
      totalReviews,
      totalFaqs,
      recentInquiries,
    ] = await Promise.all([
      Inquiry.countDocuments({}),
      Inquiry.countDocuments({ status: "New" }),
      Project.countDocuments({}),
      Review.countDocuments({}),
      Faq.countDocuments({}),
      Inquiry.find({}).sort({ createdAt: -1 }).limit(5),
    ]);

    return NextResponse.json(
      {
        success: true,
        stats: {
          totalInquiries,
          newInquiries,
          totalProjects,
          totalReviews,
          totalFaqs,
          recentInquiries,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Dashboard Stats Error:", error);
    return NextResponse.json(
      { success: false, message: "Error loading stats.", error: error.message },
      { status: 500 }
    );
  }
}
