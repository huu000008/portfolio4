import { NextRequest } from "next/server";
import { getData } from "@/lib/notion";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pageId = searchParams.get("pageId");

  if (!pageId) {
    return Response.json(
      { error: "pageId가 제공되지 않았습니다." },
      { status: 400 }
    );
  }

  try {
    const recordMap = await getData(pageId);
    return Response.json(recordMap);
  } catch (error) {
    console.error("Error fetching notion data:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
