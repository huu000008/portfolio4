import { supabase } from '@/lib/supabase';
import WorksForm from '@/components/containers/works/WorksForm';

export default async function EditPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (!post || error) {
    return <div>게시글을 불러올 수 없습니다.</div>;
  }

  return <WorksForm post={post} />;
}
