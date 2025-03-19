'use client';

import styles from './Dialog.module.scss';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, { useRef } from 'react';
import clsx from 'clsx';

const DialogRoot = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={clsx(styles.overlay, className)}
    {...props}
  />
));
DialogOverlay.displayName = 'DialogOverlay';

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const localRef = useRef<HTMLDivElement>(null);

  return (
    <DialogPortal>
      <DialogOverlay className={styles.overlay} />
      <DialogPrimitive.Content
        ref={ref}
        className={clsx(styles.dialog, className)}
        onOpenAutoFocus={(event) => {
          localRef.current?.focus();
          event.preventDefault();
        }}
        {...props}
      >
        <div className={styles.inner}>
          <div ref={localRef} tabIndex={-1} />
          {children}
          <DialogClose className={styles.closeButton}>✕</DialogClose>
        </div>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = 'DialogContent';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={clsx(styles.title, className)}
    {...props}
  />
));
DialogTitle.displayName = 'DialogTitle';

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={clsx(styles.description, className)}
    {...props}
  />
));
DialogDescription.displayName = 'DialogDescription';

export {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogDescription,
};
