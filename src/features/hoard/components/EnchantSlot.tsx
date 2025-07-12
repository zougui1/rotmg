import { cn } from '~/utils';

export const EnchantSlot = ({ className, ...props }: EnchantSlotProps) => {
  return (
    <div
      className={cn(
        'size-2.5 md:size-3 rotate-45 border border-black shadow-md',
        className,
      )}
      {...props}
    />
  );
}

export interface EnchantSlotProps extends React.ComponentProps<'div'> {

}
