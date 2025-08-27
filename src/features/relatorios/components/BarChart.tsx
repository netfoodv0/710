"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { CustomDropdown, DropdownOption } from "../../../components/ui/CustomDropdown"

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

export const description = "A bar chart with a label"

const chartData = {
  "6m": [
    { month: "Janeiro", desktop: 186 },
    { month: "Fevereiro", desktop: 305 },
    { month: "Março", desktop: 237 },
    { month: "Abril", desktop: 342 },
    { month: "Maio", desktop: 298 },
    { month: "Junho", desktop: 415 }
  ],
  "30d": [
    { day: "01/08", desktop: 186 },
    { day: "02/08", desktop: 305 },
    { day: "03/08", desktop: 237 },
    { day: "04/08", desktop: 73 },
    { day: "05/08", desktop: 209 },
    { day: "06/08", desktop: 214 },
    { day: "07/08", desktop: 298 },
    { day: "08/08", desktop: 156 },
    { day: "09/08", desktop: 342 },
    { day: "10/08", desktop: 267 },
    { day: "11/08", desktop: 189 },
    { day: "12/08", desktop: 234 },
    { day: "13/08", desktop: 156 },
    { day: "14/08", desktop: 298 },
    { day: "15/08", desktop: 345 },
    { day: "16/08", desktop: 267 },
    { day: "17/08", desktop: 189 },
    { day: "18/08", desktop: 234 },
    { day: "19/08", desktop: 156 },
    { day: "20/08", desktop: 298 },
    { day: "21/08", desktop: 345 },
    { day: "22/08", desktop: 267 },
    { day: "23/08", desktop: 189 },
    { day: "24/08", desktop: 234 },
    { day: "25/08", desktop: 156 },
    { day: "26/08", desktop: 298 },
    { day: "27/08", desktop: 345 },
    { day: "28/08", desktop: 267 },
    { day: "29/08", desktop: 189 },
    { day: "30/08", desktop: 234 }
  ],
  "7d": [
    { day: "Segunda", desktop: 186 },
    { day: "Terça", desktop: 305 },
    { day: "Quarta", desktop: 237 },
    { day: "Quinta", desktop: 73 },
    { day: "Sexta", desktop: 209 },
    { day: "Sábado", desktop: 214 },
    { day: "Domingo", desktop: 298 }
  ]
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartBarLabel() {
  const [timeRange, setTimeRange] = useState("30d")

  const filteredData = chartData[timeRange as keyof typeof chartData] || chartData["30d"]

  return (
    <Card className="pt-0 shadow-none border" style={{ borderColor: '#cfd1d3', background: 'linear-gradient(to bottom, #ffffff, #f5eff2)', borderRadius: '16px' }}>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>
            {timeRange === "6m" ? "Gráfico de Barras - Mensal" : 
             timeRange === "30d" ? "Gráfico de Barras - Diário" : 
             "Gráfico de Barras - Semanal"}
          </CardTitle>
          <CardDescription>
            {timeRange === "6m" ? "Mostrando total de visitantes dos últimos 6 meses" :
             timeRange === "30d" ? "Mostrando total de visitantes por dia do mês" :
             "Mostrando total de visitantes por dia da semana"}
          </CardDescription>
        </div>
        <CustomDropdown
          options={[
            { value: "6m", label: "Últimos 6 meses" },
            { value: "30d", label: "Últimos 30 dias" },
            { value: "7d", label: "Últimos 7 dias" }
          ]}
          selectedValue={timeRange}
          onValueChange={setTimeRange}
          size="sm"
          className="hidden w-[160px] sm:ml-auto sm:flex"
        />
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={filteredData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey={timeRange === "6m" ? "month" : "day"}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => timeRange === "6m" ? value.slice(0, 3) : value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="#9333EA" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

    </Card>
  )
}
