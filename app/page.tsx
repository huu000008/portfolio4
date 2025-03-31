import { fetchAndStoreDatabase, getCachedData } from '@/lib/notion';
import styles from './page.module.scss';
import Project from '@/components/sections/Project';
import { MainVisual } from '@/components/sections/MainVisual';
import { AboutMe } from '@/components/sections/AboutMe';

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
    <main className={styles.main}>
      <MainVisual />
      <AboutMe />
      <Project notionPages={notionPages} pageRecordMaps={pageRecordMaps} />
    </main>
  );
}
