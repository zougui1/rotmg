'use client';

import { useState } from 'react';
import { z } from 'zod/v4';

import { Button } from '~/components/ui/Button';
import { Dialog } from '~/components/ui/Dialog';
import { useAppForm } from '~/components/ui/Form';

const formSchema = z.object({
  name: z.string().min(1),
  image: z.url(),
});

export const HoardSectionFormDialog = ({
  children,
  title,
  description,
  defaultValues,
  onSubmit,
  // eslint-disable-next-line @typescript-eslint/unbound-method
  onOpenChange,
  defaultOpen,
  ...props
}: HoardSectionFormDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const changeOpen = (value: boolean) => {
    (onOpenChange ?? setInternalOpen)(value);

    if (!value) {
      form.reset();
    }
  }

  const form = useAppForm({
    validators: {
      onSubmit: formSchema,
    },
    defaultValues: {
      name: '',
      image: '',
      ...defaultValues,
    },
    onSubmit: ({ value }) => {
      onSubmit?.(value);
      changeOpen(false);
    },
  });

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    await form.handleSubmit();
  }

  return (
    <Dialog.Root
      open={internalOpen}
      onOpenChange={changeOpen}
      {...props}
    >
      {children && (
        <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      )}

      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
        </Dialog.Header>

        <form className="space-y-4" onSubmit={submit}>
          <form.AppForm>
            <form.AppField
              name="name"
              children={field => <field.TextField label="Name" />}
            />

            <form.AppField
              name="image"
              children={field => <field.TextField label="Image" />}
            />

            <form.Button hidden />
          </form.AppForm>
        </form>

        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="outline">
              Cancel
            </Button>
          </Dialog.Close>

          <Button onClick={() => form.handleSubmit()}>
            Submit
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export interface HoardSectionFormDialogProps extends Dialog.RootProps {
  title: string;
  description: string;
  defaultValues?: Partial<z.infer<typeof formSchema>>;
  onSubmit?: (data: z.infer<typeof formSchema>) => void;
}
