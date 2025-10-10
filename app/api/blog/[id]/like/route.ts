import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import connect from "@/db";
import Article from "@/models/article";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connect();
  const { id } = await params;

  const userId = req.cookies.get("userId")?.value;
  if (!userId) return NextResponse.json({ error: "Sign in first" }, { status: 401 });

  const article = await Article.findById(id);
  if (!article) return NextResponse.json({ error: "Article not found" }, { status: 404 });

  article.likes = Array.isArray(article.likes) ? article.likes : [];
  article.dislike = Array.isArray(article.dislike) ? article.dislike : [];

  const alreadyLiked = article.likes.some((uid: Types.ObjectId) => uid.toString() === userId);

  if (alreadyLiked) {
    article.likes = article.likes.filter((uid: Types.ObjectId) => uid.toString() !== userId);
  } else {
    article.likes.push(userId);
    article.dislike = article.dislike.filter((uid: Types.ObjectId) => uid.toString() !== userId);
  }

  await article.save();

  return NextResponse.json({
    likesCount: article.likes.length,
    dislikesCount: article.dislike.length,
  });
}
