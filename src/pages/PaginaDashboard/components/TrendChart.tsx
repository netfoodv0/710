import React, { useEffect, useRef, useState } from 'react';
import { Area, AreaChart } from 'recharts';

interface TrendChartProps {
  data: number[];
  color?: string;
  height?: number;
}

/**
 * Mini gráfico de tendência tipo wave para cards de estatísticas
 * Mostra se a métrica está aumentando ou diminuindo
 */
export const TrendChart: React.FC<TrendChartProps> = ({
  data,
  color = '#6366f1',
  height = 50
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(100);
  const gradientId = useRef(`gradient-${color}-${Date.now()}`);

  // Atualizar largura quando o container mudar de tamanho
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const computedWidth = containerRef.current.offsetWidth;
        setWidth(computedWidth);
      }
    };

    // Delay para garantir que o container esteja renderizado
    const timer = setTimeout(updateWidth, 10);
    window.addEventListener('resize', updateWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  // Se não houver dados, retorna um gráfico vazio
  if (!data || data.length === 0) {
    data = [0, 0, 0, 0, 0];
  }

  // Normalizar dados para o range 0-100
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;
  
  const normalizedData = data.map((value, index) => {
    // Calcular valor normalizado
    const normalizedValue = ((value - minValue) / range) * 100;
    // Não aplicar mínimo para manter a variação natural
    return {
      name: `p${index}`,
      value: normalizedValue
    };
  });
  
  // Determinar cor baseada na tendência
  // Se todos os valores forem iguais, usar azul (linha reta)
  const allSame = data.every(val => val === data[0]);
  const trendColor = allSame ? '#3b82f6' : (data[data.length - 1] > data[0] ? '#3b82f6' : '#ef4444');

  return (
    <div ref={containerRef} className="w-full" style={{ height: `${height}px`, overflow: 'hidden' }}>
      <AreaChart
        data={normalizedData}
        width={width > 0 ? width : 100}
        height={height}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <defs>
          <linearGradient id={gradientId.current} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={trendColor} stopOpacity={0.3} />
            <stop offset="95%" stopColor={trendColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={trendColor}
          strokeWidth={2}
          fill={`url(#${gradientId.current})`}
        />
      </AreaChart>
    </div>
  );
};
