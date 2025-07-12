import Image from 'next/image';
import { nanoid } from 'nanoid';

import { gameClasses, type GameClass } from '~/data';
import { cn } from '~/utils';
import { api } from '~/trpc/react';
import { Button } from '~/components/ui/Button';

import type { CharacterType } from '../character.model'
import { characterStore } from '../character.store';

export const ClassList = ({ characters }: ClassListProps) => {
  const creation = api.character.create.useMutation();

  const classGroups = Object.groupBy(characters, c => c.class);

  const createCharacter = async (gameClass: GameClass) => {
    const id = nanoid();
    const character = {
      id,
      class: gameClass,
      isSeasonal: true,
      potionsRemaining: {
        life: 1,
        mana: 1,
        attack: 1,
        defense: 1,
        speed: 1,
        dexterity: 1,
        vitality: 1,
        wisdom: 1,
      },
    };

    characterStore.trigger.create({ character });

    try {
      await creation.mutateAsync(character);
    } catch {
      characterStore.trigger.delete({ id });
    }
  }

  return (
    <div className="flex flex-wrap gap-x-4">
      {gameClasses.map(gameClass => {
        const classCount = classGroups[gameClass]?.length ?? 0;

        return (
          <div
            key={gameClass}
            className={cn(
              'flex items-center gap-2 w-12',
              classCount <= 0 && 'opacity-50',
            )}
          >
            <Button
              icon
              variant="flat"
              onClick={() => createCharacter(gameClass)}
            >
              <Image
                src={`/images/skins/${gameClass}.png`}
                alt={gameClass}
                width={24}
                height={24}
              />
            </Button>

            {classCount}
          </div>
        );
      })}
    </div>
  );
}

export interface ClassListProps {
  characters: CharacterType[];
}
