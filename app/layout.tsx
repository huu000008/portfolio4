import type { Metadata } from 'next';
import { kakaoBig, kakaoSmall } from '@/assets/styles/fonts/font';

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';
import '@/assets/styles/style.scss';
import Header from '@/components/sections/Header';
import ClientThemeProvider from '@/components/ClientThemeProvider';

export const metadata: Metadata = {
  title: 'JOHYUKRAE',
  description: 'JOHYUKRAE ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('theme');
                  if (!mode) {
                    mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.setAttribute('data-theme', mode);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={kakaoBig.className + ' ' + kakaoSmall.className}
        suppressHydrationWarning
      >
        <ClientThemeProvider>
          <Header />
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}
