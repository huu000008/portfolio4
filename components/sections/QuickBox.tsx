'use client';

import ThemeToggle from './ThemeToggle';
import styles from './QuickBox.module.scss';
import { ArrowUpIcon } from '@/assets/icon/ArrowUpIcon';

export default function QuickBox() {
  return (
    <section className={styles.wrap}>
      <h2 className={styles.title}>quick box</h2>
      <ul>
        <li>
          <ThemeToggle />
        </li>
        <li>
          <ArrowUpIcon
            size={24}
            className={styles.arrowUpIcon}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        </li>
      </ul>
    </section>
  );
}
