import React from 'react';
import { cn } from '../../utils';

interface MobileSkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'list' | 'dashboard';
  lines?: number;
  height?: string;
}

export function MobileSkeleton({ 
  className, 
  variant = 'card', 
  lines = 3,
  height = 'h-4'
}: MobileSkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  
  const variants = {
    text: (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              baseClasses,
              height,
              i === lines - 1 ? 'w-3/4' : 'w-full'
            )}
          />
        ))}
      </div>
    ),
    
    card: (
      <div className={cn('p-4 space-y-3', className)}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-2xl animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-4/5 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
        </div>
      </div>
    ),
    
    list: (
      <div className={cn('space-y-3', className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
            </div>
            <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse" />
          </div>
        ))}
      </div>
    ),
    
    dashboard: (
      <div className={cn('space-y-4', className)}>
        {/* Header */}
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
        </div>
        
        {/* Metrics */}
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-gray-200 rounded-2xl animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Quick Actions */}
        <div className="p-4 bg-white rounded-2xl shadow-sm">
          <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse mb-4" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-12 bg-gray-200 rounded-xl animate-pulse" />
            <div className="h-12 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>
        
        {/* Recent Items */}
        <div className="p-4 bg-white rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-24 animate-pulse" />
                </div>
                <div className="text-right space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                  <div className="h-5 bg-gray-200 rounded w-16 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  };

  return variants[variant];
}

// Specialized skeleton components
export function MobileCardSkeleton({ className }: { className?: string }) {
  return <MobileSkeleton variant="card" className={className} />;
}

export function MobileListSkeleton({ className }: { className?: string }) {
  return <MobileSkeleton variant="list" className={className} />;
}

export function MobileDashboardSkeleton({ className }: { className?: string }) {
  return <MobileSkeleton variant="dashboard" className={className} />;
}

export function MobileTextSkeleton({ 
  lines = 3, 
  className 
}: { 
  lines?: number; 
  className?: string 
}) {
  return <MobileSkeleton variant="text" lines={lines} className={className} />;
} 