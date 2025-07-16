'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { cn } from '~/utils';

export const AlertDialogDescription = ({ className, ...props }: AlertDialogDescriptionProps) => {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export interface AlertDialogDescriptionProps extends React.ComponentProps<typeof AlertDialogPrimitive.Description> {

}
