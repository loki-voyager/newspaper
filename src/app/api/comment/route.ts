import db from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const news_id = body.news_id;
    const parent_id = body.parent_id;
    const username = body.username;
    const data = body.data;
    const comment = await db.query(
      `INSERT INTO comments (news_id, parent_id, username, body) VALUES (${news_id},${parent_id}, '${username}', '${data}');`
    );
    if (comment.rowCount) return NextResponse.json(true);
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const deleted = await db.query(
      `DELETE FROM comments WHERE id = ${body.id};`
    );
    return NextResponse.json(deleted.rowCount);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
