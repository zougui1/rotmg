'use client';

import { useId } from 'react';

import { Input } from '~/components/ui/Input';
import { Label } from '~/components/ui/Label';
import { Typography } from '~/components/ui/Typography';
import { RadioGroup } from '~/components/ui/RadioGroup';
import { Switch } from '~/components/ui/Switch';

import { useHoardFilters } from '../hooks';

export const FiltersPanel = () => {
  const inputId = useId();
  const filters = useHoardFilters();

  return (
    <div className="space-y-4">
      <div>
        <Typography.H4 className="pb-2">Filters</Typography.H4>

        <div className="space-y-2">
          <Label htmlFor={inputId}>Search</Label>
          <Input
            id={inputId}
            value={filters.search.value}
            onChange={e => filters.search.setValue(e.currentTarget.value)}
          />
        </div>
      </div>

      <div>
        <div className="pb-2">Row completion</div>

        <RadioGroup.Root
          value={filters.rowProgress.value}
          onValueChange={filters.rowProgress.setUnknown}
        >
          <div className="flex items-center gap-2">
            <RadioGroup.Item id="row-progress-all" value="all" />
            <Label htmlFor="row-progress-all">All</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroup.Item id="row-progress-complete" value="complete" />
            <Label htmlFor="row-progress-complete">Complete</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroup.Item id="row-progress-incomplete" value="incomplete" />
            <Label htmlFor="row-progress-incomplete">Incomplete</Label>
          </div>
        </RadioGroup.Root>
      </div>

      <div>
        <div className="pb-2">Tier</div>

        <RadioGroup.Root
          value={filters.tier.value}
          onValueChange={filters.tier.setUnknown}
        >
          <div className="flex items-center gap-2">
            <RadioGroup.Item id="tier-all" value="all" />
            <Label htmlFor="tier-all">All</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroup.Item id="tier-ST" value="ST" />
            <Label htmlFor="tier-ST">ST</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroup.Item id="tier-UT" value="UT" />
            <Label htmlFor="tier-UT">UT</Label>
          </div>
        </RadioGroup.Root>
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="shiniesOnly"
          checked={filters.shiniesOnly.value}
          onCheckedChange={filters.shiniesOnly.setValue}
        />
        <Label htmlFor="shiniesOnly">Shinies only</Label>
      </div>
    </div>
  );
}
