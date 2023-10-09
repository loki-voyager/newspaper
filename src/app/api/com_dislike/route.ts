import { NextRequest, NextResponse } from "next/server";
import { check_com_dislike, check_com_like, dislike_com,  undislike_com, unlike_com } from "../service/com_grades";

export async function POST(req:NextRequest) {
  try {
   const body = await req.json()
   const com_id = body.com_id
   const username = body.username;

   const like_check = await check_com_like(com_id,username)
   const dislike_check = await check_com_dislike(com_id,username)

   if(!dislike_check){
    if(like_check){
      await unlike_com(com_id, username)
    }
    const dislike = await dislike_com(com_id,username)
    if(dislike) return NextResponse.json(true)
   }
   await undislike_com(com_id,username)
   return NextResponse.json(false)

  } catch (error) {
    throw new Error(`${error}`);
  }
}