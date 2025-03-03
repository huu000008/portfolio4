"use client";

import { NotionPost } from "@/types/notion";
import { useEffect, useState } from "react";
import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import styles from "./PortfolioList.module.scss";
import Render from "../notion/Render";

type PostListProps = {
  posts: NotionPost[];
};

export const PortfolioList: React.FC<PostListProps> = ({ posts }) => {
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
  const [pageId, setPageId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = (pageId: string) => {
    setPageId(pageId);
  };

  useEffect(() => {
    async function loadPageData() {
      setLoading(true);
      try {
        const response = await fetch(`/api/getData?pageId=${pageId}`);
        const data = await response.json();
        setRecordMap(data);
      } catch (error) {
        console.error("Error loading page data:", error);
      } finally {
        setLoading(false);
      }
    }
    if (pageId) {
      loadPageData();
    }
  }, [pageId]);

  return (
    <div>
      <ul className={styles.list}>
        {posts.map((page) => (
          <li key={page.id} onClick={() => handleClick(page.id)}>
            {page.properties.title.title[0].plain_text}
          </li>
        ))}
      </ul>
      {loading && <div className={styles.loading}>Loading...</div>}
      {recordMap && !loading && (
        <Render recordMap={recordMap} rootPageId={pageId} />
      )}
    </div>
  );
};
