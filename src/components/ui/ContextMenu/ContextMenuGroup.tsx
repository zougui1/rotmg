'use client';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';

export const ContextMenuGroup = (props: ContextMenuGroupProps) => {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  );
}

export interface ContextMenuGroupProps extends React.ComponentProps<typeof ContextMenuPrimitive.Group> {

}
