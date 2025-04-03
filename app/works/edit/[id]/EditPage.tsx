'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import TiptapEditor from '@/components/editor/TiptapEditor';
import styles from './page.module.scss';

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        alert('불러오기 실패');
        router.push('/works');
        return;
      }

      setTitle(data.title);
      setContent(data.content);
      setLoading(false);
    };
    fetch();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from('posts')
      .update({ title, content, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      alert('수정 실패');
    } else {
      router.push('/works');
    }
  };

  if (loading) return <div className={styles.container}>로딩 중...</div>;

  return (
    <div className={styles.wrap}>
      <h1 className={styles.heading}>✏️ 글 수정</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TiptapEditor content={content} onChange={setContent} />
        <button type="submit" className={styles.button}>
          수정 완료
        </button>
      </form>
    </div>
  );
}
