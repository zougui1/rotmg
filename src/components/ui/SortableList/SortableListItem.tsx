import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '~/utils';

export const SortableListItem = ({ id, children }: SortableListItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    active,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Transform.toString(transform),
      }}
      className={cn(active?.id === id && 'relative z-10')}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}

export interface SortableListItemProps {
  id: string;
  children?: React.ReactNode;
}
