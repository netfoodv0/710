import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface LoadingScreenProps {
  isVisible: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <Box sx={{ display: 'flex' }}>
        <CircularProgress size={100} sx={{ color: '#9333ea' }} /> {/* Cor roxa e tamanho 100x100 */}
      </Box>
    </div>
  );
};
