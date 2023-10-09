import db from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const news = await await db.query(`SELECT * FROM news;`);
    if (!news.rowCount) throw new Error(`News doesn't exist`);
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    let currentNews = news.rows;

    if (query) {
      currentNews = news.filter((item: { title: string }) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    currentNews.sort((a:any, b:any) => a.id - b.id);
    return NextResponse.json(currentNews);
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const createNews = await db.query(
      `INSERT INTO news (title,body,username) VALUES ('${body.title}','${body.body}','${body.username}');`
    );
    if (createNews.rowCount) {
      return NextResponse.json(true);}
    return false;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
