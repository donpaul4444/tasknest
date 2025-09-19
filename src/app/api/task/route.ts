import { connectToDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/Task";
import User from "@/models/User";

export async function POST(req:NextRequest){
try {
    await connectToDB()

    const body =await req.json()
    const {title,description,assignedTo,priority,projectId} =body
    console.log("assignedto",assignedTo);
    

    const task= await Task.create({
        title,
        description,
        assignedTo:assignedTo,
        priority:priority ,
        projectId,
        status:"todo"
    })
   await task.populate("assignedTo", "email");

    return NextResponse.json({success:true,task},{status:201})
} catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
}
}

export async function GET(req:NextRequest){
    try {
    const projectId=req.nextUrl.searchParams.get("projectId")
    const tasks= await Task.find({projectId}).populate("assignedTo","email")
    return NextResponse.json({success:true,tasks})
    } catch (error) {
           return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}


