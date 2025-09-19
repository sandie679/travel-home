import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connect from "@/db";
import Post from "@/models/post";

export const GET = async () => {
  try {
    await connect();
    const posts = await Post.find({}).populate("author", "email");
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    await connect();

    const token = req.headers.get("cookie")?.split("token=")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const { title, content } = await req.json();
    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content required" },
        { status: 400 }
      );
    }

    const newPost = new Post({
      title,
      content,
      author: (decoded as any).userId,
    });

    await newPost.save();

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return new NextResponse("Error creating post", { status: 500 });
  }
};
