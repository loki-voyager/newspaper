import db from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const checkMail = await db.query(
      `SELECT * FROM users WHERE email = '${body.data}' AND password = '${body.password}';`
    );
    if (checkMail.rowCount) return NextResponse.json(checkMail.rows[0]);
    const checkUsername = await db.query(
      `SELECT * FROM users WHERE username = '${body.data}' AND password = '${body.password}';`
    );
    if (checkUsername.rowCount) return NextResponse.json(checkUsername.rows[0]);
    return NextResponse.json(false)
  } catch (error) {
    throw new Error(`${error}`);
  }
}
