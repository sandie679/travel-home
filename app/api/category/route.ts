import { NextResponse } from "next/server";
import connect from "@/db";
import category from "@/models/category";

export const GET = async () => {
  try {
    await connect();
    const categorys = await category.find({});
    return new NextResponse(JSON.stringify(categorys), { status: 200 });
  } catch (err) {
    console.error("Database Error:", err); 
    return new NextResponse("Database Error", { status: 500 });
  }
};
