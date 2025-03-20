import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Project from "@/models/Project";
import { verifyToken, isAdmin } from "@/lib/auth";

export async function GET() {
  try {
    // Connect to database
    await connectToDatabase();

    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Verify authentication and admin status
    const authResult = await verifyToken(request);
    if (!authResult.success) {
      return NextResponse.json(
        { message: authResult.message },
        { status: authResult.status }
      );
    }

    if (!isAdmin(authResult.user)) {
      return NextResponse.json(
        { message: "Admin access required" },
        { status: 403 }
      );
    }

    // Connect to database
    await connectToDatabase();

    const projectData = await request.json();
    const newProject = new Project(projectData);

    await newProject.save();
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
