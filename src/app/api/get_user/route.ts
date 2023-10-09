import db from "@/server/db";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
  try {
    const body = await req.json();
    const users = await db.query(
      `SELECT * FROM users WHERE username = '${body.username}';`
    );
    if(users.rowCount)return NextResponse.json(users.rows[0]);
    throw new Error(`User ${body.username} doesn't exist`);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
