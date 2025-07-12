'use client';

import { nanoid } from 'nanoid';

import { Button } from '~/components/ui/Button';
import { Separator } from '~/components/ui/Separator';
import { api } from '~/trpc/react';

import { HoardSectionFormDialog } from './HoardSectionFormDialog';
import { StatsPanel } from './StatsPanel';
import { FiltersPanel } from './FiltersPanel';
import { hoardStore } from '../hoard.store';

export const HoardSidePanel = () => {
  const creation = api.hoard.createSection.useMutation();

  const createSection = async ({ name, image }: { name: string; image: string; }) => {
    const id = nanoid();
    const lastPosition = Math.max(0, ...hoardStore.getSnapshot().context.sections.map(s => s.position));
    const section = {
      id,
      name,
      image,
      sequences: [],
      position: lastPosition + 1,
    };

    hoardStore.trigger.createSection({ section });

    try {
      await creation.mutateAsync(section);
    } catch {
      hoardStore.trigger.deleteSection({ id });
    }
  }

  return (
    <div className="w-[300px] flex flex-col gap-4 bg-card text-card-foreground p-4">
      <HoardSectionFormDialog
        title="New Section"
        description="Create a new section"
        onSubmit={createSection}
      >
        <Button>
          New Section
        </Button>
      </HoardSectionFormDialog>

      <Separator />
      <StatsPanel />
      <Separator />
      <FiltersPanel />
    </div>
  );
}
