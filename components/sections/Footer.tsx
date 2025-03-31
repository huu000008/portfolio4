import styles from './Footer.module.scss';
import Animation from '../Animation';

export default function Footer() {
  return (
    <footer className={styles.wrap}>
      <section className={styles.wrap}>
        <Animation as="h2" className={styles.box}>
          <div className={styles.text_1}>Thank You</div>
          <div className={styles.text_2}>봐주셔서 감사합니다:)</div>
        </Animation>
        <Animation as="p" delay={500}>
          프론트엔드 개발자로 성장하기 위해 낯선 기술에도 적극적으로 도전하고,{' '}
          <br />
          항상 사용자의 관점에서 생각하며 사용하기 좋은 서비스를 만들고
          싶습니다.
        </Animation>
        <p className={styles.copyright}>
          Copyright 2025. johyukrae all rights reserved.
          <br />
          Next.js 기반으로 제작된 사이트입니다.
        </p>
      </section>
    </footer>
  );
}
