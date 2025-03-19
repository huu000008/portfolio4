'use client';

import { useRef, useState } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogPortal,
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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isOpen = selectedId !== null;

  const openModal = (id: string) => {
    setSelectedId(id);
  };

  const closeModal = () => {
    setSelectedId(null);
  };

  const selectedItem = notionPages.find((item) => item.id === selectedId);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>WORKS</h2>
      <ul className={styles.list}>
        {notionPages.map(({ id, title, summary, technology }) => (
          <li key={id} className={styles.item}>
            <button onClick={() => openModal(id)}>
              <strong className={styles.title}>{title}</strong>
              <p className={styles.summary}>{summary}</p>
              <div className={styles.tags}>
                {technology.map((tech) => (
                  <span key={tech} className={styles.tag}>
                    #{tech}
                  </span>
                ))}
              </div>
            </button>
          </li>
        ))}
      </ul>

      <DialogRoot open={isOpen} onOpenChange={closeModal}>
        <DialogPortal>
          <DialogContent ref={contentRef}>
            {selectedItem && (
              <>
                <DialogTitle>{selectedItem.title}</DialogTitle>
                <DialogDescription>{selectedItem.summary}</DialogDescription>
              </>
            )}
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </section>
  );
};

export default PortfolioList;
