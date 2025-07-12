'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '~/utils';

export const RadioGroupRoot = ({ className, ...props }: RadioGroupRootProps) => {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('grid gap-3', className)}
      {...props}
    />
  );
}

export interface RadioGroupRootProps extends React.ComponentProps<typeof RadioGroupPrimitive.Root> {

}
