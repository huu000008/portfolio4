'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.scss';

export const Navigation = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div className={styles.wrap}>
      {!isHome && <Link href="/">Home</Link>}

      {isHome && (
        <>
          <Link href="#about" data-section="about">
            About Me
          </Link>
        </>
      )}

      <Link href="/board">Board</Link>
    </div>
  );
};
