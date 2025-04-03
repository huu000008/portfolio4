import { fetchPosts } from '@/lib/postApi';
import PostList from '@/components/board/PostList';
import Link from 'next/link';
import styles from './page.module.scss';

export default async function BoardPage() {
  const posts = await fetchPosts();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>📋 Board</h1>
      <Link href="/board/write" className={styles.writeLink}>
        ✏️ 글쓰기
      </Link>
      <PostList posts={posts} />
    </div>
  );
}
