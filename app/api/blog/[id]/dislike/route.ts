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

  article.dislike = Array.isArray(article.dislike) ? article.dislike : [];
  article.likes = Array.isArray(article.likes) ? article.likes : [];

  const alreadyDisliked = article.dislike.some((uid: Types.ObjectId) => uid.toString() === userId);

  if (alreadyDisliked) {
    article.dislike = article.dislike.filter((uid: Types.ObjectId) => uid.toString() !== userId);
  } else {
    article.dislike.push(userId);
    article.likes = article.likes.filter((uid: Types.ObjectId) => uid.toString() !== userId);
  }

  await article.save();

  return NextResponse.json({
    dislikesCount: article.dislike.length,
    likesCount: article.likes.length,
  });
}
