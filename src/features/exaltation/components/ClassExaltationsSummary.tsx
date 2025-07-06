import Image from 'next/image';

import { cn } from '~/utils';
import { characterStats, type CharacterStat } from '~/data';

import { getExaltationLevel } from '../utils';
import type { ExaltationType } from '../exaltation.model';
import { maxExaltationLevel } from '../data';

const ExaltationStat = ({
  statName,
  points,
}: {
  statName: CharacterStat;
  points: number;
}) => {
  const level = getExaltationLevel(points);

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center">
      <Image
        src={`/images/items/potions/small/${statName}.png`}
        alt={statName}
        width={24}
        height={24}
      />
      <span className={cn(level === maxExaltationLevel && 'text-yellow-300')}>
        +{level}
      </span>
    </div>
  );
}

export const ClassExaltationsSummary = ({ exaltation, className }: ClassExaltationsSummaryProps) => {
  const isFullyExalted = characterStats.list.every(statName => {
    return getExaltationLevel(exaltation[characterStats.lowerCaseMap[statName]]) >= maxExaltationLevel;
  });

  return (
    <div
      className={cn(
        'w-full flex-col min-[500px]:flex-row flex min-[500px]:items-center',
        isFullyExalted && 'opacity-60',
        className,
      )}
    >
      <div className="flex items-center gap-2 min-w-[15ch]">
        <Image
          src={`/images/skins/${exaltation.class}.png`}
          alt={exaltation.class}
          width={24}
          height={24}
        />
        {exaltation.class}
      </div>

      <div className="flex gap-2">
        {characterStats.list.map(characterStat => (
          <ExaltationStat
            key={characterStat}
            statName={characterStat}
            points={exaltation[characterStats.lowerCaseMap[characterStat]]}
          />
        ))}
      </div>
    </div>
  );
}

export interface ClassExaltationsSummaryProps {
  exaltation: ExaltationType;
  className?: string;
}
