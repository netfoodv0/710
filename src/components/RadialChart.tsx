"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

export const description = "A radial chart with a custom shape"

const chartData = [
  { browser: "safari", visitors: 1260, fill: "rgb(173, 70, 255)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "rgb(173, 70, 255)",
  },
} satisfies ChartConfig

export function ChartRadialShape() {
  return (
    <Card className="flex flex-col shadow-none border" style={{ borderColor: '#cfd1d3', background: '#ffffff', borderRadius: '16px' }}>
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-gray-800">Visão Geral de Clientes</CardTitle>
        <CardDescription className="text-gray-600">Janeiro - Junho 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
          style={{ background: '#ffffff' }}
        >
          <RadialBarChart
            data={chartData}
            endAngle={100}
            innerRadius={80}
            outerRadius={140}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-[rgb(220,220,220)] last:fill-white"
              polarRadius={[86, 74]}
            />
            <RadialBar 
              dataKey="visitors" 
              background 
              fill="rgb(173, 70, 255)"
              stroke="rgb(173, 70, 255)"
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-gray-900 text-4xl font-bold"
                        >
                          {chartData[0].visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-gray-600 text-sm"
                        >
                          Clientes
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium text-gray-700">
          Crescimento de 5.2% este mês <TrendingUp className="h-4 w-4 text-green-600" />
        </div>
        <div className="text-gray-500 leading-none">
          Mostrando total de clientes dos últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  )
}
