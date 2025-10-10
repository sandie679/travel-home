import { NextRequest, NextResponse } from "next/server";
import connect from "@/db";
import Article from "@/models/article";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connect();
  const { id } = await params;

  const userId = req.cookies.get("userId")?.value;
  if (!userId) return NextResponse.json({ error: "Sign in first" }, { status: 401 });

  const { text } = await req.json();
  if (!text || text.trim() === "") return NextResponse.json({ error: "Comment cannot be empty" }, { status: 400 });

  const article = await Article.findById(id);
  if (!article) return NextResponse.json({ error: "Article not found" }, { status: 404 });

  article.comments.push({ user: userId, text });
  await article.save();

  await article.populate("comments.user", "fullName email");

  return NextResponse.json({ comments: article.comments });
}
