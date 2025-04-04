import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type PostWriteMode = 'create' | 'edit';

export function usePostWrite(options?: {
  initialTitle?: string;
  initialContent?: string;
  postId?: string;
  mode?: PostWriteMode;
}) {
  const router = useRouter();

  const [title, setTitle] = useState(options?.initialTitle || '');
  const [content, setContent] = useState(options?.initialContent || '');
  const [htmlInput, setHtmlInput] = useState(options?.initialContent || '');
  const [mode, setMode] = useState<'editor' | 'html'>('editor');
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    let error;

    if (options?.mode === 'edit' && options.postId) {
      const res = await supabase
        .from('posts')
        .update({ title, content: rawContent })
        .eq('id', options.postId);
      error = res.error;
    } else {
      const res = await supabase
        .from('posts')
        .insert({ title, content: rawContent });
      error = res.error;
    }

    setLoading(false);

    if (error) {
      alert(`저장 실패: ${error.message}`);
    } else {
      router.push('/works');
    }
  };

  return {
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
  };
}
