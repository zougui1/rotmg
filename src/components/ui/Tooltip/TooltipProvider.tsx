'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export const TooltipProvider = ({ delayDuration = 0, ...props }: TooltipProviderProps) => {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

export interface TooltipProviderProps extends React.ComponentProps<typeof TooltipPrimitive.Provider> {

}
