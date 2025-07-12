'use client';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '~/utils';

import { ScrollBar } from './ScrollBar';

export const ScrollAreaRoot = ({ className, children, ...props }: ScrollAreaRootProps) => {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>

      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

export interface ScrollAreaRootProps extends React.ComponentProps<typeof ScrollAreaPrimitive.Root> {

}
