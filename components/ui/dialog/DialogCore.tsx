'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import React from 'react';
import styles from './Dialog.module.scss';

const DialogRoot = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = ({ className }: { className?: string }) => (
  <motion.div
    className={clsx(styles.overlay, className)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  />
);

const DialogContent = ({
  children,
  open,
}: {
  children: React.ReactNode;
  open: boolean;
}) => {
  return (
    <DialogPortal forceMount>
      <AnimatePresence>
        {open && (
          <>
            <DialogPrimitive.Overlay asChild forceMount>
              <DialogOverlay />
            </DialogPrimitive.Overlay>

            <DialogPrimitive.Content asChild forceMount>
              <motion.div
                className={styles.dialog}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
              >
                <div className={styles.inner}>
                  {children}
                  <DialogClose className={styles.closeButton}>✕</DialogClose>
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </>
        )}
      </AnimatePresence>
    </DialogPortal>
  );
};

const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;

export {
  DialogRoot,
  DialogTrigger,
  DialogClose,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
};
