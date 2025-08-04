import { connectToDB } from "@/lib/mongoose";
import Project from "@/models/Project";
import { NextRequest ,NextResponse} from "next/server";

export async function POST(req:NextRequest){
    try {
        await connectToDB()
        const body = await req.json()
        const {name,email}=body

        if(!name || !email){
             return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const newProject = await Project.create({name,createdBy:email})
        return NextResponse.json({message:"Project created",project:newProject},{status:201})
        
    } catch (error) {
         console.error("❌ FULL ERROR STACK:\n", error); 
         return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}

export async function GET(req:NextRequest){
    try {
        await connectToDB()
        const email = req.nextUrl.searchParams.get("email")
   
        
        if(!email){
            return NextResponse.json({error:"Email is required"},{status:400})
        }
        const projects = (await Project.find({createdBy:email}).sort({ createdAt: -1 }))
  
        return NextResponse.json(projects,{status:200})
    } catch (error) {
            return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}


export async function DELETE(req:NextRequest){
    try {
        await connectToDB()
        const email= req.nextUrl.searchParams.get("email")
        const id= req.nextUrl.searchParams.get("id")

            if (!email || !id) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

        await Project.deleteOne({_id:id,createdBy:email})

        return NextResponse.json({message:"Project deleted"},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Failed to delete project"},{status:500})
    }
}