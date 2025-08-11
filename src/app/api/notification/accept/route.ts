import { authOptions } from "@/lib/authOptions";
import { connectToDB } from "@/lib/mongoose";
import Notification from "@/models/Notification";
import Project from "@/models/Project";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  interface CustomSession {
    user: {
      _id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }
  try {
    await connectToDB();
    const session = (await getServerSession(
      authOptions
    )) as CustomSession | null;

    if (!session || !session.user || !session.user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { notificationId } = await req.json();
    const notification = await Notification.findById(notificationId).populate(
      "project"
    );

    if (!notification) {
      return NextResponse.json(
        { message: "Notification not found" },
        { status: 404 }
      );
    }

    const project = await Project.findById(notification.project._id);
    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    const isAlreadyMember = project.members.some(
      (memebrId: import("mongoose").Types.ObjectId | string) => memebrId.toString() === session.user._id.toString()
    );

    if (isAlreadyMember) {
      notification.isRead = true;
      await notification.save();

      return NextResponse.json({
        success: false,
        message: "Already a member",
      });
    } else {
      project.members.push(session.user._id);
      await project.save();

      notification.isRead = true;
      await notification.save();

      return NextResponse.json({
        success: true,
        message: "successfully Added to Project",
      });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
