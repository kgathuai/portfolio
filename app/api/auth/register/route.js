import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export async function POST(request) {
  try {
    const { username, password, adminSecret } = await request.json();

    // Check if admin secret matches
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { message: "Invalid admin secret" },
        { status: 403 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin user
    const user = new User({
      username,
      password: hashedPassword,
      isAdmin: true,
    });

    await user.save();
    return NextResponse.json(
      { message: "Admin user created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
