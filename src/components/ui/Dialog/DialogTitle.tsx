'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '~/utils';

export const DialogTitle = ({ className, ...props }: DialogTitleProps) => {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('text-lg leading-none font-semibold', className)}
      {...props}
    />
  );
}

export interface DialogTitleProps extends React.ComponentProps<typeof DialogPrimitive.Title> {

}
