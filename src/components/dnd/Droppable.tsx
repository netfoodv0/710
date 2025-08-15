import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DroppableProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function Droppable({ id, children, className = '' }: DroppableProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${isOver ? 'bg-blue-50 border-blue-300' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
