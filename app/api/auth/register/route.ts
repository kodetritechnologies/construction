import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import dbConnect from "@/utils/lib/dbConnect";
import Admin from "@/utils/models/Admin";
import { generateToken } from "@/utils/lib/jwt";
import { verifyAdmin } from "@/utils/lib/auth";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const adminCount = await Admin.countDocuments({ deleted_at: null });
    if (adminCount > 0) {
      const requester = await verifyAdmin(req);
      if (!requester) {
        return NextResponse.json(
          { success: false, message: "Unauthorized. Admin registration is restricted." },
          { status: 401 }
        );
      }
    }

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Please provide name, email, and password." },
        { status: 400 }
      );
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json(
        { success: false, message: "Email already registered to an admin account." },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: adminCount === 0 ? "superadmin" : "admin",
    });

    const token = generateToken({ id: newAdmin._id, email: newAdmin.email, role: newAdmin.role });

    const cookieStore = await cookies();
    cookieStore.set("adminToken", token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: false,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Admin registered successfully.",
        token,
        admin: {
          id: newAdmin._id,
          name: newAdmin.name,
          email: newAdmin.email,
          role: newAdmin.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error during registration.", error: error.message },
      { status: 500 }
    );
  }
}
