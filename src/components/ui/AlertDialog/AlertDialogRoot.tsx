'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

export const AlertDialogRoot = (props: AlertDialogRootProps) => {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

export interface AlertDialogRootProps extends React.ComponentProps<typeof AlertDialogPrimitive.Root> {

}
