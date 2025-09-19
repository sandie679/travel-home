import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );

    const response = NextResponse.json({ message: "Signed in successfully" });
    response.cookies.set({
      name: "userId",
      value: user._id.toString(),
      path: "/",
      httpOnly: true,
      sameSite: "strict",
    });

    return response;
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
