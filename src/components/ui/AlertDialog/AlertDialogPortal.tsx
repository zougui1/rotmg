'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

export interface AlertDialogPortalProps extends React.ComponentProps<typeof AlertDialogPrimitive.Portal> {

}

export const AlertDialogPortal = (props: AlertDialogPortalProps) => {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
}

export interface AlertDialogPortalProps extends React.ComponentProps<typeof AlertDialogPrimitive.Portal> {

}
