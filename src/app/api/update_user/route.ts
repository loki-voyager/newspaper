import db from "@/server/db";
import { auth } from "@/service/users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!(await auth(body.old_username, body.old_password))) {
      throw new Error(`User with username = ${body.old_username} doesn't exist`);
    }
    const updateUser = await db.query(
      `UPDATE users SET username = '${body.username}',
        password = '${body.password}',
        first_name = '${body.first_name}',
        last_name = '${body.last_name}',
        email = '${body.email}'
        WHERE username = '${body.old_username}';`
    );
    return NextResponse.json(updateUser);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
