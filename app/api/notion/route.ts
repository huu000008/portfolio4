import { NextResponse } from 'next/server';
import { fetchAndStoreDatabase } from '@/lib/notion';

export async function GET() {
  try {
    const pages = await fetchAndStoreDatabase();
    return NextResponse.json(pages);
  } catch (error) {
    console.error('노션 데이터 가져오기 실패:', error);
    return NextResponse.json({ error: '서버 내부 오류' }, { status: 500 });
  }
}
