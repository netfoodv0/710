import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface LoadingScreenProps {
  isVisible: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isVisible }) => {
  const [shouldShow, setShouldShow] = useState(false);
  const [showTimer, setShowTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isVisible) {
      // Mostra o loading apenas se ficar visível por mais de 150ms
      const timer = setTimeout(() => {
        setShouldShow(true);
      }, 150);

      setShowTimer(timer);
    } else {
      // Esconde imediatamente quando não está mais visível
      setShouldShow(false);
      if (showTimer) {
        clearTimeout(showTimer);
        setShowTimer(null);
      }
    }

    return () => {
      if (showTimer) {
        clearTimeout(showTimer);
      }
    };
  }, [isVisible]);

  if (!shouldShow) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <Box sx={{ display: 'flex' }}>
        <CircularProgress size={100} sx={{ color: '#9333ea' }} />
      </Box>
    </div>
  );
};
