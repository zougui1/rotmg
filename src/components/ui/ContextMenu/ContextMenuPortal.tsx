'use client';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';

export const ContextMenuPortal = (props: ContextMenuPortalProps) => {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  );
}

export interface ContextMenuPortalProps extends React.ComponentProps<typeof ContextMenuPrimitive.Portal> {

}
