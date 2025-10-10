import { NextResponse } from "next/server";
import connect from "@/db";
import Article from "@/models/article";

export const GET = async () => {
  try {
    await connect();
    const posts = await Article.find({}).populate("author", "fullName email");
    return NextResponse.json(posts);
  } catch (err) {
    console.error(err);
    return NextResponse.json([], { status: 500 });
  }
};
