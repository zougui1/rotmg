'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';

export const DialogRoot = (props: DialogRootProps) => {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

export interface DialogRootProps extends React.ComponentProps<typeof DialogPrimitive.Root> {

}
