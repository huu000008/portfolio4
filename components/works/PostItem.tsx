import styles from './PostItem.module.scss';
import Animation from '../Animation';
import TransitionLink from '../ui/TransitionLink';

interface PostItemProps {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function PostItem({ id, title, created_at }: PostItemProps) {
  return (
    <Animation className={styles.wrap}>
      <TransitionLink href={`/works/${id}`} className={styles.link}>
        <div className={styles.title}>{title}</div>
        <div className={styles.date}>
          {new Date(created_at).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      </TransitionLink>
    </Animation>
  );
}
