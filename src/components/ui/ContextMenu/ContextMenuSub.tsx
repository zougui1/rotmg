'use client';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';

export const ContextMenuSub = (props: ContextMenuSubProps) => {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />;
}

export interface ContextMenuSubProps extends React.ComponentProps<typeof ContextMenuPrimitive.Sub> {

}
