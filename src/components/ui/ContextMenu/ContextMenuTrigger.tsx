'use client';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';

export const ContextMenuTrigger = (props: ContextMenuTriggerProps) => {
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  );
}

export interface ContextMenuTriggerProps extends React.ComponentProps<typeof ContextMenuPrimitive.Trigger> {

}
