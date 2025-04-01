// components/LottiePlayer.tsx
'use client';

import Lottie from 'lottie-react';

export default function LottiePlayer({
  animationData,
  loop,
}: {
  animationData: any;
  loop: boolean;
}) {
  return <Lottie animationData={animationData} loop={loop} />;
}
