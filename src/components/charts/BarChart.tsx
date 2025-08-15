import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface BarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string;
      borderColor?: string;
      borderWidth?: number;
    }[];
  };
  options?: any;
  className?: string;
}

export const BarChart: React.FC<BarChartProps> = ({ data, options = {}, className = '' }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destruir gráfico anterior se existir
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const config = {
          type: 'bar' as const,
          data: data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              }
            },
            ...options
          },
        };

        chartInstance.current = new Chart(ctx, config);
      }
    }

    // Cleanup ao desmontar o componente
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, options]);

  return (
    <div className={`w-full h-full ${className}`}>
      <canvas ref={chartRef} />
    </div>
  );
};
