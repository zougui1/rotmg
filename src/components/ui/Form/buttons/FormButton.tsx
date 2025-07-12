import { useFormContext } from '../context';
import { Button, type ButtonProps } from '../../Button';

export default function FormButton({ getDisabled, ...rest }: FormButtonProps) {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={state => getDisabled?.(state)}
      children={disabled => (
        <Button
          type="submit"
          disabled={disabled}
          {...rest}
        />
      )}
    />
  );
}

export interface FormButtonProps extends ButtonProps {
  getDisabled?: (state: ReturnType<typeof useFormContext>['state']) => boolean;
  children?: React.ReactNode;
}
