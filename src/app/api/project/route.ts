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
        return NextResponse.json(newProject,{status:201})
        
    } catch (error) {
         console.error("❌ FULL ERROR STACK:\n", error); 
         return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}