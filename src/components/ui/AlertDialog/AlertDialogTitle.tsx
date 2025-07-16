'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { cn } from '~/utils';

export const AlertDialogTitle = ({ className, ...props }: AlertDialogTitleProps) => {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  );
}

export interface AlertDialogTitleProps extends React.ComponentProps<typeof AlertDialogPrimitive.Title> {

}
