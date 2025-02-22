import { connectToDatabase } from "@/lib/mongodb";
import Company from "@/lib/models/Company";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const companies = await Company.find();
  return NextResponse.json(companies);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const newCompany = new Company(body);
  await newCompany.save();
  return NextResponse.json(newCompany, { status: 201 });
}
