import db from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const grades = await db.query(
      `SELECT likes, dislikes FROM users WHERE username = '${body.username}';`
    );
    return NextResponse.json(grades.rows[0]);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
