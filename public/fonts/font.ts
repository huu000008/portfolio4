import localFont from 'next/font/local';

export const pretendard = localFont({
  display: 'swap',
  variable: '--font-pretendard',
  src: [
    {
      path: './Pretendard-Thin.subset.woff2',
      weight: '100',
    },
    {
      path: './Pretendard-Light.subset.woff2',
      weight: '300',
    },
    {
      path: './Pretendard-Regular.subset.woff2',
      weight: '400',
    },
    {
      path: './Pretendard-Medium.subset.woff2',
      weight: '500',
    },
    {
      path: './Pretendard-SemiBold.subset.woff2',
      weight: '600',
    },
    {
      path: './Pretendard-Bold.subset.woff2',
      weight: '700',
    },
    {
      path: './Pretendard-Black.subset.woff2',
      weight: '900',
    },
  ],
});
