
import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongoose";
import Project from "@/models/Project";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";

interface CustomSession {
  user: {
    _id: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
  };
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB()
    const body = await req.json();
    const { name} = body;
     const session = (await getServerSession(
        authOptions
      )) as CustomSession | null;
  
      if (!session || !session.user || !session.user._id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

    if (!name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const user = await User.findById(session.user._id);
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

export async function GET() {
  try {
   await connectToDB();
  
      const session = (await getServerSession(
        authOptions
      )) as CustomSession | null;
  
      if (!session || !session.user || !session.user._id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
 
    const user = await User.findById(session.user._id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const projects = await Project.find({$or:[{ createdBy: user._id },{members:user._id}]}).sort({
      createdAt: -1,
    }).populate("createdBy")

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
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
