import { cn } from '~/utils';

import { useFieldContext } from '../context';
import { Label, type LabelProps } from '../../Label';

export const FormLabel = ({ className, ...props }: FormLabelProps) => {
  const field = useFieldContext()

  return (
    <Label
      data-slot="form-label"
      data-error={field.state.meta.errors.length > 0}
      className={cn('data-[error=true]:text-destructive', className)}
      {...props}
    />
  );
}

export interface FormLabelProps extends LabelProps {

}
