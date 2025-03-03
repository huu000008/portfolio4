"use client";

import { useEffect, useState } from "react";
import { fetchPageData } from "@/lib/notion";
import { NotionRenderer } from "react-notion-x";

interface ModalProps {
  pageId: string;
  onClose: () => void;
}

export default function PortfolioModal({ pageId, onClose }: ModalProps) {
  const [recordMap, setRecordMap] = useState<any>(null);

  useEffect(() => {
    async function loadPageData() {
      const data = await fetchPageData(pageId);
      setRecordMap(data);
    }
    if (pageId) {
      loadPageData();
    }
  }, [pageId]);

  return (
    <div>
      {recordMap ? (
        <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={true} />
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
}
