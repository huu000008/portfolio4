'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import styles from './TiptapEditor.module.scss';

export default function TiptapEditor({
  content,
  onChange,
}: {
  content?: string;
  onChange: (value: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;
  console.log(editor.getHTML());
  return (
    <div className={styles.wrap}>
      <EditorContent editor={editor} className={styles.editor} />
    </div>
  );
}
