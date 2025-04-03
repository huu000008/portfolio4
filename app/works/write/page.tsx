'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import TiptapEditor from '@/components/editor/TiptapEditor';
import styles from './page.module.scss';

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [htmlInput, setHtmlInput] = useState('');
  const [mode, setMode] = useState<'editor' | 'html'>('editor');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('제목을 입력하세요.');
      return;
    }

    const rawContent = mode === 'html' ? htmlInput : content;
    const stripped = rawContent.replace(/<[^>]*>/g, '').trim();
    if (!stripped) {
      alert('내용을 입력하세요.');
      return;
    }

    const { error } = await supabase
      .from('posts')
      .insert({ title, content: rawContent });

    if (error) {
      alert('등록 실패: ' + error.message);
    } else {
      router.push('/works');
    }
  };

  return (
    <div className={styles.wrap}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className={styles.input}
        />

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={() => setMode('editor')}
            className={mode === 'editor' ? styles.activeTab : ''}
          >
            에디터
          </button>
          <button
            type="button"
            onClick={() => setMode('html')}
            className={mode === 'html' ? styles.activeTab : ''}
          >
            HTML 코드
          </button>
        </div>

        {mode === 'editor' && (
          <TiptapEditor content={content} onChange={setContent} />
        )}

        {mode === 'html' && (
          <textarea
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            placeholder="HTML 코드를 입력하세요"
            className={styles.textarea}
            rows={15}
          />
        )}

        <button type="submit" className={styles.button}>
          등록
        </button>
      </form>
    </div>
  );
}
