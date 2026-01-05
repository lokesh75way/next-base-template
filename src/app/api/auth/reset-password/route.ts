import { NextRequest, NextResponse } from "next/server";
import { resetPassword } from "@/service/auth";

export async function PATCH(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: "Token and password are required" },
        { status: 400 }
      );
    }

    const data = await resetPassword({ token, password });

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Reset password failed" },
      { status: 400 }
    );
  }
}
