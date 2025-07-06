'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { cn } from '~/utils';

export const  AccordionContent = ({ className, children, ...props }: AccordionContentProps) => {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export interface AccordionContentProps extends React.ComponentProps<typeof AccordionPrimitive.Content> {

}
