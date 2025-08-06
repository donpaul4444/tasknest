import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, name } = await req.json();

  try {
    const user = await prisma.user.create({
      data: { email, name },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "User creation failed" },
      { status: 500 }
    );
  }
}
