import { useEffect, useRef, type DependencyList } from 'react';

export const useWindowEvent = <K extends keyof WindowEventMap>(
  type: K,
  listener: (event: WindowEventMap[K]) => void,
  dependencies: DependencyList = [],
) => {
  const listenerRef = useRef(listener);
  listenerRef.current = listener;

  useEffect(() => {
    window.addEventListener(type, listenerRef.current);

    return () => {
      window.removeEventListener(type, listenerRef.current);
    };
  }, [type, ...dependencies]);
}
