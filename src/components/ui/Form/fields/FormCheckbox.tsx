import { useId } from 'react';

import { useFieldContext } from '../context';
import { FormLabel } from '../common/FormLabel';
import { FormDescription } from '../common/FormDescription';
import { FormMessage } from '../common/FormMessage';
import { Checkbox, type CheckboxProps, type CheckedState } from '../../Checkbox';

export default function FormCheckbox({ label, description, ...props }: FormCheckboxProps) {
  const field = useFieldContext<CheckedState>();
  const inputId = useId();
  const descriptionId = useId();
  const messageId = useId();
  const hasErrors = field.state.meta.errors.length > 0;

  const getAriaDescribedBy = () => {
    const ids: string[] = [];

    if (description) {
      ids.push(descriptionId);
    }

    if (hasErrors) {
      ids.push(messageId);
    }

    return ids.join(' ');
  }

  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        <Checkbox
          id={inputId}
          checked={field.state.value}
          onCheckedChange={checked => field.handleChange(checked)}
          aria-invalid={hasErrors}
          aria-describedby={getAriaDescribedBy()}
          {...props}
        />

        <FormLabel htmlFor={inputId} className="cursor-pointer">
          {label}
        </FormLabel>
      </div>

      {description && (
        <FormDescription id={descriptionId}>
          {description}
        </FormDescription>
      )}

      <FormMessage id={messageId} />
    </div>
  );
}

export interface FormCheckboxProps extends CheckboxProps {
  label: React.ReactNode;
  description?: React.ReactNode;
}
