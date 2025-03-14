'use client';

import styles from './PortfolioList.module.scss';

interface NotionPage {
  id: string;
  title: string;
  summary: string;
}

interface PortfolioListProps {
  notionPages: NotionPage[];
}

const PortfolioList = ({ notionPages }: PortfolioListProps) => {
  return (
    <div>
      <ul className={styles.list}>
        {notionPages.map(({ id, title, summary }) => (
          <li key={id} className={styles.item}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.summary}>{summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioList;
