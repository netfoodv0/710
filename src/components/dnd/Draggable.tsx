import React from 'react';
import { useDraggable } from '@dnd-kit/core';

interface DraggableProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function Draggable({ id, children, className = '' }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    zIndex: isDragging ? 9999 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`cursor-grab active:cursor-grabbing ${className}`}
    >
      {children}
    </div>
  );
}
