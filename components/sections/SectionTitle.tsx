import React from 'react';
import styles from './SectionTitle.module.scss';
import Animation from '../Animation';

export const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <Animation as="h2" className={styles.wrap}>
      {children}
    </Animation>
  );
};
