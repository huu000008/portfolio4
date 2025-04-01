'use client';

import { useEffect } from 'react';

export default function ScrollSpy() {
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('[data-section]');

    const observer = new IntersectionObserver(
      (entries) => {
        let activeId: string | null = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeId = entry.target.getAttribute('id');
          }
        });

        navLinks.forEach((link) => {
          const id = link.getAttribute('data-section');
          if (id === activeId) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px', // 가운데 들어왔을 때 감지
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return null;
}
