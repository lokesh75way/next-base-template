import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/service/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
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
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Invalid or expired token" },
      { status: 400 }
    );
  }
}
