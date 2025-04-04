import { fetchPosts } from '@/lib/postApi';
import WorksList from '@/components/containers/works/WorksList';

export default async function WorksPage() {
  const posts = await fetchPosts();

  return <WorksList posts={posts} />;
}
