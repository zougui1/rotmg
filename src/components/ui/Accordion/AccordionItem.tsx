'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { cn } from '~/utils';

export const  AccordionItem = ({ className, ...props }: AccordionItemProps) => {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('border-b last:border-b-0', className)}
      {...props}
    />
  );
}

export interface AccordionItemProps extends React.ComponentProps<typeof AccordionPrimitive.Item> {

}
