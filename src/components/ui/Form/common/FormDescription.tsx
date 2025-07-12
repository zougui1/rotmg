import { cn } from '~/utils';

export const FormDescription = ({ className, ...props }: FormDescriptionProps) => {
  return (
    <p
      data-slot="form-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export interface FormDescriptionProps extends React.ComponentProps<'p'> {

}
