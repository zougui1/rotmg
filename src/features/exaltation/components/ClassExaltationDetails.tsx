import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';

import { Button } from '~/components/ui/Button';
import { Progress } from '~/components/ui/Progress';
import { characterStats, type CharacterStat } from '~/data';
import { cn, getPercent } from '~/utils';

import { exaltationLevels, maxExaltationLevel } from '../data';
import { getExaltationLevel } from '../utils';
import type { ExaltationType } from '../exaltation.model';
import { Separator } from '~/components/ui/Separator';

const getPreviousLevelsPoints = (level: number) => {
  let points = 0;

  for (let i = 0; i <= level; i++) {
    points += (exaltationLevels as Record<number, number | undefined>)[i] ?? 0;
  }

  return points;
}

const ClassesExaltationDetailItem = ({
  statName,
  points,
  onIncrement,
}: {
  statName: CharacterStat;
  points: number;
  onIncrement?: (value: number) => void;
}) => {
  const level = getExaltationLevel(points);
  const isExalted = level >= maxExaltationLevel;
  const previousLevelsPoints = getPreviousLevelsPoints(level);
  const newLevelPoints = (level + 1) * 5;

  const currentLevelPoints = points - previousLevelsPoints;

  const progress = isExalted
    ? 100
    : getPercent(currentLevelPoints, newLevelPoints);

  const onClick = (action: 'increment' | 'decrement') => (event: React.MouseEvent) => {
    const by = event.shiftKey ? newLevelPoints - currentLevelPoints : 1;
    onIncrement?.(action === 'decrement' ? -by : by);
  }

  return (
    <div className="w-28 flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src={`/images/items/potions/small/${statName}.png`}
            alt={statName}
            width={24}
            height={24}
          />
          <span>
            {level}/{maxExaltationLevel}
          </span>
        </div>

        <div className="h-2/3">
          <Separator orientation="vertical" />
        </div>

        <div>
          <span>
            {isExalted ? 'EXALTED' : `${currentLevelPoints}/${newLevelPoints}`}
          </span>
        </div>
      </div>

      <Progress
        value={progress}
        classes={{ indicator: cn(isExalted && 'bg-green-500') }}
      />

      <div className="flex justify-center">
        <Button
          onClick={onClick('decrement')}
          icon
          variant="flat"
          className="size-6"
          disabled={points <= 0}
        >
          <Minus />
        </Button>

        <Button
          onClick={onClick('increment')}
          icon
          variant="flat"
          className="size-6"
          disabled={isExalted}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}

export const ClassExaltationDetails = ({ exaltation, onIncrement }: ClassExaltationDetailsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 px-4 pt-2">
      {characterStats.list.map(statName => (
        <ClassesExaltationDetailItem
          key={statName}
          statName={statName}
          points={exaltation[characterStats.lowerCaseMap[statName]]}
          onIncrement={value => onIncrement?.(statName, value)}
        />
      ))}
    </div>
  );
}

export interface ClassExaltationDetailsProps {
  exaltation: ExaltationType;
  onIncrement?: (statName: CharacterStat, value: number) => void;
}
