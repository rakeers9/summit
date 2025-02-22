import { connectToDatabase } from "@/lib/mongodb";
import Folder from "@/lib/models/Folder";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const folders = await Folder.find();
  return NextResponse.json(folders);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const newFolder = new Folder(body);
  await newFolder.save();
  return NextResponse.json(newFolder, { status: 201 });
}
