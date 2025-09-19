import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import User from "@/models/user";

export async function GET(req: NextRequest) {
  await connect();

  const userId = req.cookies.get("userId")?.value;

  if (!userId) {
    return NextResponse.json({ message: "Not signed in" }, { status: 401 });
  }

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
