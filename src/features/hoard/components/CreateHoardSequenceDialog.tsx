'use client';

import { api } from '~/trpc/react';

import { HoardSequenceFormDialog, type HoardSequenceFormDialogProps } from './HoardSequenceFormDialog';
import { hoardStore } from '../hoard.store';
import type { FullHoardSequenceObject } from '../hoardSequence.model';

export const CreateHoardSequenceDialog = ({ section, children , ...props}: CreateHoardSequenceDialogProps) => {
  const creation = api.hoard.createSequence.useMutation();

  const onSubmit = async (inputSequence: Omit<FullHoardSequenceObject, 'section' | 'position'>) => {
    const fullSection = hoardStore.getSnapshot().context.sections.find(s => s.id === section.id);
    const lastPosition = Math.max(0, ...fullSection?.sequences.map(s => s.position) ?? []);

    const sequence = {
      ...inputSequence,
      section,
      position: lastPosition + 1,
    };

    hoardStore.trigger.addSequence({ sequence });

    try {
      await creation.mutateAsync(sequence);
    } catch {
      hoardStore.trigger.deleteSequence({ sequence });
    }
  }

  return (
    <HoardSequenceFormDialog
      title="New Items"
      description="Add new items"
      onSubmit={onSubmit}
      {...props}
    >
      {children}
    </HoardSequenceFormDialog>
  );
}

export interface CreateHoardSequenceDialogProps extends Omit<HoardSequenceFormDialogProps, 'title' | 'description' | 'onSubmit'> {
  section: { id: string; };
  children?: React.ReactNode;
}
