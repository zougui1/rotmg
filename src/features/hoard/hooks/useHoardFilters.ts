'use client';

import { useQueryState, parseAsBoolean, parseAsStringEnum } from 'nuqs';
import { useMemo } from 'react';

const useQueryEnum = <T extends string>(
  key: string,
  validValues: T[],
  defaultValue: T,
) => {
  const [value, setValue] = useQueryState(
    key,
    parseAsStringEnum(validValues).withDefault(defaultValue),
  );

  return {
    value,
    setValue,
    setUnknown: (newValue: string) => {
      if (validValues.includes(newValue as T)) {
        return setValue(newValue as T);
      }
    },
  };
}

export const useHoardFilters = () => {
  const [search, setSearch] = useQueryState(
    'search',
    { defaultValue: '' },
  );
  const rowProgress = useQueryEnum(
    'rowProgress',
    ['all', 'complete', 'incomplete'],
    'all',
  );
  const tier = useQueryEnum('tier', ['all', 'UT', 'ST'], 'all');
  const [shiniesOnly, setShiniesOnly] = useQueryState(
    'shiniesOnly',
    parseAsBoolean.withDefault(false),
  );
  const [divinesOnly, setDivinesOnly] = useQueryState(
    'divinesOnly',
    parseAsBoolean.withDefault(false),
  );

  return useMemo(() => {
    return {
      isDefault: (
        search === '' &&
        rowProgress.value === 'all' &&
        tier.value === 'all' &&
        !shiniesOnly &&
        !divinesOnly
      ),
      rowProgress,
      tier,
      search: {
        value: search,
        setValue: setSearch,
      },
      shiniesOnly: {
        value: shiniesOnly,
        setValue: setShiniesOnly,
      },
      divinesOnly: {
        value: divinesOnly,
        setValue: setDivinesOnly,
      },
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    search,
    rowProgress.value,
    tier.value,
    shiniesOnly,
    divinesOnly,
  ]);
}
