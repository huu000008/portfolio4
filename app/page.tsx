import { getDatabase } from "@/lib/notion";
import styles from "./page.module.scss";
import { PortfolioList } from "@/components/sections/PortfolioList";

export default async function Page() {
  const posts = await getDatabase();

  return (
    <div className={styles.wrap}>
      <main className={styles.main}>
        <section>
          <h2>WORKS</h2>
          <PortfolioList posts={posts} />
        </section>
      </main>
    </div>
  );
}
