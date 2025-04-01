import { fetchAndStoreDatabase, getCachedData } from '@/lib/notion';
import styles from './page.module.scss';
import Project from '@/components/sections/Project';
import { MainVisual } from '@/components/sections/MainVisual';
import { AboutMe } from '@/components/sections/AboutMe';
import ScrollSpy from '@/components/ScrollSpy';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
    <main className={styles.wrap}>
      <MainVisual />
      <ScrollSpy />
      <div className={styles.container}>
        <div className={styles.navigation}>
          <a href="#about" data-section="about">
            About Me
          </a>
          <a href="#project" data-section="project">
            Project
          </a>
        </div>
        <AboutMe />
        <Project notionPages={notionPages} pageRecordMaps={pageRecordMaps} />
      </div>
    </main>
  );
}
