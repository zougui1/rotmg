'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '~/utils';

export const DialogDescription = ({ className, ...props }: DialogDescriptionProps) => {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export interface DialogDescriptionProps extends React.ComponentProps<typeof DialogPrimitive.Description> {

}
