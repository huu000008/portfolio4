import { supabase } from '@/lib/supabase';
import styles from './page.module.scss';
import Link from 'next/link';

interface Props {
  params: { id: string };
}

export default async function PostDetailPage({ params }: Props) {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !post) {
    return <div className={styles.container}>게시글을 불러올 수 없습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{post.title}</h2>

      <div className={styles.date}>
        {new Date(post.created_at).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </div>
      <div className={styles.content}>{post.content}</div>
      <Link href="/board">목록으로 가기</Link>
    </div>
  );
}
