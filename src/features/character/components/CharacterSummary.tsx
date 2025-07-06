'use client';

import Image from 'next/image';
import { Copy, Trash2 } from 'lucide-react';
import { type PartialDeep } from 'type-fest';

import { Checkbox } from '~/components/ui/Checkbox';
import { Button } from '~/components/ui/Button';
import { api } from '~/trpc/react';
import { copyToClipboard } from '~/utils';
import { characterStats } from '~/data';

import { Seasonal } from './Seasonal';
import { StatInput } from './StatInput';
import { stringifyPotions } from '../utils';
import { characterStore } from '../character.store';
import type { CharacterType } from '../character.model';

export const CharacterSummary = ({ character }: CharacterSummaryProps) => {
  const deletion = api.character.delete.useMutation({
    onMutate: () => characterStore.trigger.markDeleted(character),
    onSuccess: () => characterStore.trigger.delete(character),
    onError: () => characterStore.trigger.markUndelete(character),
  });
  const update = api.character.update.useMutation();

  const updateCharacter = async (data: PartialDeep<CharacterType>) => {
    const newCharacter = {
      ...character,
      ...data,
      potionsRemaining: {
        ...character.potionsRemaining,
        ...data?.potionsRemaining,
      },
      id: character.id,
    };

    const isMaxed = Object.values(newCharacter.potionsRemaining).every(v => v <= 0);

    if (isMaxed) {
      return deletion.mutate(character);
    }

    try {
      characterStore.trigger.update({ character: newCharacter });
      await update.mutateAsync(newCharacter);
    } catch {
      characterStore.trigger.update({ character });
    }
  }

  if (deletion.isPending) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 bg-card text-card-foreground p-2 max-w-[530px]">
      <div className="flex gap-3">
        <div className="flex flex-col items-center gap-2">
          <Checkbox />

          <Button
            icon
            size="sm"
            variant="flat"
            onClick={() => copyToClipboard(stringifyPotions(character.potionsRemaining))}
          >
            <Copy />
          </Button>

          <Button
            icon
            size="sm"
            variant="flat"
            className="text-destructive"
            onClick={() => deletion.mutate({ id: character.id })}
          >
            <Trash2 />
          </Button>
        </div>

        <div className="w-64 flex flex-col justify-center items-center">
          <Seasonal
            seasonal={character.isSeasonal}
            className="mb-2"
            onClick={() => updateCharacter({ isSeasonal: !character.isSeasonal })}
          />

          <Image
            src={`/images/skins/${character.class}.png`}
            alt="Avatar"
            width={36}
            height={36}
          />

          <span className="text-md text-center font-bold text-shadow-contract">
            {character.class}
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {characterStats.list.map(statName => (
            <StatInput
              key={statName}
              statName={statName}
              value={character.potionsRemaining[characterStats.lowerCaseMap[statName]]}
              onValueChange={value => updateCharacter({
                potionsRemaining: {
                  [characterStats.lowerCaseMap[statName]]: value,
                },
              })}
            />
          ))}
        </div>
      </div>

      {deletion.isError && (
        <div className="text-destructive">
          Could not delete this character
        </div>
      )}
    </div>
  );
}

export interface CharacterSummaryProps {
  character: CharacterType;
}
