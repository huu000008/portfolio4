import WorksDetail from '@/components/containers/works/WorksDetail';
import { supabase } from '@/lib/supabase';

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (!post || error) {
    return <div>게시글을 불러올 수 없습니다.</div>;
  }

  return <WorksDetail post={post} />;
}
