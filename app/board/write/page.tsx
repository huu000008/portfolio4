'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import styles from './page.module.scss';

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from('posts').insert({
      title,
      content,
    });

    if (error) {
      alert('등록 실패: ' + error.message);
    } else {
      router.push('/board');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>✍️ 새 글 작성</h1>
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
          등록
        </button>
      </form>
    </div>
  );
}
