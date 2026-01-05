import { register } from "@/service/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await register(body);

    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Registration failed" },
      { status: 400 }
    );
  }
}
