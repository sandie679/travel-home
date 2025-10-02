import { NextResponse } from "next/server";
import connect from "@/db";
import feature from "@/models/feature";

export const GET = async () => {
  try {
    await connect();
    const features = await feature.find({});
    return new NextResponse(JSON.stringify(features), { status: 200 });
  } catch (err) {
    console.error("Database Error:", err);
    return new NextResponse("Database Error", { status: 500 });
  }
};
