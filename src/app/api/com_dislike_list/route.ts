import db from "@/server/db";
import { getUserByUsername } from "@/service/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await getUserByUsername(body.username);
    if(!user.data.com_dislikes.length  ) return NextResponse.json(false);
    const dislike = await db.query(`SELECT * FROM comments WHERE id IN (${user.data.com_dislikes});`);
    if(!dislike.rowCount) throw new Error(`Error while searching for disliked comments`);
    return NextResponse.json(dislike.rows);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
