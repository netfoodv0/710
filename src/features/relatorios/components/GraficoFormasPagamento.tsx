import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { firebaseDashboardService } from '../../../services/firebaseDashboardService';
import { DadosFormaPagamento } from '../../../types/dashboard';
import { PeriodType } from '../../../components/filters/FiltroPeriodo';

interface GraficoFormasPagamentoProps {
  period: PeriodType;
  className?: string;
}

interface DataPoint {
  name: string;
  value: number;
  color: string;
}

const COLORS = ['#9333EA', '#A855F7', '#C084FC', '#D8B4FE', '#E9D5FF', '#F3E8FF'];

export const GraficoFormasPagamento: React.FC<GraficoFormasPagamentoProps> = ({ 
  period,
  className = '' 
}) => {
  const [formasPagamento, setFormasPagamento] = useState<DadosFormaPagamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        setError(null);
        const dados = await firebaseDashboardService.calcularFormasPagamento();
        setFormasPagamento(dados);
      } catch (err) {
        console.error('Erro ao carregar formas de pagamento:', err);
        setError('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [period]);



  // Converter dados para o formato do gráfico
  const dadosGrafico: DataPoint[] = formasPagamento.map((item, index) => ({
    name: item.name,
    value: item.value,
    color: item.color || COLORS[index % COLORS.length]
  }));

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-32 sm:h-45 w-full ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error || !dadosGrafico || dadosGrafico.length === 0) {
    return (
      <div className={`flex items-center justify-center h-32 sm:h-64 text-gray-500 text-sm sm:text-base w-full ${className}`}>
        {error || 'Nenhum dado disponível'}
      </div>
    );
  }

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