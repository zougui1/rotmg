'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

export const AlertDialogTrigger = (props: AlertDialogTriggerProps) => {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

export interface AlertDialogTriggerProps extends React.ComponentProps<typeof AlertDialogPrimitive.Trigger> {

}
