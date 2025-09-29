import { NextResponse } from "next/server";
import connect from "@/db";
import news from "@/models/news";

export const GET = async () => {
  try {
    await connect();
    const newss = await news.find({});
    return new NextResponse(JSON.stringify(newss), { status: 200 });
  } catch (err) {
    console.error("Database Error:", err);
    return new NextResponse("Database Error", { status: 500 });
  }
};
