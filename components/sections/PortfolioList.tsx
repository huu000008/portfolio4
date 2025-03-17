'use client';

import { useState } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
} from '../ui/dialog/DialogCore';
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
  const [open, setOpen] = useState(false);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>WORKS</h2>
      <ul className={styles.list}>
        {notionPages.map(({ id, title, summary, technology }) => (
          <li key={id} className={styles.item}>
            <button onClick={() => setOpen(true)}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.summary}>{summary}</p>
              <div className={styles.tag}>
                {technology.map((tech) => (
                  <span key={tech}>#{tech}</span>
                ))}
              </div>
            </button>
            <DialogRoot open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogTitle>제목</DialogTitle>
                <DialogDescription>
                  모달 내용을 여기에 작성하세요.
                </DialogDescription>
              </DialogContent>
            </DialogRoot>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PortfolioList;
