'use client';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';

import { cn } from '~/utils';

export const ContextMenuLabel = ({ className, inset, ...props }: ContextMenuLabelProps) => {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        'text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8',
        className,
      )}
      {...props}
    />
  );
}

export interface ContextMenuLabelProps extends React.ComponentProps<typeof ContextMenuPrimitive.Label> {
  inset?: boolean;
}
