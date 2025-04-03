'use client';

import { ElementType } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
  onClick,
}: AnimationProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
    rootMargin,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut', delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}
