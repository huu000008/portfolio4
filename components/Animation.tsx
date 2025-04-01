'use client';

import { useEffect, useRef, ElementType } from 'react';

interface AnimationProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  className?: string;
  as?: ElementType;
  onClick?: () => void;
}

export default function Animation({
  children,
  threshold = 0.1,
  rootMargin = '0px',
  delay = 0,
  className = '',
  as: Tag = 'div',
  onClick,
}: AnimationProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('fade-in-visible');
            }, delay);
          } else {
            entry.target.classList.remove('fade-in-visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [threshold, rootMargin, delay]);

  return (
    <Tag ref={ref} className={`fade-in-section ${className}`} onClick={onClick}>
      {children}
    </Tag>
  );
}
