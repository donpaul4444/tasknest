import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongoose";
import Project from "@/models/Project";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface CustomSession {
  user: {
    _id: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
  };
}


export async function GET(req:NextRequest){
try {
    await connectToDB()
    const projectId= req.nextUrl.searchParams.get("projectId")

    const project= await Project.findById(projectId).populate("members","_id")

    type Member = { _id: { toString: () => string } };
    const membersIds = project.members.map((member: Member) => member._id.toString());

    const result= await User.find({_id:{$in:membersIds}},"email")

    return NextResponse.json({result},{status:200})


} catch (error) {
    return NextResponse.json({message:error},{status:500})
}
}

export async function POST(req:NextRequest){
    try {
        await connectToDB();
        
            const session = (await getServerSession(
              authOptions
            )) as CustomSession | null;
        
            if (!session || !session.user || !session.user._id) {
              return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }

   const body = await req.json()
   const{projectId,userId}=body
   const updatedProject= await Project.findByIdAndUpdate(projectId,{$pull:{members:userId}},{new:true})
       if (!updatedProject) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
return NextResponse.json({success:true,message:"User removed successfully"})

    } catch (error:any) {
            return NextResponse.json({ message: error.message }, { status: 500 });
    }
}