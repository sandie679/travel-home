import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import Article from "@/models/article";

type Params = { id: string };

export async function PATCH(
  req: NextRequest,
  { params }: { params: Params }
): Promise<NextResponse> {
  await connect();

  const userId = req.cookies.get("userId")?.value;
  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { title, content, imageUrl } = await req.json();
  const article = await Article.findOneAndUpdate(
    { _id: params.id, authorId: userId },
    { title, content, imageUrl },
    { new: true }
  );

  if (!article)
    return NextResponse.json({ message: "Article not found" }, { status: 404 });

  return NextResponse.json(article);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Params }
): Promise<NextResponse> {
  await connect();

  const userId = req.cookies.get("userId")?.value;
  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const article = await Article.findOneAndDelete({
    _id: params.id,
    authorId: userId,
  });

  if (!article)
    return NextResponse.json({ message: "Article not found" }, { status: 404 });

  return NextResponse.json({ message: "Article deleted successfully" });
}
