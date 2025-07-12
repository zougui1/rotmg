import { cn } from '~/utils';

import { HoardProgressBar } from './HoardProgressBar';

export const HoardProgress = ({ label, value, total }: HoardProgressProps) => {
  const progress = total === 0 ? 0 : Math.min(100, value * 100 / total);

  return (
    <div>
      <span>{label}: </span>

      <span className={cn(value >= total && 'text-yellow-400')}>
        {value}/{total}
      </span>

      <HoardProgressBar value={progress} />
    </div>
  );
}

export interface HoardProgressProps {
  label: string;
  value: number;
  total: number;
}
