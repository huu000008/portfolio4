'use client';

import { useRef, useState } from 'react';
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
import { getRelativeTimeOrStatus } from '@/lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronRight } from '@/assets/icon/ChevronRight';
import { ChevronLeft } from '@/assets/icon/ChevronLeft';

interface NotionPage {
  id: string;
  title: string;
  summary: string;
  technology?: string[];
  endDate?: string;
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

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const updateNavigationState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };
  return (
    <section className={styles.wrap} id="project">
      <div className={styles.inner}>
        <h2>Works</h2>
        <div
          className={`
        ${styles.swiperContainer} 
        ${isBeginning ? styles.hideBefore : ''}
        ${isEnd ? styles.hideAfter : ''}
      `}
        >
          <button
            ref={prevRef}
            className={`${styles.navButton} ${styles.prevButton} ${
              isBeginning ? styles.hide : ''
            }`}
          >
            <ChevronLeft />
          </button>
          <button
            ref={nextRef}
            className={`${styles.navButton} ${styles.nextButton} ${
              isEnd ? styles.hide : ''
            }`}
          >
            <ChevronRight />
          </button>
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView="auto"
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
              (swiper.params.navigation as any).prevEl = prevRef.current;
              (swiper.params.navigation as any).nextEl = nextRef.current;
            }}
            onAfterInit={updateNavigationState}
            onSlideChange={updateNavigationState}
            onReachBeginning={() => setIsBeginning(true)}
            onReachEnd={() => setIsEnd(true)}
            className={styles.list}
          >
            {notionPages.map(({ id, title, summary, technology, endDate }) => (
              <SwiperSlide
                key={id}
                className={styles.item}
                onClick={() => openModal(id)}
              >
                <strong className={styles.title}>{title}</strong>
                <p className={styles.summary}>{summary}</p>
                <div className={styles.tags}>
                  {technology?.map((tech) => (
                    <span key={tech} className={styles.tag}>
                      #{tech}
                    </span>
                  ))}
                </div>
                <p className={styles.endDate}>
                  {getRelativeTimeOrStatus(endDate || '')}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

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
