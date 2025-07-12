import { cn } from '~/utils';

export const VaultSlot = ({ children, className, classes, ...props }: VaultSlotProps) => {
  return (
    <div
      className={cn(
        'group bg-[#616161] p-[5px] size-[var(--vault-slot-width)]',
        'box-border cursor-pointer select-none',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'size-full',
          'group-hover:shadow-[inset_0_0_5px_3px] group-hover:shadow-black/40',
          'group-active:shadow-[inset_0_0_5px_3px] group-active:shadow-black/65',
          classes?.wrapper,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export interface VaultSlotProps extends React.ComponentProps<'div'> {
  classes?: Partial<Record<'wrapper', string>>;
}
