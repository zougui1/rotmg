'use client';

import { useState, useCallback } from 'react';
import { nanoid } from 'nanoid';

export const useRipple = () => {
  const [ripples, setRipples] = useState<RippleType[]>([]);

  const onClick = useCallback((event: React.MouseEvent) => {
    const trigger = event.currentTarget;
    const size = Math.max(trigger.clientWidth, trigger.clientHeight);
    const rect = trigger.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setRipples(prevRipples => [
      ...prevRipples,
      {
        key: nanoid(),
        size,
        x: x - size / 2,
        y: y - size / 2,
      },
    ]);
  }, []);

  const onClear = useCallback((key: string) => {
    return;
    setRipples(prevRipples => {
      return prevRipples.filter(ripple => ripple.key !== key);
    });
  }, []);

  return {
    ripples,
    onClick,
    onClear,
  };
}

export type RippleType = {
  key: string;
  x: number;
  y: number;
  size: number;
};
