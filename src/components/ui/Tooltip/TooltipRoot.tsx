'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { TooltipProvider } from './TooltipProvider';

export const TooltipRoot = (props: TooltipRootProps) => {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

export interface TooltipRootProps extends React.ComponentProps<typeof TooltipPrimitive.Root> {

}
