import { arrayMove } from '@dnd-kit/sortable';
import { sort } from 'radash';

export const movePositionedItem = <T extends { position: number; }>(list: T[], active: T, over: T) => {
  const sortedList = sort(list ?? [], item => item.position);
  return arrayMove(sortedList, active.position, over.position).map((item, index) => {
    return {
      ...item,
      position: index,
    };
  });
}
