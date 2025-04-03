import styles from './PostItem.module.scss';
import Animation from '../Animation';
import Link from 'next/link';

interface PostItemProps {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function PostItem({ id, title, created_at }: PostItemProps) {
  return (
    // {/* <Animation as="a" className={styles.wrap} href={`/works/${id}`}> */}
    <Link href={`/works/${id}`} className={styles.wrap}>
      <div className={styles.title}>{title}</div>
      <div className={styles.date}>
        {new Date(created_at).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </div>
    </Link>
    // {/* </Animation> */}
  );
}
