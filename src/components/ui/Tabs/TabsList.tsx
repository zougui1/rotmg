'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '~/utils';

export const TabsList = ({ className, ...props }: TabsListProps) => {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
        className,
      )}
      {...props}
    />
  );
}

export interface TabsListProps extends React.ComponentProps<typeof TabsPrimitive.List> {

}
