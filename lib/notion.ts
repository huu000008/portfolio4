import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';
import { useNotionStore } from '@/lib/state';
import { getPageSummary } from './utils';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const notion = new NotionAPI();

export async function getData(rootPageId: string) {
  try {
    // console.log(`📡 Notion 페이지 데이터 가져오기: ${rootPageId}`);
    const data = await notion.getPage(rootPageId);
    return data;
  } catch (error) {
    console.error(`❌ Notion 데이터 가져오기 실패 (${rootPageId}):`, error);
    throw error;
  }
}

const cache = new Map<string, any>();

export async function getCachedData(rootPageId: string) {
  if (cache.has(rootPageId)) {
    return cache.get(rootPageId);
  }

  const data = await getData(rootPageId);
  cache.set(rootPageId, data);
  return data;
}

export const notionDatabase = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function getDatabase(): Promise<any[]> {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId)
    throw new Error('❌ `NOTION_DATABASE_ID`가 설정되지 않았습니다.');

  try {
    const response = await notionDatabase.databases.query({
      database_id: databaseId,
      sorts: [{ property: 'due_date', direction: 'descending' }],
    });

    const { setRecordMaps, setNotionPages } = useNotionStore.getState();

    const notionPages = response.results
      .filter((page): page is PageObjectResponse => 'properties' in page) // ✅ 타입 체크 추가
      .map((page) => {
        setRecordMaps(page.id, page);

        // ✅ 안전한 타입 검사
        const titleProperty = page.properties?.title;
        const title =
          titleProperty?.type === 'title' && titleProperty.title.length > 0
            ? titleProperty.title[0].plain_text
            : '제목 없음';

        return {
          id: page.id,
          title,
          summary: getPageSummary(page),
        };
      });

    console.log('📌 저장된 Notion 페이지 배열:', notionPages);
    setNotionPages(notionPages);

    return response.results;
  } catch (error) {
    console.error('❌ Notion 데이터베이스 요청 실패:', error);
    throw error;
  }
}
