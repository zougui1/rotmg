import { cn } from '~/utils';

export const DialogHeader = ({ className, ...props }: DialogHeaderProps) => {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  );
}

export interface DialogHeaderProps extends React.ComponentProps<'div'> {

}
