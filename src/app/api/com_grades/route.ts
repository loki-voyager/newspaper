import db from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  try {
    const body = await req.json();
    const com = await db.query(
      `SELECT likes,dislikes FROM comments WHERE id = ${body.id};`
    );
    if (com.rowCount) {
      return NextResponse.json(com.rows[0]);
    }
    return NextResponse.json(false);  } catch (error) {
    throw new Error(`${error}`);
  }
}