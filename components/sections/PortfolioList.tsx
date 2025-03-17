'use client';

import styles from './PortfolioList.module.scss';

interface NotionPage {
  id: string;
  title: string;
  summary: string;
  technology: string[];
}

interface PortfolioListProps {
  notionPages: NotionPage[];
}

const PortfolioList = ({ notionPages }: PortfolioListProps) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>WORKS</h2>
      <ul className={styles.list}>
        {notionPages.map(({ id, title, summary, technology }) => (
          <li key={id} className={styles.item}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.tag}>
              {technology.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <p className={styles.summary}>{summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PortfolioList;
