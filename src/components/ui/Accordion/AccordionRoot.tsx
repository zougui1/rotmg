'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';

export const  AccordionRoot = (props: AccordionRootProps) => {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

export type AccordionRootProps = React.ComponentProps<typeof AccordionPrimitive.Root>;
