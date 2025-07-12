'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '~/utils';

export const TabsContent = ({ className, ...props }: TabsContentProps) => {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export interface TabsContentProps extends React.ComponentProps<typeof TabsPrimitive.Content> {

}
