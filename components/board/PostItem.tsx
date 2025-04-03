'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import styles from './PostItem.module.scss';

interface PostItemProps {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function PostItem({
  id,
  title,
  content,
  created_at,
}: PostItemProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={styles.item}
    >
      <div className={styles.title}>{title}</div>
      <div className={styles.date}>
        {new Date(created_at).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </div>
      <div className={styles.content}>{content}</div>
      <div className={styles.actions}>
        <Link href={`/board/${id}`}>✏️ 보기</Link>
        <Link href={`/board/edit/${id}`}>✏️ 수정</Link>
      </div>
    </motion.div>
  );
}
