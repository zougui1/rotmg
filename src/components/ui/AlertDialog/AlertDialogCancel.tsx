'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { cn } from '~/utils';

import { buttonStyles } from '../Button';

export const AlertDialogCancel = ({ className, ...props }: AlertDialogCancelProps) => {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonStyles({ variant: 'outline' }), className)}
      {...props}
    />
  );
}

export interface AlertDialogCancelProps extends React.ComponentProps<typeof AlertDialogPrimitive.Cancel> {

}
