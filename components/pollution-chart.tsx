"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts"
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"

interface PollutionChartProps {
  showLegend?: boolean
}

export default function PollutionChart({ showLegend = false }: PollutionChartProps) {
  // Datos simulados de contaminantes
  const pollutionData = [
    { name: "PM2.5", value: 18, limit: 25, unit: "μg/m³" },
    { name: "PM10", value: 35, limit: 50, unit: "μg/m³" },
    { name: "O₃", value: 45, limit: 100, unit: "ppb" },
    { name: "NO₂", value: 22, limit: 53, unit: "ppb" },
    { name: "CO", value: 0.8, limit: 9, unit: "ppm" },
  ]

  // Función para determinar el color basado en el porcentaje del límite
  const getBarColor = (value: number, limit: number) => {
    const percentage = (value / limit) * 100
    if (percentage <= 50) return "#22c55e" // verde
    if (percentage <= 75) return "#eab308" // amarillo
    if (percentage <= 100) return "#f97316" // naranja
    return "#ef4444" // rojo
  }

  // Componente personalizado para el tooltip
  const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background p-3 border rounded-md shadow-sm">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">
            Valor:{" "}
            <span className="font-medium">
              {data.value} {data.unit}
            </span>
          </p>
          <p className="text-sm">
            Límite:{" "}
            <span className="font-medium">
              {data.limit} {data.unit}
            </span>
          </p>
          <p className="text-sm">
            Porcentaje del límite: <span className="font-medium">{Math.round((data.value / data.limit) * 100)}%</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={pollutionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        {showLegend && <Legend />}
        <Bar dataKey="value" name="Nivel Actual" radius={[4, 4, 0, 0]} barSize={40}>
          {pollutionData.map((entry, index) => (
            <Bar key={`bar-${index}`} dataKey="value" fill={getBarColor(entry.value, entry.limit)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
