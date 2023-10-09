import db from "@/server/db";
import { check_users } from "@/service/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const checkUsername = await check_users(body.username, body.password);
    if (checkUsername.status === 200 && checkUsername.data) {
      throw new Error(`User already exist`);
    }
    console.log(body);
    const createUser =
      await db.query(`INSERT INTO users (username, password, first_name, last_name, email)
    VALUES ('${body.username}', '${body.password}', '${body.first_name}', '${body.last_name}', '${body.email}@');`);
    if (createUser.rowCount) return NextResponse.json(true);
    return false;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
