import { connectToDatabase } from "@/lib/mongodb";
import Image from "@/lib/models/Image";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const images = await Image.find();
  return NextResponse.json(images);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const newImage = new Image(body);
  await newImage.save();
  return NextResponse.json(newImage, { status: 201 });
}
