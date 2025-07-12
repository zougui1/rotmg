import { sum, unique } from 'radash';

import type { FullSection } from '../hoard.router';
import type { ItemType } from '../item.model';
import type { FullHoardSlot } from '../hoardSequence.model';

const getItemScore = (item: ItemType) => {
  return item.enchantable ? 5 : 1;
}

const getSlotCompletionScore = (slot: FullHoardSlot) => {
  if (slot.count <= 0) {
    return 0;
  }

  return (slot.enchantSlots ?? 0) + 1;
}

export const getHoardStats = (sections: Omit<FullSection, '_id'>[]) => {
  const sequences = sections.flatMap(s => s.sequences);

  const allSlots = sequences.flatMap(s => s.slots);
  const ownedSlots = allSlots.filter(s => s.count);

  const allUniqueItems = unique(allSlots, s => s.item.id);
  const ownedUniqueItems = unique(ownedSlots, s => s.item.id);

  const allEnchantableItems = allSlots.filter(s => s.item.enchantable);
  const ownedDivineItems = ownedSlots.filter(s => s.enchantSlots && s.enchantSlots >= 4);

  const allShinies = allSlots.filter(s => s.item.shiny);
  const ownedShinies = ownedSlots.filter(s => s.item.shiny);

  const uniqueAllShinies = unique(allShinies, s => s.item.id);
  const uniqueOwnedShinies = unique(ownedShinies, s => s.item.id);

  const totalScore = sum(allSlots, s => getItemScore(s.item));
  const ownedScore = sum(ownedSlots, getSlotCompletionScore);

  return {
    completion: totalScore ? Math.min(100, ownedScore * 100 / totalScore) : 0,
    items: {
      total: allSlots.length,
      owned: ownedSlots.length,
    },
    uniqueItems: {
      total: allUniqueItems.length,
      owned: ownedUniqueItems.length,
    },
    divineItems: {
      total: allEnchantableItems.length,
      owned: ownedDivineItems.length,
    },
    shinies: {
      total: allShinies.length,
      owned: ownedShinies.length,
    },
    uniqueShinies: {
      total: uniqueAllShinies.length,
      owned: uniqueOwnedShinies.length,
    },
  };
}
