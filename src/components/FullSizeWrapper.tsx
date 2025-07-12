'use client';

import React, { useRef, useState, useEffect } from 'react';

export const FullSizeWrapper = ({ render, defaultHeight }: FullSizeWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(defaultHeight ?? null);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    setHeight(element.clientHeight);

    const resizeObserver = new ResizeObserver(() => {
      setHeight(element.clientHeight);
    });

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full overflow-hidden">
      {height !== null ? render({ height }) : null}
    </div>
  );
}

export interface FullSizeWrapperProps {
  render: (size: { height: number; }) => React.ReactNode;
  defaultHeight?: number;
}
