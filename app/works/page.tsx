import { fetchPosts } from '@/lib/postApi';
import PostList from '@/components/board/PostList';
import Link from 'next/link';
import styles from './page.module.scss';
import PageAnimation from '@/components/PageAnimation';

export default async function WorksPage() {
  const posts = await fetchPosts();

  return (
    <PageAnimation>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <h1 className={styles.heading}>📋 Works</h1>
          <Link href="/works/write" className={styles.writeLink}>
            작성하기
          </Link>
        </div>

        <PostList posts={posts} />
      </div>
    </PageAnimation>
  );
}
