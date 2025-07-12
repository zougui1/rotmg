'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export const TooltipTrigger = (props: TooltipTriggerProps) => {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

export interface TooltipTriggerProps extends React.ComponentProps<typeof TooltipPrimitive.Trigger> {

}
