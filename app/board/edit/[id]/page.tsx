'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import styles from './page.module.scss';

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // 글 불러오기
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
      if (data) {
        setTitle(data.title);
        setContent(data.content);
      }
      setLoading(false);
    };

    if (id) fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from('posts')
      .update({ title, content, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      alert('수정 실패: ' + error.message);
    } else {
      router.push('/board');
    }
  };

  if (loading) return <div className={styles.container}>불러오는 중...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>✏️ 글 수정</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={styles.textarea}
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          수정 완료
        </button>
      </form>
    </div>
  );
}
