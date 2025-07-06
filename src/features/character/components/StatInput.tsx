import { useState, useRef } from 'react';
import Image from 'next/image';

import { NumberInput } from '~/components/ui/NumberInput';
import { Button } from '~/components/ui/Button';
import { cn } from '~/utils';
import type { CharacterStat } from '~/data';

export const StatInput = ({ statName, value: valueProps, onValueChange }: StatInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [auto, setAuto] = useState(true);

  const size = (auto && valueProps % 2 === 0) ? 'greater' : 'small';
  const value = size === 'greater' ? valueProps / 2 : valueProps;

  const handleValueChange = (newValue: number | null) => {
    newValue ??= 0;
    onValueChange?.(size === 'greater' ? newValue * 2 : newValue);
  }

  const onClick = () => {
    setAuto(b => !b);
    inputRef.current?.focus();
  }

  return (
    <NumberInput
      ref={inputRef}
      min={0}
      max={99}
      value={value}
      className={cn('w-[8ch] px-1', value <= 0 && 'opacity-50')}
      onValueChange={handleValueChange}
      onBlur={() => setAuto(true)}
      startContent={(
        <Button
          icon
          variant="flat"
          className="size-6 p-0"
          onClick={onClick}
          tabIndex={-1}
        >
          <Image
            src={`/images/items/potions/${size}/${statName}.png`}
            alt={statName}
            width={24}
            height={24}
          />
        </Button>
      )}
    />
  );
}

export interface StatInputProps {
  statName: CharacterStat;
  value: number;
  onValueChange?: (value: number) => void;
}
