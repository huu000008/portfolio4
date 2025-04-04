'use client';

import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEvent, ReactNode } from 'react';

type TransitionLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
};

export default function TransitionLink({
  href,
  children,
  className,
  ...rest
}: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
      return;
    e.preventDefault();

    const navigate = () => {
      if (typeof href === 'string') {
        router.push(href);
      } else {
        router.push(
          href.pathname +
            (href.query
              ? '?' + new URLSearchParams(href.query as Record<string, string>)
              : '')
        );
      }
    };

    if (document.startViewTransition) {
      document.startViewTransition(navigate);
    } else {
      navigate();
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </Link>
  );
}
