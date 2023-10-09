import db from "@/server/db";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
  try {
    const body = await req.json();
    const users = await db.query(
      `SELECT * FROM comments WHERE parent_id = ${body.id};`
    );
    if(users.rowCount)return NextResponse.json(users.rows);
    throw new Error(`User ${body.username} doesn't exist`);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
