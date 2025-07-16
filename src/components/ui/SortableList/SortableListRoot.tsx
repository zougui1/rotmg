import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  type SortableContextProps,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export const SortableListRoot = ({ items, onDragEnd, children }: SortableListRootProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 200, distance: 10 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
}

export interface SortableListRootProps {
  items: SortableContextProps['items'];
  onDragEnd?: (event: DragEndEvent) => void;
  children?: React.ReactNode;
}
