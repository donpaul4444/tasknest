import { connectToDB } from "@/lib/mongoose";
import Project from "@/models/Project";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

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