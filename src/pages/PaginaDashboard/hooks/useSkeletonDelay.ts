import { useState, useEffect } from 'react';

interface UseSkeletonDelayProps {
  delay?: number;
  enabled?: boolean;
}

export const useSkeletonDelay = ({ 
  delay = 1000, 
  enabled = true 
}: UseSkeletonDelayProps = {}) => {
  const [showSkeleton, setShowSkeleton] = useState(enabled);

  useEffect(() => {
    if (!enabled) {
      setShowSkeleton(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, enabled]);

  return showSkeleton;
};

