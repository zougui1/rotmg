import Image from 'next/image';
import { sum } from 'radash';

import { characterStats } from '~/data';
import { cn } from '~/utils';

import type { CharacterType } from '../character.model'

export const PotionList = ({ characters }: PotionListProps) => {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {characterStats.list.map(statName => {
        const potionCount = sum(characters, c => c.potionsRemaining[characterStats.lowerCaseMap[statName]]);

        return (
          <div
            key={statName}
            className={cn(
              'flex items-center gap-2',
              potionCount <= 0 && 'opacity-50',
            )}
          >
            <Image
              src={`/images/items/potions/small/${statName}.png`}
              alt={statName}
              width={32}
              height={32}
            />

            {potionCount}
          </div>
        );
      })}
    </div>
  );
}

export interface PotionListProps {
  characters: CharacterType[];
}
