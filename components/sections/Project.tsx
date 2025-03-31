'use client';

import { useState } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogPortal,
} from '../ui/dialog/DialogCore';
import styles from './Project.module.scss';
import { Collection } from 'react-notion-x/build/third-party/collection';
import { NotionRenderer } from 'react-notion-x';
import { ExtendedRecordMap } from 'notion-types';
import Animation from '../Animation';
import { SectionTitle } from './SectionTitle';
import TruncatedTags from './TruncatedTags';

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
    <section className={styles.wrap}>
      <SectionTitle>Project</SectionTitle>
      <div className={styles.inner}>
        <ul className={styles.list}>
          {notionPages.map(({ id, title, summary, technology }) => (
            <Animation key={id} as="li" className={styles.item}>
              <button onClick={() => openModal(id)}>
                <strong className={styles.title}>{title}</strong>
                <p className={styles.summary}>{summary}</p>
                <TruncatedTags technology={technology} />
              </button>
            </Animation>
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
      </div>
    </section>
  );
};

export default PortfolioList;
