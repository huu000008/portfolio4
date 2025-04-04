'use client';

import Link from 'next/link';
import PostList from '@/components/works/PostList';
import styles from './WorksList.module.scss';

export default function WorksList({ posts }: { posts: any[] }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h1 className={styles.heading}>📋 Works</h1>
        <Link href="/works/write" className={styles.writeLink}>
          작성하기
        </Link>
      </div>

      <PostList posts={posts} />
    </div>
  );
}
