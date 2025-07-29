import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface DataPoint {
  name: string;
  value: number;
  color: string;
}

interface GraficoPizzaProps {
  title?: string;
  data: DataPoint[];
  className?: string;
}

const COLORS = ['#10B981', '#F59E0B', '#3B82F6', '#8B5CF6', '#EF4444', '#06B6D4'];

export const GraficoPizza: React.FC<GraficoPizzaProps> = ({ 
  title = "Vendas por Departamento", 
  data, 
  className = ''
}) => {
  if (!data || data.length === 0) {
    return (
      <div className={`bg-white border border-slate-200 rounded-lg p-4 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="flex items-center justify-center h-48 text-gray-500">
          Nenhum dado disponível
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-slate-200 rounded-lg p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
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
              const isTop = Math.sin(-midAngle * RADIAN) <= 0;
              
              // Pega a cor da fatia correspondente
              const sliceColor = data[index]?.color || COLORS[index % COLORS.length];
              
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
                    {`${name}: ${(percent * 100).toFixed(1)}%`}
                  </text>
                </g>
              );
            }}
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
            startAngle={-90}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value}`, 'Valor']}
            labelFormatter={(label) => `${label}`}
          />
          <Legend 
            iconSize={8}
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