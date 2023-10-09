import db from "@/server/db";
import { getUserByUsername } from "@/service/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await getUserByUsername(body.username);
    if (!user.data.com_likes.length) return NextResponse.json(false);
    const like = await db.query(`SELECT * FROM comments WHERE id IN (${user.data.com_likes});`);
    if(!like.rowCount) throw new Error(`Error while searching for liked comments`);
    return NextResponse.json(like.rows);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
