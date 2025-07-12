'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '~/utils';

export const TabsRoot = ({ className, ...props }: TabsRootProps) => {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

export interface TabsRootProps extends React.ComponentProps<typeof TabsPrimitive.Root> {

}
