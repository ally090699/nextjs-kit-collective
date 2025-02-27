import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    console.log("API route /api/contact called");
    const body = await req.json();
    console.log("Request body:", body);
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    
    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { name, phone, email, status, productID, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create submission in MySQL database
    const submission = await prisma.submissions.create({
      data: { name, phone, email, reason: status, productId: productID, message },
    });

    return NextResponse.json({ message: "Submission successful!", submission }, { status: 200 });
  
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
  }
}
