import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    console.log("API route /api/register called");
    const body = await req.json();
    console.log("Request body:", body);
    
    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { firstname, lastname, username, email, password, phone} = body;

    if (!username || !password || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("checking username");
    // check if username exists
    const userCheck = await prisma.users.findUnique({
        where: { username: username },
    });

    if (userCheck) {
        return NextResponse.json({ error: "Username already taken" }, { status: 404 });
    }
    console.log("checked username");

    console.log("checking email");
    // check if email is already taken
    const userEmail = await prisma.users.findUnique({
        where: { email: email },
    });

    if (userEmail) {
        return NextResponse.json({ error: "There is already an account using this email. Please sign in." }, { status: 404 });
    }
    console.log("checked email");

    console.log("Creating user with data:", { firstname, lastname, username, email, password_hash: password, phone });
    // add user
    const user = await prisma.users.create({
        data: { username, email, password_hash: password, first_name: firstname, last_name: lastname, phone_number: phone },
    });
    console.log("added user");

    return NextResponse.json({ message: "Submission successful!", user }, { status: 200 });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to register." }, { status: 500 });
  }
}
