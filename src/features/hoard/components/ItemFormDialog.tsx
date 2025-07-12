'use client';

import { useState } from 'react';
import { z } from 'zod/v4';

import { Button } from '~/components/ui/Button';
import { Dialog } from '~/components/ui/Dialog';
import { useAppForm } from '~/components/ui/Form';

const formSchema = z.object({
  name: z.string().min(1),
  image: z.url(),
  tier: z.string(),
  enchantable: z.boolean(),
  shiny: z.boolean(),
});

export type ItemData = z.infer<typeof formSchema>;

const reTier = /^T[1-9]+/i;

export const ItemFormDialog = ({
  children,
  title,
  description,
  defaultValues,
  onSubmit,
  // eslint-disable-next-line @typescript-eslint/unbound-method
  onOpenChange,
  defaultOpen,
  ...props
}: ItemFormDialogProps) => {
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
      tier: '',
      enchantable: false,
      shiny: false,
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

  const onTierChange = ({ value }: { value: string; }) => {
    form.setFieldValue('enchantable', Boolean(value));
  }

  const onNameChange = ({ value }: { value: string; }) => {
    if (reTier.test(value)) {
      const [tier = ''] = value.split(' ', 1);

      form.setFieldValue('tier', tier);
      onTierChange({ value });
    }
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
              listeners={{ onChange: onNameChange }}
            />

            <form.AppField
              name="image"
              children={field => <field.TextField label="Image" />}
            />

            <form.AppField
              name="tier"
              children={field => <field.TextField label="Tier" />}
              listeners={{ onChange: onTierChange }}
            />

            <form.AppField
              name="enchantable"
              children={field => <field.Checkbox label="Enchantable" />}
            />

            <form.AppField
              name="shiny"
              children={field => <field.Checkbox label="Shiny" />}
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

export interface ItemFormDialogProps extends Dialog.RootProps {
  title: string;
  description: string;
  defaultValues?: Partial<ItemData>;
  onSubmit?: (data: ItemData) => void;
}
