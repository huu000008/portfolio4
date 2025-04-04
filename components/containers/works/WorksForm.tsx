'use client';

import { usePostWrite } from '@/hooks/usePostWrite';
import TiptapEditor from '@/components/editor/TiptapEditor';
import styles from './WorksForm.module.scss';

export default function WorksForm({
  post,
}: {
  post?: { id: string; title: string; content: string };
}) {
  const {
    title,
    setTitle,
    content,
    setContent,
    htmlInput,
    setHtmlInput,
    mode,
    setMode,
    handleSubmit,
    loading,
  } = usePostWrite({
    initialTitle: post?.title,
    initialContent: post?.content,
    postId: post?.id,
    mode: post ? 'edit' : 'create',
  });

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

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? '처리 중...' : post ? '수정' : '등록'}
        </button>
      </form>
    </div>
  );
}
