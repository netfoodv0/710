"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { CustomDropdown } from "@/components/ui"

export const description = "A daily bar chart for products"

// Dados fictícios para categorias (ordenados do maior para o menor)
const categoriasData = [
  { nome: "Hambúrgueres", vendas: 1250 },
  { nome: "Bebidas", vendas: 890 },
  { nome: "Acompanhamentos", vendas: 756 },
  { nome: "Sanduíches", vendas: 567 },
  { nome: "Pizzas", vendas: 445 },
  { nome: "Sobremesas", vendas: 432 },
  { nome: "Massas", vendas: 334 },
  { nome: "Saladas", vendas: 298 },
  { nome: "Carnes", vendas: 289 },
  { nome: "Vegetariano", vendas: 156 }
]

// Dados fictícios para produtos mais vendidos (limitado a 10)
const produtosData = [
  { nome: "X-Burger Clássico", vendas: 234 },
  { nome: "Coca-Cola 350ml", vendas: 198 },
  { nome: "Batata Frita Grande", vendas: 187 },
  { nome: "X-Tudo Especial", vendas: 165 },
  { nome: "Milkshake Chocolate", vendas: 143 },
  { nome: "Onion Rings", vendas: 132 },
  { nome: "X-Frango", vendas: 128 },
  { nome: "Refrigerante Laranja", vendas: 119 },
  { nome: "Nuggets de Frango", vendas: 115 },
  { nome: "X-Bacon", vendas: 108 }
]

const chartConfig = {
  vendas: {
    label: "Vendas",
    color: "rgb(173, 70, 255)",
  },
} satisfies ChartConfig

export function ChartBarDaily() {
  const [viewType, setViewType] = useState("categorias")

  const currentData = viewType === "categorias" ? categoriasData : produtosData
  const maxItems = viewType === "categorias" ? categoriasData.length : 10

  return (
    <Card className="pt-0 shadow-none border" style={{ borderColor: '#cfd1d3', background: '#ffffff', borderRadius: '16px' }}>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>
            {viewType === "categorias" ? "Vendas por Categoria" : "Produtos Mais Vendidos"}
          </CardTitle>
          <CardDescription>
            {viewType === "categorias" 
              ? "Mostrando quantidade vendida por categoria" 
              : `Top ${maxItems} produtos mais vendidos (limitado a 10)`
            }
          </CardDescription>
        </div>
        <CustomDropdown
          options={[
            { value: "categorias", label: "Categorias" },
            { value: "produtos", label: "Produtos" }
          ]}
          selectedValue={viewType}
          onValueChange={setViewType}
          size="sm"
          className="hidden w-[160px] sm:ml-auto sm:flex"
        />
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={currentData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey="nome"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.length > 15 ? value.slice(0, 15) + "..." : value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar 
              dataKey="vendas" 
              fill="rgb(173, 70, 255)" 
              radius={8}
            >
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
