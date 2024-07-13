import { NextResponse, NextRequest } from "next/server";
import { ensureSuperTokensInit } from "@/config/backend";

ensureSuperTokensInit();

export function GET(request: NextRequest) {
  const userId = request.headers.get("x-user-id");

  // The middleware only adds the userId if a session exists
  if (userId === null) {
    return new NextResponse("Authentication required", { status: 401 });
  }

  return NextResponse.json({
    userId,
  });
}
