import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const record = await prisma.keepAlive.create({ data: {} });
    await prisma.keepAlive.delete({ where: { id: record.id } });

    return NextResponse.json({ status: "ok", pingedAt: new Date().toISOString() });
  } catch (error) {
    console.error("Keep-alive failed:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}