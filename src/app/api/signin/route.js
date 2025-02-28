import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';


const prisma = new PrismaClient();

export async function POST(req) {
  try {
    console.log("API route /api/signin called");
    const body = await req.json();
    console.log("Request body:", body);
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    
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
  
    return NextResponse.json({ message: "Sign in successful!", user }, { status: 200 });
  
  } catch (error) {
    console.error("Error signing in:", error);
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 });
  }
}
