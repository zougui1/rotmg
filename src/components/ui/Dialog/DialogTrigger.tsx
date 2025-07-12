'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';

export const DialogTrigger = (props: DialogTriggerProps) => {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

export interface DialogTriggerProps extends React.ComponentProps<typeof DialogPrimitive.Trigger> {

}
