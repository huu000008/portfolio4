"use client";

import { NotionPost } from "@/types/notion";
import { useState } from "react";
import { ExtendedRecordMap } from "notion-types";
import styles from "./PortfolioList.module.scss";
import Render from "../notion/Render";
import { Dialog } from "../ui/dialog/Dialog";

interface PostListProps {
  posts: NotionPost[];
}

export const PortfolioList: React.FC<PostListProps> = ({ posts }) => {
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
  const [pageId, setPageId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const handleClick = async (id: string) => {
    setLoading(true);
    setPageId(id);
    try {
      const res = await fetch(`/api/notion?pageId=${id}`);
      const data = await res.json();
      console.log("data", data);
      setRecordMap(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setRecordMap(null);
    setPageId("");
  };

  return (
    <div>
      <ul className={styles.list}>
        {posts.map((page) => (
          <li key={page.id} onClick={() => handleClick(page.id)}>
            {page.properties.title.title[0].plain_text}
          </li>
        ))}
      </ul>

      <Dialog open={!!recordMap} onOpenChange={handleClose}>
        {loading && <div className={styles.loading}>Loading...</div>}
        {recordMap && !loading && (
          <Render recordMap={recordMap} rootPageId={pageId} />
        )}
      </Dialog>
    </div>
  );
};

export default PortfolioList;
