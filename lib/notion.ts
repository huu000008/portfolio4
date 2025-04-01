import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';
import { ExtendedRecordMap } from 'notion-types';
import { getPageSummary, getPageTechnology } from './utils';

// 타입 정의
interface NotionPage {
  id: string;
  title: string;
  summary: string;
  technology?: string[];
}

// 노션 API 클라이언트 초기화
export const notion = new NotionAPI();

// 캐시 타입 정의 개선
const cache = new Map<string, ExtendedRecordMap>();

/**
 * 노션 페이지 데이터 가져오기
 */
export async function getData(pageId: string): Promise<ExtendedRecordMap> {
  try {
    const data = await notion.getPage(pageId);
    return data;
  } catch (error) {
    console.error(`❌ Notion 데이터 가져오기 실패 (${pageId}):`, error);
    throw new Error(
      `노션 페이지 데이터 가져오기 실패: ${(error as Error).message}`
    );
  }
}

/**
 * 캐시된 노션 페이지 데이터 가져오기
 */
export async function getCachedData(
  pageId: string
): Promise<ExtendedRecordMap> {
  if (cache.has(pageId)) {
    return cache.get(pageId)!;
  }

  const data = await getData(pageId);
  cache.set(pageId, data);
  return data;
}

// 환경 변수 검증
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_API_KEY) {
  throw new Error('❌ `NOTION_API_KEY`가 설정되지 않았습니다.');
}

// 노션 데이터베이스 클라이언트 초기화
export const notionDatabase = new Client({
  auth: NOTION_API_KEY,
});

/**
 * 노션 데이터베이스에서 데이터 가져와 저장하기
 */
export async function fetchAndStoreDatabase(): Promise<NotionPage[]> {
  if (!NOTION_DATABASE_ID) {
    throw new Error('❌ `NOTION_DATABASE_ID`가 설정되지 않았습니다.');
  }

  try {
    const response = await notionDatabase.databases.query({
      database_id: NOTION_DATABASE_ID,
      sorts: [{ property: 'due_date', direction: 'descending' }],
    });

    // 페이지 데이터 처리
    const processedPages = await Promise.all(
      response.results.map(async (page: any) => {
        const recordMap = await getCachedData(page.id);

        // 타이틀 안전하게 추출
        const title =
          page.properties?.title?.title?.[0]?.plain_text || '제목 없음';
        const endDate = page.properties?.due_date?.date?.end;
        return {
          id: page.id,
          title,
          summary: getPageSummary(recordMap),
          technology: getPageTechnology(recordMap),
          endDate,
        };
      })
    );

    return processedPages;
  } catch (error) {
    console.error('❌ Notion 데이터베이스 요청 실패:', error);
    throw new Error(`노션 데이터베이스 요청 실패: ${(error as Error).message}`);
  }
}
