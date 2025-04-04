'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.scss';
import TransitionLink from '../ui/TransitionLink';

export const Navigation = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div className={styles.wrap}>
      {!isHome && (
        <TransitionLink
          href="/"
          className={pathname === '/' ? styles.active : ''}
        >
          Home
        </TransitionLink>
      )}

      {isHome && (
        <>
          <Link href="#about" data-section="about" className={styles.link}>
            About Me
          </Link>
        </>
      )}

      <TransitionLink
        href="/works"
        className={pathname === '/works' ? styles.active : 'a'}
      >
        Works
      </TransitionLink>
    </div>
  );
};
