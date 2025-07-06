import { sum } from 'radash';
import { Copy } from 'lucide-react';

import { Typography } from '~/components/ui/Typography';
import { Button } from '~/components/ui/Button';
import { copyToClipboard } from '~/utils';

import { PotionList } from './PotionList';
import type { CharacterType } from '../character.model';
import { stringifyPotions } from '../utils';

export const PotionSubSection = ({ label, characters }: PotionSubSectionProps) => {
  const totalPotions = sum(characters.flatMap(c => Object.values(c.potionsRemaining)));

  const onCopy = () => {
    copyToClipboard(stringifyPotions({
      life: sum(characters, c => c.potionsRemaining.life),
      mana: sum(characters, c => c.potionsRemaining.mana),
      attack: sum(characters, c => c.potionsRemaining.attack),
      defense: sum(characters, c => c.potionsRemaining.defense),
      speed: sum(characters, c => c.potionsRemaining.speed),
      dexterity: sum(characters, c => c.potionsRemaining.dexterity),
      vitality: sum(characters, c => c.potionsRemaining.vitality),
      wisdom: sum(characters, c => c.potionsRemaining.wisdom),
    }));
  }

  return (
    <>
      <Typography.H5 className="flex justify-between items-center pb-2">
        <span>{label} ({totalPotions})</span>

        <Button
          icon
          variant="flat"
          onClick={onCopy}
        >
          <Copy />
        </Button>
      </Typography.H5>

      <PotionList characters={characters} />
    </>
  );
}

export interface PotionSubSectionProps {
  label: string;
  characters: CharacterType[];
}
