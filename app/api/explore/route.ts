import { NextResponse } from "next/server";
import connect from "@/db";
import explore from "@/models/explore";

export const GET = async (request: Request) => {
    try {
    await connect();
    const explores = await explore.find({});
   return new NextResponse(JSON.stringify(explores), { status: 200 });

}
catch (error) {
    return new NextResponse("Database Error", { status: 500 });

}

}

