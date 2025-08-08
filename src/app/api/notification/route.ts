import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Notification from "@/models/Notification";

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
    await connectToDB();

    const session = (await getServerSession(
      authOptions
    )) as CustomSession | null;

    if (!session || !session.user || !session.user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { receiverId, projectId } = body;

    const newNotification = await Notification.create({
      sender: session.user._id,
      receiver: receiverId,
      project: projectId,
      type: "invite",
    });
    return NextResponse.json({ success: true, notification: newNotification });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}



export async function GET(req:NextRequest){
try {
      const session = (await getServerSession(
      authOptions
    )) as CustomSession | null;

    if (!session || !session.user || !session.user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const notifications = await Notification.find({ receiver: session.user._id })
      .sort({ createdAt: -1 })
      .populate("sender", "email")
      .populate("project", "name");

    return NextResponse.json({sucess:true,notifications})
} catch (error) {
      return NextResponse.json({ success: false, message: error });
}
}