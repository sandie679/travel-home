import { NextRequest, NextResponse } from "next/server";
import connect from "@/db";
import Article from "@/models/article";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    await connect();
    const { id } = await params;

    const article = await Article.findById(id)
      .populate("author", "fullName email")
      .populate("comments.user", "fullName email");

    if (!article) return NextResponse.json({ error: "Article not found" }, { status: 404 });

    const result = {
      ...article.toObject(),
      likes: article.likes?.length || 0,
      dislikes: article.dislike?.length || 0,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
};
