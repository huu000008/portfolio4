'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.scss';

export const Navigation = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div className={styles.wrap}>
      {!isHome && (
        <Link href="/" className={pathname === '/' ? styles.active : ''}>
          Home
        </Link>
      )}

      {isHome && (
        <>
          <Link href="#about" data-section="about" className={styles.link}>
            About Me
          </Link>
        </>
      )}

      <Link
        href="/works"
        className={pathname === '/works' ? styles.active : 'a'}
      >
        Works
      </Link>
    </div>
  );
};
