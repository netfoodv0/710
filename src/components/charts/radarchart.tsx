"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radar chart with dots"

const chartData = [
  { mes: "Janeiro", clientes: 186 },
  { mes: "Fevereiro", clientes: 305 },
  { mes: "Março", clientes: 237 },
  { mes: "Abril", clientes: 273 },
  { mes: "Maio", clientes: 209 },
  { mes: "Junho", clientes: 214 },
]

const chartConfig = {
  clientes: {
    label: "Clientes",
    color: "rgb(173, 70, 255)",
  },
} satisfies ChartConfig

export function ChartRadarDots() {
  return (
    <Card className="shadow-none border" style={{ borderColor: '#cfd1d3', background: '#ffffff', borderRadius: '16px' }}>
      <CardHeader className="items-center">
        <CardTitle className="text-gray-800">Distribuição Mensal</CardTitle>
        <CardDescription className="text-gray-600">
          Total de clientes nos últimos 6 meses
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="mes" />
            <PolarGrid stroke="#e5e7eb" />
            <Radar
              dataKey="clientes"
              fill="rgb(173, 70, 255)"
              fillOpacity={0.6}
              stroke="rgb(173, 70, 255)"
              dot={{
                r: 4,
                fillOpacity: 1,
                fill: "rgb(173, 70, 255)",
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium text-gray-700">
          Crescimento de 5.2% este mês <TrendingUp className="h-4 w-4 text-green-600" />
        </div>
        <div className="text-gray-500 flex items-center gap-2 leading-none">
          Janeiro - Junho 2024
        </div>
      </CardFooter>
    </Card>
  )
}
