'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';

export const DialogClose = (props: DialogCloseProps) => {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

export interface DialogCloseProps extends React.ComponentProps<typeof DialogPrimitive.Close> {

}
