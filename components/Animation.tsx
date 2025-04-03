'use client';

import { ElementType, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

interface AnimationProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  className?: string;
  as?: ElementType;
  onClick?: () => void;
  href?: string;
  type?: string;
}

export default function Animation({
  children,
  direction = 'up',
  threshold = 0.1,
  rootMargin = '0px',
  delay = 0,
  className = '',
  as: Tag = 'div',
  onClick,
  href,
  type,
}: AnimationProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
    rootMargin,
  });

  const MotionTag = useMemo(() => motion.create(Tag), [Tag]);

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 16 };
      case 'down':
        return { opacity: 0, y: -16 };
      case 'left':
        return { opacity: 0, x: 16 };
      case 'right':
        return { opacity: 0, x: -16 };
      default:
        return { opacity: 0 };
    }
  };

  return (
    <MotionTag
      ref={ref}
      className={className}
      onClick={onClick}
      initial={getInitialPosition()}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut', delay: delay / 1000 }}
      href={href}
      type={type}
    >
      {children}
    </MotionTag>
  );
}
