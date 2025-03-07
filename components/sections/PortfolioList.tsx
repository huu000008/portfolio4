"use client";


import { useState } from "react";
import { ExtendedRecordMap } from "notion-types";
import styles from "./PortfolioList.module.scss";
import Render from "../notion/Render";
import { DialogContent, DialogDescription, DialogRoot, DialogTitle, DialogTrigger } from "../ui/dialog/DialogCore";



export const PortfolioList: React.FC<any> = ({ posts }) => {
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
      <DialogRoot>
      <ul className={styles.list}>
        {posts.map((page:any) => (
      <DialogTrigger  asChild key={page.id}>
        <li key={page.id} onClick={() => handleClick(page.id)}>
            {page.properties.title.title[0].plain_text}
          </li></DialogTrigger>
          
          
        ))}
      </ul>
      <DialogContent>
        <DialogTitle className="sr-only">Dialog Title</DialogTitle>
        <DialogDescription className="sr-only">This is a simple dialog component.</DialogDescription>
        {recordMap && !loading && (
          <Render recordMap={recordMap} rootPageId={pageId} />
              )}
            </DialogContent>
      </DialogRoot>






      

      {/* <Dialog open={!!recordMap} onOpenChange={handleClose}>
        {loading && <div className={styles.loading}>Loading...</div>}
        {recordMap && !loading && (
          <Render recordMap={recordMap} rootPageId={pageId} />
        )}
      </Dialog> */}
    </div>
  );
};

export default PortfolioList;
