import { NextResponse } from "next/server";
import connect from "@/db";
import zaira from "@/models/zaira";

export const GET = async () => {
  try {
    await connect();
    const zairas = await zaira.find({});
    return new NextResponse(JSON.stringify(zairas), { status: 200 });
  } catch (err) {
    console.error("Database Error:", err);
    return new NextResponse("Database Error", { status: 500 });
  }
};
