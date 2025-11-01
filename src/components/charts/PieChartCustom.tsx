import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PieChartCustomProps {
  className?: string;
}

export const PieChartCustom: React.FC<PieChartCustomProps> = ({ className = '' }) => {
  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];
  
  const data = [
    { name: 'Direct', value: 0 },
    { name: 'Organic Search', value: 0 },
    { name: 'Paid Search', value: 0 },
    { name: 'Referral', value: 0 },
    { name: 'Social', value: 0 }
  ];

  // Verifica se há algum dado maior que zero
  const hasData = data.some(item => item.value > 0);

  // Se não há dados, cria um item "Indefinido"
  const displayData = hasData ? data : [{ name: 'Indefinido', value: 100 }];

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            data={displayData}
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
              const sliceColor = hasData ? COLORS[index % COLORS.length] : '#9CA3AF';
              
              return (
                <g>
                  {/* Linha com dobra */}
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
                    {`${name} - ${(percent * 100).toFixed(0)}%`}
                  </text>
                </g>
              );
            }}
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
            startAngle={0}
          >
            {displayData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={hasData ? COLORS[index % COLORS.length] : '#9CA3AF'}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => `${value}%`}
            labelFormatter={(label) => label}
          />
          <Legend 
            iconSize={10}
            iconType="circle"
            wrapperStyle={{
              fontSize: '12px',
              paddingTop: '10px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

