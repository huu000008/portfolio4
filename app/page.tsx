import { getDatabase } from '@/lib/notion';
import { getPageSummary } from '@/lib/utils';
import PortfolioList from '@/components/sections/PortfolioList';
import styles from './page.module.scss';

export const revalidate = 60; // ✅ ISR 적용 (60초마다 데이터 갱신)

const fetchAllData = async (posts: any[]) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const promises = posts.map(async (post) => {
    try {
      const res = await fetch(`${baseUrl}/api/notion?pageId=${post.id}`, {
        cache: 'no-store',
      });
      const data = await res.json();
      return { id: post.id, data };
    } catch (error) {
      console.error(`❌ 개요 불러오기 실패 (${post.id}):`, error);
      return { id: post.id, data: null };
    }
  });

  const results = await Promise.all(promises); // ✅ 병렬 처리 적용

  type DataResult = {
    summaries: Record<string, string>;
    recordMaps: Record<string, any>;
  };

  return results.reduce<DataResult>(
    (acc, { id, data }) => {
      acc.summaries[id] = getPageSummary(data) || '개요를 불러올 수 없습니다.';
      acc.recordMaps[id] = data;
      return acc;
    },
    { summaries: {}, recordMaps: {} }
  );
};

async function fetchNotionData() {
  console.log('🚀 SSG + ISR: Notion 데이터 가져오는 중...');

  const posts = await getDatabase();
  const { summaries, recordMaps } = await fetchAllData(posts); // ✅ 병렬 요청 적용

  return { posts, summaries, recordMaps };
}

export default async function Page() {
  const { posts } = await fetchNotionData();

  return (
    <div className={styles.wrap}>
      <main className={styles.main}>
        <PortfolioList posts={posts} />
      </main>
    </div>
  );
}
