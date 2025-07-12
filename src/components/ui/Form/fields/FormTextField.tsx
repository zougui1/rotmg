import { useId } from 'react';

import { useFieldContext } from '../context';
import { FormLabel } from '../common/FormLabel';
import { FormDescription } from '../common/FormDescription';
import { FormMessage } from '../common/FormMessage';
import { Input } from '../../Input';

export default function FormTextField({ label, description }: FormTextFieldProps) {
  const field = useFieldContext<string>();
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
      <FormLabel htmlFor={inputId}>{label}</FormLabel>

      <Input
        id={inputId}
        value={field.state.value}
        onChange={e => field.handleChange(e.target.value)}
        aria-invalid={hasErrors}
        aria-describedby={getAriaDescribedBy()}
      />

      {description && (
        <FormDescription id={descriptionId}>
          {description}
        </FormDescription>
      )}

      <FormMessage id={messageId} />
    </div>
  );
}

export interface FormTextFieldProps {
  label: React.ReactNode;
  description?: React.ReactNode;
}
