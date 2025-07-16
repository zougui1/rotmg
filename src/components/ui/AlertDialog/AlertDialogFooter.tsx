import { cn } from '~/utils';

export const AlertDialogFooter = ({ className, ...props }: AlertDialogFooterProps) => {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  )
}

export interface AlertDialogFooterProps extends React.ComponentProps<'div'> {

}
