import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongoose";
import Notification from "@/models/Notification";
import Project from "@/models/Project";
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

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions) as CustomSession | null;

    if (!session || !session.user?._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { notificationId, action } = await req.json();
    const notification = await Notification.findById(notificationId).populate("project sender");
    if (!notification) {
      return NextResponse.json({ message: "Notification not found" }, { status: 404 });
    }

    const project = await Project.findById(notification.project._id);
    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    if (action === "accept") {
      if (!project.members.includes(session.user._id)) {
        project.members.push(session.user._id);
        await project.save();
      }
      await Notification.create({
        receiver: notification.sender, 
        sender: session.user._id,
        type: "accept",
        project: project._id
      });
    }

    if (action === "decline") {
      await Notification.create({
        receiver: notification.sender,
        sender: session.user._id,
        type: "decline",
        project: project._id
      });
    }

    notification.isRead = true;
    await notification.save();

    return NextResponse.json({
      success: true,
      message: `Invitation ${action}ed successfully`,
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}