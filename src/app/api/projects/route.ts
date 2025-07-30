import { connectToDB } from "@/lib/mongoose";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    try {
        await connectToDB()
        const body = await req.json()
        
    } catch (error) {
        
    }
}