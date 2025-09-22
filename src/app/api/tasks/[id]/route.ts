import { connectToDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/Task";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const { status } = await req.json();

    const updatedTask = await Task.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    ).populate("assignedTo", "email");

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, task: updatedTask });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest, context: any) {
    const id = context.params.id;

  try {
    await connectToDB();

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Task deleted" });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}