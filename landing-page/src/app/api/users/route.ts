import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const users = await User.find();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const newUser = new User(body);
  await newUser.save();
  return NextResponse.json(newUser, { status: 201 });
}
