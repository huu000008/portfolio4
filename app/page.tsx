import { fetchAndStoreDatabase } from '@/lib/notion';
import styles from './page.module.scss';
import PortfolioList from '@/components/sections/PortfolioList';

export default async function Page() {
  const notionPages = await fetchAndStoreDatabase();
  return (
    <div className={styles.wrap}>
      <main className={styles.main}>
        <PortfolioList notionPages={notionPages} />
      </main>
    </div>
  );
}
