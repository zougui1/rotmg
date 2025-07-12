import { ChevronDown, ChevronUp } from 'lucide-react';
import { NumberField } from '@base-ui-components/react/number-field';

import { cn } from '~/utils';

import { Button } from './Button';

export const NumberInput = ({
  className,
  startContent,
  onBlur,
  onFocus,
  ref,
  ...props
}: NumberInputProps) => {
  return (
    <NumberField.Root
      className={cn(
        'dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow]',
        'selection:bg-primary selection:text-primary-foreground',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    >
      <NumberField.Group className="w-full flex justify-between items-center">
        <div className="w-full flex items-center">
          {startContent}
          <NumberField.Input
            ref={ref}
            className="w-full placeholder:text-muted-foreground outline-none"
            onBlur={onBlur}
            onFocus={onFocus}
          />
        </div>

        <div className="flex flex-col">
          <NumberField.Increment render={<Button icon variant="flat" className="size-3.5 !p-0" />}>
            <ChevronUp className="size-3" />
          </NumberField.Increment>

          <NumberField.Decrement render={<Button icon variant="flat" className="size-3.5 !p-0" />}>
            <ChevronDown className="size-3" />
          </NumberField.Decrement>
        </div>
      </NumberField.Group>
    </NumberField.Root>
  );
}

export interface NumberInputProps extends Omit<React.ComponentProps<typeof NumberField.Root>, 'ref' | 'onBlur' | 'onFocus'> {
  ref?: React.Ref<React.ComponentRef<typeof NumberField.Input>>;
  startContent?: React.ReactNode;
  onBlur?: React.ComponentProps<typeof NumberField.Input>['onBlur'];
  onFocus?: React.ComponentProps<typeof NumberField.Input>['onFocus'];
}
