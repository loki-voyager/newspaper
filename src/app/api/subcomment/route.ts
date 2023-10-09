import db from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parent_id = body.parent_id;
    const username = body.username;
    const data = body.data;
    const comment = await db.query(
      `INSERT INTO comments (parent_id,  username, body) VALUES (${parent_id}, '${username}', '${data}');`
    );
    if (comment.rowCount) return NextResponse.json(true);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
