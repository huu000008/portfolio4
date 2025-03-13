'use client';

import { useNotionStore } from '@/lib/state';
import styles from './PortfolioList.module.scss';
import Render from '../notion/Render';
import {
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog/DialogCore';

const PortfolioList: React.FC = () => {
  const { selectedPageId, setSelectedPageId, recordMaps, notionPages } =
    useNotionStore();

  return (
    <div>
      <DialogRoot>
        <ul className={styles.list}>
          {notionPages.map(({ id, title, summary }) => (
            <DialogTrigger asChild key={id}>
              <li key={id} onClick={() => setSelectedPageId(id)}>
                <strong>{title}</strong>
                <p>
                  {summary && summary !== '개요를 불러올 수 없습니다.'
                    ? summary
                    : '📡 개요 로딩 중...'}
                </p>
              </li>
            </DialogTrigger>
          ))}
        </ul>
        <DialogContent>
          <DialogTitle className="sr-only">Dialog Title</DialogTitle>
          <DialogDescription className="sr-only">
            Dialog Description
          </DialogDescription>
          {selectedPageId && recordMaps[selectedPageId] ? (
            <Render
              recordMap={recordMaps[selectedPageId]}
              rootPageId={selectedPageId}
            />
          ) : (
            <p>📡 로딩 중...</p>
          )}
        </DialogContent>
      </DialogRoot>
    </div>
  );
};

export default PortfolioList;
