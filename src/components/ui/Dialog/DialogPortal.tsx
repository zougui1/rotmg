'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';

export const DialogPortal = (props: DialogPortalProps) => {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

export interface DialogPortalProps extends React.ComponentProps<typeof DialogPrimitive.Portal> {

}
