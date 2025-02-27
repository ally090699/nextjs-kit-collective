import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    return NextResponse.json({ message: 'API route hit!' }, { status: 200 });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}