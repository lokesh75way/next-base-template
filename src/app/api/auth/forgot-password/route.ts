import { forgotPassword } from "@/service/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await forgotPassword(body);

    return NextResponse.json(data, { status: 201 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Forgot Password Failed";

    return NextResponse.json({ message }, { status: 400 });
  }
}
