'use client';

import dynamic from 'next/dynamic';
import { NotionRenderer } from 'react-notion-x';
import { Suspense } from 'react';
import './Render.module.scss';

interface RenderProps {
  recordMap: any;
  rootPageId: string;
}

const Collection = dynamic(
  () =>
    import('react-notion-x/build/third-party/collection').then(
      (m) => m.Collection
    ),
  { ssr: false } // SSR을 비활성화 해야 함
);

export const Render = ({ recordMap, rootPageId }: RenderProps) => {
  return (
    <div className="notion__container">
      <Suspense fallback={<div>Loading...</div>}>
        <NotionRenderer
          recordMap={recordMap}
          fullPage={true}
          darkMode={true}
          rootPageId={rootPageId}
          previewImages
          components={{ Collection }}
        />
      </Suspense>
    </div>
  );
};

export default Render;
