import { PortfolioList } from "@/components/sections/portfolioList/portfolioList";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PortfolioList />
      </main>
    </div>
  );
}
