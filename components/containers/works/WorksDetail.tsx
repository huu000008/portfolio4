import styles from './WorksDetail.module.scss';
import Link from 'next/link';

export default function WorksDetail({ post }: { post: any }) {
  return (
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
        <Link href={`/works/edit/${post.id}`}>🛠 수정</Link>
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
