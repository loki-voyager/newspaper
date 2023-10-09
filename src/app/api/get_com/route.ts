import db from "@/server/db";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
  try {
    const body = await req.json();
    const com = await db.query(
      `SELECT * FROM comments WHERE news_id = ${body.id};`
    );
    if (com.rowCount) {
      const sort_com = com.rows;

      sort_com.sort((a: any, b: any) => a.generation - b.generation);

      return NextResponse.json(sort_com);
    }
    return NextResponse.json(false);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
