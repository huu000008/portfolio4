import React from 'react';
import styles from './MainVisual.module.scss';
import Animation from '../Animation';


export const MainVisual = () => {
  return (
    <section className={styles.wrap}>
      <Animation as="h2" className={styles.box}>
        <div className={styles.text_1}>Front-End</div>
        <div className={styles.text_2}>
          프론트엔드 개발자 <strong>조혁래</strong>입니다.
        </div>
      </Animation>
      <Animation as='p'>
        사용자를 생각하는 <strong>역지사지</strong> 마인드,
        <br />
        포기하지 않고 <strong>책임감</strong>있게 일하는 개발자입니다.
      </Animation>
    </section>
  );
};
