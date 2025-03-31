import { useEffect, useRef, useState } from 'react';
import styles from './Project.module.scss';

interface TruncatedTagsProps {
  technology?: string[];
}

const TruncatedTags = ({ technology }: TruncatedTagsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(technology?.length || 0);

  useEffect(() => {
    if (!containerRef.current || !technology?.length) return;

    const calculateVisibleTags = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const tagElements = Array.from(container.children) as HTMLElement[];

      let totalWidth = 0;
      let count = 0;

      for (const tag of tagElements) {
        if (count >= technology.length) break;
        totalWidth += tag.offsetWidth + 10;
        if (totalWidth <= containerWidth) {
          count++;
        } else {
          break;
        }
      }

      setVisibleCount(Math.max(1, count));
    };

    calculateVisibleTags();
  }, [technology]);

  if (!technology || technology.length === 0) {
    return <div className={styles.tags} />;
  }

  return (
    <>
      <div className={styles.tags} ref={containerRef}>
        {technology.slice(0, visibleCount).map((tech) => (
          <span key={tech} className={styles.tag}>
            #{tech}
          </span>
        ))}
        {visibleCount < technology.length && (
          <span className={styles.more}>
            +{technology.length - visibleCount}
          </span>
        )}
      </div>
    </>
  );
};

export default TruncatedTags;
