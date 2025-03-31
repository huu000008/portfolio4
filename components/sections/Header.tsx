'use client';

import ThemeToggle from './ThemeToggle';
import styles from './Header.module.scss';

export default function ClientWrapper() {
  return (
    <header className={styles.header}>
      <ThemeToggle />
    </header>
  );
}
