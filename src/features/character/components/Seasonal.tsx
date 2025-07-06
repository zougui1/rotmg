import { Button, type ButtonProps } from '~/components/ui/Button';
import { cn } from '~/utils';

//rgb(0, 0, 0) 0px 0px 1px, rgb(0, 0, 0) 0px 0px 2px, rgb(0, 0, 0) 0px 0px 5px

export const Seasonal = ({ seasonal, className, ...props }: SeasonalProps) => {
  return (
    <Button
      className={cn(
        'px-2 py-px rounded-full text-white text-sm font-bold h-auto uppercase',
        'text-shadow-contract',
        seasonal ? 'bg-cyan-400 hover:bg-cyan-400' : 'bg-gray-400 hover:bg-gray-400',
        className,
      )}
      {...props}
    >
      {seasonal ? 'Seasonal' : 'Non-seasonal'}
    </Button>
  );
}

export interface SeasonalProps extends ButtonProps {
  seasonal: boolean;
}
