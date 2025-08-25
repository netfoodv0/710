import React from 'react';
import { AvatarItem } from './AvatarItem';

interface Avatar {
  id: string;
  name: string;
  svg: string;
}

interface AvatarListProps {
  avatares: Avatar[];
  onSelect: (avatar: Avatar) => void;
}

export function AvatarList({ avatares, onSelect }: AvatarListProps) {
  return (
    <div className="grid grid-cols-3 gap-6 p-2">
      {avatares.map((avatar) => (
        <AvatarItem
          key={avatar.id}
          avatar={avatar}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
