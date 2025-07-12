'use client';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';

export const ContextMenuRadioGroup = (props: ContextMenuRadioGroupProps) => {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  );
}

export interface ContextMenuRadioGroupProps extends React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup> {

}
