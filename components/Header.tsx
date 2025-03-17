'use client';

import ThemeToggle from './sections/ThemeToggle';
import styles from './Header.module.scss';

export default function ClientWrapper() {
  return (
    <header className={styles.header}>
      <h1>JOHYUKRAE</h1>
      <ThemeToggle />
    </header>
  );
}
