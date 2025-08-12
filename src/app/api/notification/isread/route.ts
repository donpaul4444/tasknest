import { connectToDB } from "@/lib/mongoose";
import Notification from "@/models/Notification";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        await connectToDB()

        const {notificationId}=await req.json()

         if (!notificationId) {
      return NextResponse.json({ success: false, message: "Notification ID required" }, { status: 400 });
    }
       await Notification.findByIdAndUpdate(notificationId,{isRead:true})
        return NextResponse.json({success:true})

    } catch (error) {
            return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}