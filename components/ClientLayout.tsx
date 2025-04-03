'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import ClientThemeProvider from '@/components/ClientThemeProvider';
import { Navigation } from '@/components/sections/Navigation';
import QuickBox from '@/components/sections/QuickBox';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  return (
    <ClientThemeProvider>
      <Navigation />

      {isMainPage ? (
        children
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{ minHeight: '100vh' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}

      <QuickBox />
    </ClientThemeProvider>
  );
}
