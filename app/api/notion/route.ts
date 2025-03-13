import { NextRequest, NextResponse } from 'next/server';
import { getData } from '@/lib/notion';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pageId = searchParams.get('pageId');

  if (!pageId) {
    return new NextResponse(
      JSON.stringify({ error: '❌ pageId가 제공되지 않았습니다.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const recordMap: any = await getData(pageId);
    return new NextResponse(JSON.stringify(recordMap), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error: unknown) {
    console.error(`❌ Notion 데이터 가져오기 실패 (pageId: ${pageId}):`, error);
    const errorMessage =
      error instanceof Error ? error.message : '알 수 없는 오류 발생';
    return new NextResponse(
      JSON.stringify({
        error: '🚨 Internal server error',
        details: errorMessage,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
