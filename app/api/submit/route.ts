import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  // In production: validate, rate-limit, store securely (S3/DB), send email.
  console.log("New submission:", body);
  return NextResponse.json({ ok: true });
}
