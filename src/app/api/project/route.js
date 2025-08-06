import { connectToDB } from "@/lib/mongoose";
import Project from "@/models/Project";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const user = await User.findOne({ email: "donpaul4444@gmail.com" });
    if (!user) throw new Error("User not found");
    const newProject = await Project.create({ name, createdBy: user._id });
    return NextResponse.json(
      { message: "Project created", project: newProject },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ FULL ERROR STACK:\n", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToDB();
    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const projects = await Project.find({ createdBy: user._id }).sort({
      createdAt: -1,
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectToDB();
    const email = req.nextUrl.searchParams.get("email");
    const id = req.nextUrl.searchParams.get("id");

    if (!email || !id) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await Project.deleteOne({ _id: id, createdBy: user._id });

    return NextResponse.json({ message: "Project deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
