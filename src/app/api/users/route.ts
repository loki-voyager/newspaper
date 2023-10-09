import db from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const users = await db.query("SELECT * FROM users");
    return NextResponse.json(users.rows);
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const checkMail = await db.query(
      `SELECT * FROM users WHERE email = '${body.data}' AND password = '${body.password}';`
    );
    if (checkMail.rowCount) return NextResponse.json(checkMail.rows[0]);
    const checkUsername = await db.query(
      `SELECT * FROM users WHERE username = '${body.data}' AND password = '${body.password}';`
    );
    if (checkUsername.rowCount) return NextResponse.json(checkUsername.rows[0]);
    throw new Error(`User doesn't exist`);
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const deleteUser = await db.query(
      `DELETE FROM users WHERE username = '${body.username}';`
    );
    return NextResponse.json(deleteUser.rowCount);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
