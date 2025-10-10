import { NextResponse } from "next/server";
import connect from "@/db";
import Article from "@/models/article";
import "@/models/user"; 

export const GET = async () => {
  try {
    await connect();

    const blogs = await Article.find({})
      .select("title content imageUrl author createdAt likes dislikes")
      .populate("author", "fullName email");

    return NextResponse.json(blogs, { status: 200 });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return NextResponse.json({ error: "Failed to load blogs" }, { status: 500 });
  }
};
