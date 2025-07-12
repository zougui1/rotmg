import { Progress } from '~/components/ui/Progress';
import { cn } from '~/utils';

export const HoardProgressBar = ({ value }: HoardProgressBarProps) => {
  return (
    <div className="flex items-center">
      <Progress value={value} />

      <span className={cn('w-[8ch] text-right', value >= 100 && 'text-yellow-400')}>
        {Number(value.toFixed(2))}%
      </span>
    </div>
  );
}

export interface HoardProgressBarProps {
  value: number;
}
