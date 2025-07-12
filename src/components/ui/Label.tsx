'use client';

import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '~/utils';

export const Label = ({ className, ...props }: LabelProps) => {
  return (
    <LabelPrimitive.Root
      {...props}
      data-slot="label"
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
    />
  );
}


export interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {

}
