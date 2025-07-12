'use client';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';

export const ContextMenuRoot = (props: ContextMenuRootProps) => {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

export interface ContextMenuRootProps extends React.ComponentProps<typeof ContextMenuPrimitive.Root> {

}
