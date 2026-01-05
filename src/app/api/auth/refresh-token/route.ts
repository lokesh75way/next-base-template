import { NextRequest, NextResponse } from "next/server";
import { refreshAccessToken } from "@/service/auth";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    console.log({authHeader})
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Refresh token is required" },
        { status: 400 }
      );
    }

    const refreshToken = authHeader.split(" ")[1];

    const data = await refreshAccessToken(refreshToken);

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Refresh token failed",
      },
      { status: 401 }
    );
  }
}
