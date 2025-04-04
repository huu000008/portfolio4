import PostItem from './PostItem';
import styles from './PostList.module.scss';

export default function PostList({ posts }: { posts: any[] }) {
  return (
    <div className={styles.wrap}>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          created_at={post.created_at}
        />
      ))}
    </div>
  );
}
