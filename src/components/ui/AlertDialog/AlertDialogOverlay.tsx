'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { cn } from '~/utils';

export const AlertDialogOverlay = ({ className, ...props }: AlertDialogOverlayProps) => {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className,
      )}
      {...props}
    />
  );
}

export interface AlertDialogOverlayProps extends React.ComponentProps<typeof AlertDialogPrimitive.Overlay> {

}
