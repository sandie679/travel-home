import { NextResponse } from "next/server";
import connect from "@/db";
import latest from "@/models/latest";

export const GET = async (request: Request) => {
  try {
    await connect();
    const latests = await latest.find({});
    return new NextResponse(JSON.stringify(latests), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
