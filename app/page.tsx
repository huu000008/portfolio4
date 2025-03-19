import { fetchAndStoreDatabase, getCachedData } from '@/lib/notion';
import styles from './page.module.scss';
import PortfolioList from '@/components/sections/PortfolioList';

export default async function Page() {
  const notionPages = await fetchAndStoreDatabase();
  const pageRecordMaps = await Promise.all(
    notionPages.map(async (page) => {
      const recordMap = await getCachedData(page.id);
      return {
        id: page.id,
        recordMap,
      };
    })
  );
  return (
    <div className={styles.wrap}>
      <main className={styles.main}>
        <PortfolioList
          notionPages={notionPages}
          pageRecordMaps={pageRecordMaps}
        />
      </main>
    </div>
  );
}
