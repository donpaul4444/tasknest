
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


export async function GET(req:NextRequest) {
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
const projectId= req.nextUrl.searchParams.get("projectId")

    const project = await Project.findOne({_id:projectId,$or:[{ createdBy: user._id },{members:user._id}]}).populate("createdBy")

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}