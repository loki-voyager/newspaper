import { NextRequest, NextResponse } from "next/server";
import {
  check_dislike,
  check_like,
  like_news,
  undislike_news,
  unlike_news,
} from "../service/grades";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const news_id = body.news_id;
    const username = body.username;

    const like_check = await check_like(news_id, username);
    const dislike_check = await check_dislike(news_id, username);

    if (!like_check) {
      if (dislike_check) {
        await undislike_news(news_id, username);
      }
      const like = await like_news(news_id, username);
      if (like) return NextResponse.json(true);
    }
    await unlike_news(news_id, username);
    return NextResponse.json(false);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
