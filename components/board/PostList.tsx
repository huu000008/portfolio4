'use client';

import PostItem from './PostItem';

export default function PostList({ posts }: { posts: any[] }) {
  return (
    <div className="space-y-6">
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
