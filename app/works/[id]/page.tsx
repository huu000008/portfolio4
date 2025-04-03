import { supabase } from '@/lib/supabase';
import styles from './page.module.scss';
import Link from 'next/link';
import PageAnimation from '@/components/PageAnimation';

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (!post || error) {
    return <div className={styles.container}>게시글을 불러올 수 없습니다.</div>;
  }

  return (
    <PageAnimation>
      <div className={styles.wrap}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.date}>
          {new Date(post.created_at).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>

        <div className={styles.actions}>
          <Link href={`/works/edit/${id}`}>수정</Link>
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </PageAnimation>
  );
}
