import { NextResponse } from "next/server";
import connect from "@/db";
import explore from "@/models/explore";

export const GET = async () => {
  try {
    await connect();
    const explores = await explore.find({});
    return new NextResponse(JSON.stringify(explores), { status: 200 });
  } catch (err) {
    console.error("Database Error:", err); 
    return new NextResponse("Database Error", { status: 500 });
  }
};
