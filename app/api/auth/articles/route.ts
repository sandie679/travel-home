import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import Article from "@/models/article";

export async function POST(req: NextRequest) {
  await connect();

  const userId = req.cookies.get("userId")?.value;
  if (!userId) {
    return NextResponse.json({ message: "Sign in first" }, { status: 401 });
  }

  const { title, content, imageUrl } = await req.json();
  if (!title || !content) {
    return NextResponse.json(
      { message: "Title and content required" },
      { status: 400 }
    );
  }

  const article = await Article.create({
    title,
    content,
    imageUrl,
    author: userId,
  });
  return NextResponse.json(article);
}

export async function GET(req: NextRequest) {
  await connect();

  const userId = req.nextUrl.searchParams.get("userId");
  let articles;
  if (userId) {
    articles = await Article.find({ author: userId }).sort({ createdAt: -1 });
  } else {
    articles = await Article.find().sort({ createdAt: -1 });
  }

  return NextResponse.json(articles);
}
