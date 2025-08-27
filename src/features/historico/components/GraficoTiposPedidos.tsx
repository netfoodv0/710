import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface GraficoTiposPedidosProps {
  className?: string;
}

interface DataPoint {
  name: string;
  value: number;
  color: string;
}

// Cores para os tipos de pedidos - tons de roxo
const COLORS = ['#9333EA', '#A855F7', '#C084FC'];

export const GraficoTiposPedidos: React.FC<GraficoTiposPedidosProps> = ({ 
  className = '' 
}) => {
  // Dados mockados para demonstração - você pode integrar com dados reais depois
  const [tiposPedidos] = useState([
    { name: 'Delivery', value: 45, color: '#9333EA' },
    { name: 'Retirada', value: 35, color: '#A855F7' },
    { name: 'Balcão', value: 20, color: '#C084FC' }
  ]);

  // Converter dados para o formato do gráfico
  const dadosGrafico: DataPoint[] = tiposPedidos.map((item, index) => ({
    name: item.name,
    value: item.value,
    color: item.color || COLORS[index % COLORS.length]
  }));

  return (
    <div className={`w-full h-full ${className}`}>
      <ResponsiveContainer width="100%" height={200} className="min-h-[200px] sm:min-h-[245px]">
        <PieChart>
          <Pie
            data={dadosGrafico}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent, cx, cy, midAngle, innerRadius, outerRadius, index }) => {
              const RADIAN = Math.PI / 180;
              const radius = outerRadius + 20;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              
              // Determina a posição do label baseado no ângulo
              const isRight = Math.cos(-midAngle * RADIAN) >= 0;
              
              // Pega a cor da fatia correspondente
              const sliceColor = dadosGrafico[index]?.color || COLORS[index % COLORS.length];
              
              return (
                <g>
                  {/* Linha com dobra (perninha) */}
                  <path
                    d={`M ${cx + outerRadius * Math.cos(-midAngle * RADIAN)} ${cy + outerRadius * Math.sin(-midAngle * RADIAN)} 
                       L ${x} ${y} 
                       L ${x + (isRight ? 15 : -15)} ${y}`}
                    stroke={sliceColor}
                    strokeWidth={0.5}
                    fill="none"
                  />
                  {/* Texto do label */}
                  <text
                    x={x + (isRight ? 20 : -20)}
                    y={y}
                    textAnchor={isRight ? 'start' : 'end'}
                    dominantBaseline="middle"
                    className="text-xs fill-gray-700"
                  >
                    {`${name}: ${(percent * 100).toFixed(1)}%`}
                  </text>
                </g>
              );
            }}
            outerRadius={56}
            fill="#8884d8"
            dataKey="value"
            startAngle={-90}
          >
            {dadosGrafico.map((entry, index) => {
              const color = entry.color || COLORS[index % COLORS.length];
              return (
                <Cell 
                  key={`cell-${index}`} 
                  fill={color}
                />
              );
            })}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value}`, 'Quantidade']}
            labelFormatter={(label) => `${label}`}
          />
          <Legend 
            iconSize={8}
            iconType="circle"
            wrapperStyle={{
              fontSize: '12px',
              paddingTop: '0px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
