'use client';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';

import { cn } from '~/utils';

export const ContextMenuItem = ({
  className,
  inset,
  variant = 'default',
  ...props
}: ContextMenuItemProps) => {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        'cursor-pointer focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*="text-"])]:text-muted-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
        className,
      )}
      {...props}
    />
  );
}

export interface ContextMenuItemProps extends React.ComponentProps<typeof ContextMenuPrimitive.Item> {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}
