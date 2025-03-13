import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useNotionStore } from '@/lib/state';

// ✅ Notion의 Collection 컴포넌트를 동적으로 가져옴
const NotionRenderer = dynamic(
  () => import('react-notion-x').then((m) => m.NotionRenderer),
  {
    ssr: false,
  }
);

const Collection = dynamic(
  () =>
    import('react-notion-x/build/third-party/collection').then(
      (m) => m.Collection
    ),
  {
    ssr: false,
  }
);

const Render = ({ rootPageId }: { rootPageId: string }) => {
  const { recordMaps } = useNotionStore();
  const recordMap = recordMaps[rootPageId]; // ✅ Zustand에서 recordMap 가져오기

  return (
    <div className="notion__container">
      <Suspense fallback={<div>📡 로딩 중...</div>}>
        {recordMap ? (
          <NotionRenderer
            recordMap={recordMap} // ✅ Zustand에서 가져온 데이터 사용
            fullPage={true}
            darkMode={true}
            rootPageId={rootPageId}
            components={{
              Collection, // ✅ Collection 컴포넌트 추가
            }}
          />
        ) : (
          <p>📡 데이터 로딩 중...</p>
        )}
      </Suspense>
    </div>
  );
};

export default Render;
