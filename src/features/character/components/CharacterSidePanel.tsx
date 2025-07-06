'use client';

import { useSelector } from '@xstate/store/react';

import { Typography } from '~/components/ui/Typography';
import { Separator } from '~/components/ui/Separator';

import { ClassList } from './ClassList';
import { PotionSubSection } from './PotionSubSection';
import { characterStore } from '../character.store';

export const CharacterSidePanel = () => {
  const clientCharacters = useSelector(characterStore, state => state.context.characters);

  const characters = clientCharacters.filter(c => !c.deleted);
  const characterGroups = Object.groupBy(characters, c => c.isSeasonal ? 'seasonal' : 'nonSeasonal');

  return (
    <div className="w-[300px] bg-card text-card-foreground p-4">
      <Typography.H4 className="pb-2">
        Characters ({characters.length})
      </Typography.H4>

      <ClassList characters={characters} />

      <Separator className="my-4" />

      <Typography.H4 className="pb-2">Potions</Typography.H4>

      <PotionSubSection
        label="Total"
        characters={characters}
      />

      <PotionSubSection
        label="Seasonal"
        characters={characterGroups.seasonal ?? []}
      />

      <PotionSubSection
        label="Non-Seasonal"
        characters={characterGroups.nonSeasonal ?? []}
      />
    </div>
  );
}
