import { cn } from '~/utils';

import { useFieldContext } from '../context';
import { getFormErrorMessage } from '../utils';

export const FormMessage = ({ className, id, ...props }: FormMessageProps) => {
  const field = useFieldContext<string>()

  if (!field.state.meta.errors.length) {
    return null;
  }

  return (
    <div
      id={id}
      className={cn('flex flex-col', className)}
      data-slot="form-message"
    >
      {field.state.meta.errors.map(error => {
        const errorMessage = getFormErrorMessage(error);

        return (
          <em
            key={errorMessage}
            className="text-destructive text-sm"
            role="alert"
            {...props}
          >
            {errorMessage}
          </em>
        );
      })}
    </div>
  );
}

export interface FormMessageProps extends React.ComponentProps<'p'> {

}
