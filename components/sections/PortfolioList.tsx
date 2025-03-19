'use client';

import { useState } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogPortal,
} from '../ui/dialog/DialogCore';
import styles from './PortfolioList.module.scss';
import { Collection } from 'react-notion-x/build/third-party/collection';
import { NotionRenderer } from 'react-notion-x';
import { ExtendedRecordMap } from 'notion-types';

interface NotionPage {
  id: string;
  title: string;
  summary: string;
  technology?: string[];
}

interface PortfolioListProps {
  notionPages: NotionPage[];
  pageRecordMaps: { id: string; recordMap: ExtendedRecordMap }[];
}

const PortfolioList = ({ notionPages, pageRecordMaps }: PortfolioListProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const isOpen = selectedId !== null;

  const openModal = (id: string) => {
    setSelectedId(id);
  };

  const closeModal = () => {
    setSelectedId(null);
  };

  const selectedItem = notionPages.find((item) => item.id === selectedId);

  const selectedRecordMap = pageRecordMaps.find(
    (item) => item.id === selectedId
  )?.recordMap;

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
                {technology?.map((tech) => (
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
          <DialogContent>
            {selectedItem && (
              <>
                <DialogTitle className="sr-only">
                  {selectedItem.title}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  {selectedItem.summary}
                </DialogDescription>
              </>
            )}
            {selectedId && selectedRecordMap && (
              <NotionRenderer
                recordMap={selectedRecordMap}
                fullPage={true}
                darkMode={true}
                rootPageId={selectedId}
                previewImages
                components={{ Collection }}
                className={styles.notionWrap}
              />
            )}
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </section>
  );
};

export default PortfolioList;
