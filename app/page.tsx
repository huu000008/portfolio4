// import { fetchAndStoreDatabase, getCachedData } from '@/lib/notion';
// import Project from '@/components/sections/Project';
import { MainVisual } from '@/components/sections/MainVisual';
import { AboutMe } from '@/components/sections/AboutMe';
import ScrollSpy from '@/components/ScrollSpy';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default async function Page() {
  // const notionPages = await fetchAndStoreDatabase();
  // const pageRecordMaps = await Promise.all(
  //   notionPages.map(async (page) => {
  //     const recordMap = await getCachedData(page.id);
  //     return {
  //       id: page.id,
  //       recordMap,
  //     };
  //   })
  // );
  return (
    <main>
      <MainVisual />
      <ScrollSpy />
      <div>
        <AboutMe />
        {/* <Project notionPages={notionPages} pageRecordMaps={pageRecordMaps} /> */}
      </div>
    </main>
  );
}
