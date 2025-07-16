'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { cn } from '~/utils';

import { buttonStyles, type ButtonProps } from '../Button';

export const AlertDialogAction = ({ className, variant, color, ...props }: AlertDialogActionProps) => {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonStyles({ variant, color }), className)}
      {...props}
    />
  );
}

export interface AlertDialogActionProps extends React.ComponentProps<typeof AlertDialogPrimitive.Action> {
  variant?: ButtonProps['variant'];
  color?: ButtonProps['color'];
}
