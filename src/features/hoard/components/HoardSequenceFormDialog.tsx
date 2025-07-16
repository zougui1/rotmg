'use client';

import { useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { produce } from 'immer';

import { Button } from '~/components/ui/Button';
import { Dialog } from '~/components/ui/Dialog';
import { Tabs } from '~/components/ui/Tabs';
import { useDialog } from '~/hooks';
import { cn } from '~/utils';

import { HoardSequence, type HoardSequenceProps } from './HoardSequence';
import { ItemFormDialog, type ItemData } from './ItemFormDialog';
import type { FullHoardSequenceObject, FullHoardSlot } from '../hoardSequence.model';
import { type HoardSequenceType } from '../enums';

const sequenceTypeEnum: Record<HoardSequenceType, HoardSequenceType> = {
  Repeat: 'Repeat',
  Numbered: 'Numbered',
  Infinite: 'Infinite',
};

const emptySequence: HoardSequenceProps['sequence'] = {
  id: '',
  type: sequenceTypeEnum.Repeat,
  slots: [],
};

const SequenceTab = ({ value, sequence, onSubmit }: SequenceTabProps) => {
  const clickedRef = useRef<FullHoardSlot | undefined>(undefined);
  const itemDialog = useDialog();

  const onSlotClick: HoardSequenceProps['onSlotClick'] = slot => {
    clickedRef.current = slot;
    itemDialog.open();
  }

  return (
    <Tabs.Content value={value}>
      <div className="flex flex-col bg-[#252223] p-[var(--vault-slot-gap)] gap-y-[var(--vault-slot-gap)]">
        <HoardSequence
          sequenceId={sequence?.id ?? ''}
          sequence={sequence}
          onSlotClick={onSlotClick}
        />
      </div>

      <itemDialog.Outlet>
        <ItemFormDialog
          title="Add item"
          description="Add item"
          onSubmit={item => onSubmit(item, clickedRef.current)}
          defaultValues={clickedRef.current?.item}
        />
      </itemDialog.Outlet>
    </Tabs.Content>
  );
}

export interface SequenceTabProps {
  value: HoardSequenceType;
  sequence: HoardSequenceProps['sequence'];
  onSubmit: (item: ItemData, slot?: FullHoardSequenceObject['slots'][number]) => void;
}

export const HoardSequenceFormDialog = ({
  children,
  title,
  description,
  defaultValues,
  onSubmit,
  ...props
}: HoardSequenceFormDialogProps) => {
  const [sequence, setSequence] = useState<HoardSequenceProps['sequence'] | undefined>();
  const sequenceValue = sequence ?? {
    ...emptySequence,
    ...defaultValues,
  };

  const submitRepeatItem: SequenceTabProps['onSubmit'] = (item) => {
    const itemId = nanoid();
    const getSlot = () => ({
      id: nanoid(),
      count: 0,
      item: { ...item, id: itemId },
    });

    setSequence({
      id: nanoid(),
      type: 'Repeat',
      slots: [
        getSlot(), getSlot(), getSlot(), getSlot(),
        getSlot(), getSlot(), getSlot(), getSlot(),
      ],
    });
  }

  const submitUniqueItem = (type: HoardSequenceType): SequenceTabProps['onSubmit'] => (item, slot) => {
    const emptySequence = {
      id: nanoid(),
      type,
      slots: [],
    } satisfies Omit<HoardSequenceProps['sequence'], 'position'>;

    setSequence(prevSequence => produce(prevSequence ?? emptySequence, draft => {
      const foundSlot = slot ? draft.slots.find(s => s?.id === slot.id) : undefined;

      if (foundSlot) {
        foundSlot.item = {
          ...item,
          id: nanoid(),
        };
        return;
      }

      // the first slot of new rows is undefined
      if (!draft.slots.at(-1)) {
        draft.slots.pop();
      }

      draft.slots.push({
        id: nanoid(),
        count: 0,
        item: {
          ...item,
          id: nanoid(),
        },
      });

      if (draft.slots.length % 8 === 0) {
        draft.slots.push(undefined);
      }
    }));
  }

  const handleSubmit = () => {
    if (sequence) {
      onSubmit?.({
        ...sequence,
        slots: sequence.slots.filter((v) => !!v),
      });
    }
  }

  return (
    <Dialog.Root {...props}>
      {children && (
        <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      )}

      <Dialog.Content className="!max-w-none w-auto" onFocus={() => console.log('dialog focus')}>
        <Dialog.Header>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
        </Dialog.Header>

        <Tabs.Root
          defaultValue={defaultValues?.type}
          className={cn(
            '[--vault-slot-width:calc(var(--spacing)*16)]',
            'md:[--vault-slot-width:calc(var(--spacing)*20)]',
            'lg:[--vault-slot-width:100px]',
          )}
          onValueChange={() => setSequence(undefined)}
        >
          <Tabs.List>
            <Tabs.Trigger value={sequenceTypeEnum.Repeat}>
              {sequenceTypeEnum.Repeat}
            </Tabs.Trigger>
            <Tabs.Trigger value={sequenceTypeEnum.Numbered}>
              {sequenceTypeEnum.Numbered}
            </Tabs.Trigger>
            <Tabs.Trigger value={sequenceTypeEnum.Infinite}>
              {sequenceTypeEnum.Infinite}
            </Tabs.Trigger>
          </Tabs.List>

          <SequenceTab
            value={sequenceTypeEnum.Repeat}
            sequence={sequenceValue}
            onSubmit={submitRepeatItem}
          />
          <SequenceTab
            value={sequenceTypeEnum.Numbered}
            sequence={sequenceValue}
            onSubmit={submitUniqueItem('Numbered')}
          />
          <SequenceTab
            value={sequenceTypeEnum.Infinite}
            sequence={sequenceValue}
            onSubmit={submitUniqueItem('Infinite')}
          />
        </Tabs.Root>

        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="outline">
              Cancel
            </Button>
          </Dialog.Close>

          <Dialog.Close asChild>
            <Button disabled={!sequence} onClick={handleSubmit} autoFocus>
              Submit
            </Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export interface HoardSequenceFormDialogProps extends Dialog.RootProps {
  title: string;
  description: string;
  defaultValues?: Partial<Omit<FullHoardSequenceObject, 'section' | 'position'>>;
  onSubmit?: (data: Omit<FullHoardSequenceObject, 'section' | 'position'>) => void;
}
