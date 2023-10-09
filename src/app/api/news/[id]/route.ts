import db from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const news = await db.query(`SELECT * FROM news WHERE id = '${id}';`);
    if (!news.rowCount) throw new Error(`News ${id} doesn't exist`);
    return NextResponse.json(news.rows[0]);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const id = params.id;
    const updateNews =
      await db.query(`UPDATE news SET username = '${body.username}',
      title = '${body.title}',
      body = '${body.body}'
      WHERE id = ${id}`);
    if (updateNews.rowCount) return NextResponse.json(true);
    return NextResponse.json(false);
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const deleted = await db.query(`DELETE FROM news WHERE id = ${id};`);
    return NextResponse.json(deleted.rowCount);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
