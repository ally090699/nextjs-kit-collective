import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function GET() {
  const sessionID = cookies().get('sessionID')?.value;

  if (!sessionID) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const session = await prisma.sessions.findUnique({
      where: { session_id: sessionID },
    });

    if (!session || session.expires_at < new Date()) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const user = await prisma.users.findUnique({
      where: { user_id: session.user_id },
    });

    if (!user) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, user: user }, { status: 200 });
  } catch (error) {
    console.error("Error validating session:", error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}