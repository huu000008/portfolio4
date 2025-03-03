import dynamic from "next/dynamic";
import { NotionRenderer } from "react-notion-x";

interface RenderProps {
  recordMap: any;
  rootPageId: string;
}

export const Render = ({ recordMap, rootPageId }: RenderProps) => {
  const Collection = dynamic(() =>
    import("react-notion-x/build/third-party/collection").then(
      (m) => m.Collection
    )
  );

  return (
    <div className="notion__container">
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
        rootPageId={rootPageId}
        previewImages
        components={{ Collection }}
      />
    </div>
  );
};

export default Render;
