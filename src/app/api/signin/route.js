import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
//import {cookies} from 'next/headers';
//import crypto from 'crypto';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    console.log("API route /api/signin called");
    const body = await req.json();
    console.log("Request body:", body);
    
    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // check username
    const user = await prisma.users.findUnique({
        where: { username: username },
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // check password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    /*else {  // create user associated session
      const sessionId = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 24*60*60*1000);   //24 hours

      await prisma.sessions.create({
        data: {
          session_id: sessionId,
          user_id: user.user_id,
          expires_at: expiresAt,
        }
      });

      (await cookies()).set('sessionID', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV==='production',
        sameSite:'strict',
        path: '/',
      });
    }*/
  
    return NextResponse.json({ message: "Sign in successful!", user }, { status: 200 });
  
  } catch (error) {
    console.error("Error signing in:", error);
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 });
  }
}
