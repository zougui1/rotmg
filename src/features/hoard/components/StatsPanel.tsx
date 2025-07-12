'use client';

import { useSelector } from '@xstate/store/react';

import { Typography } from '~/components/ui/Typography';
import { Progress } from '~/components/ui/Progress';

import { HoardProgress } from './HoardProgress';
import { hoardStore } from '../hoard.store';
import { getHoardStats } from '../utils';

export const StatsPanel = () => {
  const sections = useSelector(hoardStore, state => state.context.maps.sections);
  const stats = getHoardStats(Object.values(sections));

  return (
    <div className="space-y-0.5">
      <Typography.H4 className="pb-2">Hoard</Typography.H4>

      <div className="mb-2 space-y-1">
        <div>Completion: {Number(stats.completion.toFixed(2))}%</div>
        <Progress value={stats.completion} />
      </div>

      <HoardProgress
        label="Items"
        value={stats.items.owned}
        total={stats.items.total}
      />

      <HoardProgress
        label="Unique Items"
        value={stats.uniqueItems.owned}
        total={stats.uniqueItems.total}
      />

      <HoardProgress
        label="Divine Items"
        value={stats.divineItems.owned}
        total={stats.divineItems.total}
      />

      <HoardProgress
        label="Shinies"
        value={stats.shinies.owned}
        total={stats.shinies.total}
      />

      <HoardProgress
        label="Unique Shinies"
        value={stats.uniqueShinies.owned}
        total={stats.uniqueShinies.total}
      />
    </div>
  );
}
