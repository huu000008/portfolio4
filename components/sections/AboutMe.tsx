'use client';

import React from 'react';
import styles from './AboutMe.module.scss';
import Animation from '../Animation';
// import Image from 'next/image';
import { Skill1Icon } from '@/assets/icon/Skill1Icon';
import { Skill2Icon } from '@/assets/icon/Skill2Icon';
import { Skill3Icon } from '@/assets/icon/Skill3Icon';

export const AboutMe = () => {
  return (
    <section className={styles.wrap} id="about">
      <h2 className={'sr-only'}>About Me</h2>
      <div className={styles.inner}>
        {/* <div className={styles.introduce}>
          <h3>Introduce</h3>
          <div className={styles.list}>
            <div className={styles.item}>
              <div className={styles.image}>
                <Image
                  src="/introduce01.png"
                  alt="introduce"
                  fill
                  loading="lazy"
                  objectFit="cover"
                />
              </div>
              <p>진화에 누구보다 진심인 편</p>
            </div>
            <div className={styles.item}>
              <div className={styles.image}>
                <Image
                  src="/introduce01.png"
                  alt="introduce"
                  fill
                  loading="lazy"
                  objectFit="cover"
                />
              </div>
              <p>진화에 누구보다 진심인 편</p>
            </div>
            <div className={styles.item}>
              <div className={styles.image}>
                <Image
                  src="/introduce01.png"
                  alt="introduce"
                  fill
                  loading="lazy"
                  objectFit="cover"
                />
              </div>
              <p>진화에 누구보다 진심인 편</p>
            </div>
          </div>
        </div> */}
        <div className={styles.interview}>
          <h3>Interview</h3>
          <div className={styles.list}>
            <Animation className={styles.item}>
              <div className={styles.question}>
                Q. 프론트엔드로 전향한 이유?
              </div>
              <p>
                웹 디자인 전공 후 코딩에 흥미를 느껴 퍼블리셔로 HTML, CSS,
                JavaScript 등 웹 표준 작업을 경험했습니다. 이 과정에서
                프론트엔드 개발의 매력을 느꼈고, React와 Vue 등 다양한 기술을
                익히며 사용자 중심의 동적 애플리케이션 개발에 매력을 느껴
                프론트엔드로 전향하게 되었습니다.
              </p>
            </Animation>
            <Animation className={styles.item}>
              <div className={styles.question}>
                Q. 일에 있어 가장 중요하게 생각하는 것이 있다면? ?
              </div>
              <p>
                프론트엔드 개발자로서 항상 사용자 관점을 최우선으로 생각합니다.
                직관적이고 일관된 UI 구현은 물론, Chrome Lighthouse를 활용한
                성능 최적화를 통해 다양한 사용자가 쾌적하게 서비스를 이용할 수
                있도록 기여하는 것을 중요하게 생각합니다.
              </p>
            </Animation>
            <Animation className={styles.item}>
              <div className={styles.question}>
                Q. 자기계발을 위해 어떤 것들을 해왔는지?
              </div>
              <p>
                지속적인 학습을 위해 스터디와 온라인 강의에 꾸준히 참여하며,
                새로운 기술도 메타인지를 활용해 능동적으로 익히고 있습니다.
                피드백은 성장의 기회라 생각하고 열린 자세로 받아들이며, 개발
                과정에서도 항상 개선점을 찾고자 노력하고 있습니다.
              </p>
            </Animation>
          </div>
        </div>
        <div className={styles.skill}>
          <h3>Skills</h3>
          <div className={styles.inner}>
            <ul>
              <li>
                <div className={styles.title}>
                  <Skill1Icon />
                  Languages
                </div>
                <div className={styles.tags}>
                  <span
                    className={styles.tag}
                    style={{ backgroundColor: '#f7df1e' }}
                  >
                    JavaScript
                  </span>
                  <span
                    className={styles.tag}
                    style={{ backgroundColor: '#3178c6' }}
                  >
                    TypeScript
                  </span>
                  <span
                    className={styles.tag}
                    style={{ backgroundColor: '#e34f26' }}
                  >
                    HTML
                  </span>
                  <span
                    className={styles.tag}
                    style={{ backgroundColor: '#1572b6' }}
                  >
                    CSS
                  </span>
                </div>
              </li>
              <li>
                <div className={styles.title}>
                  <Skill3Icon />
                  Frameworks
                </div>
                <div className={styles.tags}>
                  <span
                    className={styles.tag}
                    style={{ backgroundColor: '#61DBFB' }}
                  >
                    React
                  </span>
                  <span
                    className={styles.tag}
                    style={{ backgroundColor: '#42b883' }}
                  >
                    Vue.js
                  </span>
                  <span
                    className={styles.tag}
                    style={{ backgroundColor: '#5e72e4' }}
                  >
                    Next.js
                  </span>
                  <span
                    className={styles.tag}
                    style={{ backgroundColor: '#41b883' }}
                  >
                    Nuxt.js
                  </span>
                </div>
              </li>
              <li>
                <div className={styles.title}>
                  <Skill2Icon />
                  Libraries
                </div>
                <div className={styles.tags}>
                  <span
                    className={styles.tag}
                    style={{ backgroundColor: '#000000' }}
                  >
                    Zustand
                  </span>
                  <span
                    className={styles.tag}
                    style={{ backgroundColor: '#ff4154' }}
                  >
                    React-Query
                  </span>
                  <span
                    className={styles.tag}
                    style={{ backgroundColor: '#3578e5' }}
                  >
                    Recoil
                  </span>
                  <span
                    className={styles.tag}
                    style={{ backgroundColor: '#d36ac2' }}
                  >
                    Emotion
                  </span>
                  <span
                    className={styles.tag}
                    style={{ backgroundColor: '#cc6699' }}
                  >
                    Sass
                  </span>
                  <span
                    className={styles.tag}
                    style={{ backgroundColor: '#35495e' }}
                  >
                    Vuex
                  </span>
                  <span
                    className={styles.tag}
                    style={{ backgroundColor: '#41b883' }}
                  >
                    Pinia
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
