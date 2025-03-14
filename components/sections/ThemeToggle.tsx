'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '../ClientThemeProvider';
import styles from './ThemeToggle.module.scss';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 버튼은 항상 렌더링하되, 클릭 이벤트는 마운트 후에만 활성화
  return (
    <button
      className={styles.themeToggle}
      onClick={mounted ? toggleTheme : undefined}
      aria-label="테마 전환"
    >
      <span className={styles.icon}>{theme === 'light' ? '🌙' : '☀️'}</span>
    </button>
  );
}
