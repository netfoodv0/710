import React from 'react';
import { cn } from '../../utils';

interface MobileSkeletonProps {
  className?: string;
  variant?: 'card' | 'text' | 'avatar' | 'button';
  lines?: number;
}

export function MobileSkeleton({ 
  className, 
  variant = 'card', 
  lines = 1 
}: MobileSkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  
  const variantClasses = {
    card: 'h-32 w-full',
    text: 'h-4 w-full',
    avatar: 'h-12 w-12 rounded-full',
    button: 'h-12 w-24 rounded-xl'
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)}>
        {[...Array(lines)].map((_, i) => (
          <div
            key={i}
            className={cn(baseClasses, variantClasses.text, {
              'w-3/4': i === lines - 1 && lines > 1
            })}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)} />
  );
}

interface MobileSkeletonCardProps {
  className?: string;
  showAvatar?: boolean;
  showActions?: boolean;
}

export function MobileSkeletonCard({ 
  className, 
  showAvatar = false, 
  showActions = false 
}: MobileSkeletonCardProps) {
  return (
    <div className={cn('bg-white rounded-xl p-4 space-y-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showAvatar && <MobileSkeleton variant="avatar" />}
          <div className="space-y-2">
            <MobileSkeleton variant="text" />
            <MobileSkeleton variant="text" lines={1} className="w-1/2" />
          </div>
        </div>
        <MobileSkeleton variant="button" className="w-20" />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <MobileSkeleton variant="text" />
        <MobileSkeleton variant="text" className="w-3/4" />
        <MobileSkeleton variant="text" className="w-1/2" />
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex gap-2 pt-2 border-t border-gray-200">
          <MobileSkeleton variant="button" />
          <MobileSkeleton variant="button" />
        </div>
      )}
    </div>
  );
}

export function MobileSkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <MobileSkeletonCard key={i} showAvatar showActions />
      ))}
    </div>
  );
} 