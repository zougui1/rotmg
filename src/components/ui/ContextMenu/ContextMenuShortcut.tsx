'use client';

import { cn } from '~/utils';

export const ContextMenuShortcut = ({ className, ...props }: ContextMenuShortcutProps) => {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        'text-muted-foreground ml-auto text-xs tracking-widest',
        className,
      )}
      {...props}
    />
  );
}

export interface ContextMenuShortcutProps extends React.ComponentProps<'span'> {

}
