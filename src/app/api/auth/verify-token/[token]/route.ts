import { NextResponse } from "next/server";
import { verifyToken } from "@/service/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 400 }
      );
    }

    const data = await verifyToken({ token });

    return NextResponse.json(data, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Invalid or expired token";

    return NextResponse.json({ message }, { status: 400 });
  }
}
