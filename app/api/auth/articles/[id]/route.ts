import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import Article from "@/models/article";



export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  await connect();

  const userId = req.cookies.get("userId")?.value;
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, content, imageUrl } = await req.json();

  const { id } = await context.params;
  const article = await Article.findOneAndUpdate(
    { _id: id, authorId: userId },
    { title, content, imageUrl },
    { new: true }
  );

  if (!article) {
    return NextResponse.json({ message: "Article not found" }, { status: 404 });
  }

  return NextResponse.json(article);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  await connect();

  const userId = req.cookies.get("userId")?.value;
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const article = await Article.findOneAndDelete({
    _id: id,
    authorId: userId,
  });

  if (!article) {
    return NextResponse.json({ message: "Article not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Article deleted successfully" });
}
