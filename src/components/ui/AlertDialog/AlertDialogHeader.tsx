import { cn } from '~/utils';

export const AlertDialogHeader = ({ className, ...props }: AlertDialogHeaderProps) => {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  );
}

export interface AlertDialogHeaderProps extends React.ComponentProps<'div'> {

}
