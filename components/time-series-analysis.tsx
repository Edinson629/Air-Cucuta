"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader } from "lucide-react"

export default function TimeSeriesAnalysis() {
  const [loading, setLoading] = useState(true)
  const [selectedPollutant, setSelectedPollutant] = useState("pm25")
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([])
  const [decompositionData, setDecompositionData] = useState<any[]>([])

  useEffect(() => {
    // Simulación de carga de datos
    const timer = setTimeout(() => {
      generateTimeSeriesData()
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const generateTimeSeriesData = () => {
    // Generar datos simulados para la serie temporal
    const days = 30
    const dataPoints = days * 24
    const newTimeSeriesData = []
    const newDecompositionData = []

    // Tendencia base según el contaminante
    const baseTrend =
      {
        pm25: 18,
        pm10: 35,
        o3: 45,
        no2: 22,
        co: 0.8,
      }[selectedPollutant] || 50

    // Componentes de la serie temporal
    const trend = []
    const seasonal = []
    const residual = []
    const observed = []

    // Generar componentes
    for (let i = 0; i < dataPoints; i++) {
      // Tendencia (creciente o decreciente suavemente)
      const trendValue = baseTrend + Math.sin(i / dataPoints) * baseTrend * 0.2
      trend.push(trendValue)

      // Estacionalidad (patrón diario)
      const hourOfDay = i % 24
      const seasonalValue = Math.sin((hourOfDay / 24) * Math.PI * 2) * baseTrend * 0.3
      seasonal.push(seasonalValue)

      // Residual (ruido aleatorio)
      const residualValue = (Math.random() - 0.5) * baseTrend * 0.1
      residual.push(residualValue)

      // Valor observado (suma de componentes)
      const observedValue = trendValue + seasonalValue + residualValue
      observed.push(observedValue)
    }

    // Crear datos para la serie temporal
    for (let i = 0; i < dataPoints; i++) {
      const date = new Date()
      date.setHours(date.getHours() - (dataPoints - i))

      // Crear etiquetas más simples para el eje X
      const dayLabel = `${date.getDate()}/${date.getMonth() + 1}`
      const hourLabel = `${date.getHours()}h`
      const shortLabel = i % 24 === 0 ? dayLabel : i % 6 === 0 ? hourLabel : ""

      newTimeSeriesData.push({
        timestamp: date.toISOString(),
        value: observed[i],
        hour: date.getHours(),
        day: date.getDate(),
        shortLabel: shortLabel,
        dayOnly: dayLabel,
        index: i,
      })

      newDecompositionData.push({
        timestamp: date.toISOString(),
        observed: observed[i],
        trend: trend[i],
        seasonal: seasonal[i],
        residual: residual[i],
        hour: date.getHours(),
        day: date.getDate(),
        shortLabel: shortLabel,
        dayOnly: dayLabel,
        index: i,
      })
    }

    setTimeSeriesData(newTimeSeriesData)
    setDecompositionData(newDecompositionData)
  }

  const handlePollutantChange = (value: string) => {
    setSelectedPollutant(value)
    setLoading(true)
    setTimeout(() => {
      generateTimeSeriesData()
      setLoading(false)
    }, 1500)
  }

  // Obtener la unidad según el contaminante seleccionado
  const getPollutantUnit = (pollutant: string) => {
    const units = {
      pm25: "μg/m³",
      pm10: "μg/m³",
      o3: "ppb",
      no2: "ppb",
      co: "ppm",
    }
    return units[pollutant as keyof typeof units] || ""
  }

  // Formatear la fecha para el tooltip
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString("es-CO", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Función personalizada para formatear el eje X
  const formatXAxisLabel = (tickItem: any, index: number) => {
    if (typeof tickItem === "object" && tickItem.shortLabel) {
      return tickItem.shortLabel
    }

    // Fallback: mostrar solo algunos puntos
    if (index % 48 === 0) {
      // Cada 2 días
      const date = new Date(tickItem)
      return `${date.getDate()}/${date.getMonth() + 1}`
    }
    return ""
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Select value={selectedPollutant} onValueChange={handlePollutantChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar contaminante" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pm25">PM2.5</SelectItem>
            <SelectItem value="pm10">PM10</SelectItem>
            <SelectItem value="o3">O₃</SelectItem>
            <SelectItem value="no2">NO₂</SelectItem>
            <SelectItem value="co">CO</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">Unidad: {getPollutantUnit(selectedPollutant)}</span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[500px]">
          <div className="flex flex-col items-center gap-2">
            <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Analizando serie temporal...</p>
          </div>
        </div>
      ) : (
        <Tabs defaultValue="serie" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="serie">Serie Temporal</TabsTrigger>
            <TabsTrigger value="descomposicion">Descomposición</TabsTrigger>
          </TabsList>
          <TabsContent value="serie" className="mt-4">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="index"
                    type="number"
                    scale="linear"
                    domain={["dataMin", "dataMax"]}
                    tickFormatter={(value) => {
                      const dataPoint = timeSeriesData[Math.floor(value)]
                      if (!dataPoint) return ""

                      // Mostrar solo cada 48 puntos (cada 2 días)
                      if (value % 48 === 0) {
                        return dataPoint.dayOnly
                      }
                      return ""
                    }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => [
                      `${value.toFixed(2)} ${getPollutantUnit(selectedPollutant)}`,
                      "Valor",
                    ]}
                    labelFormatter={(value) => {
                      const dataPoint = timeSeriesData[Math.floor(value as number)]
                      return dataPoint ? formatDate(dataPoint.timestamp) : ""
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="descomposicion" className="mt-4">
            <div className="space-y-4">
              <div className="h-[150px] w-full">
                <p className="text-sm font-medium mb-2">Serie Original</p>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={decompositionData} margin={{ top: 5, right: 30, left: 20, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="index"
                      type="number"
                      scale="linear"
                      domain={["dataMin", "dataMax"]}
                      tickFormatter={(value) => {
                        const dataPoint = decompositionData[Math.floor(value)]
                        if (!dataPoint) return ""

                        // Mostrar solo cada 72 puntos (cada 3 días) para gráficos más pequeños
                        if (value % 72 === 0) {
                          return dataPoint.dayOnly
                        }
                        return ""
                      }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={40}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => [
                        `${value.toFixed(2)} ${getPollutantUnit(selectedPollutant)}`,
                        "Observado",
                      ]}
                      labelFormatter={(value) => {
                        const dataPoint = decompositionData[Math.floor(value as number)]
                        return dataPoint ? formatDate(dataPoint.timestamp) : ""
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="observed"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="h-[150px] w-full">
                <p className="text-sm font-medium mb-2">Tendencia</p>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={decompositionData} margin={{ top: 5, right: 30, left: 20, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="index"
                      type="number"
                      scale="linear"
                      domain={["dataMin", "dataMax"]}
                      tickFormatter={(value) => {
                        const dataPoint = decompositionData[Math.floor(value)]
                        if (!dataPoint) return ""

                        if (value % 72 === 0) {
                          return dataPoint.dayOnly
                        }
                        return ""
                      }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={40}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => [
                        `${value.toFixed(2)} ${getPollutantUnit(selectedPollutant)}`,
                        "Tendencia",
                      ]}
                      labelFormatter={(value) => {
                        const dataPoint = decompositionData[Math.floor(value as number)]
                        return dataPoint ? formatDate(dataPoint.timestamp) : ""
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="trend"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="h-[150px] w-full">
                <p className="text-sm font-medium mb-2">Estacionalidad</p>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={decompositionData} margin={{ top: 5, right: 30, left: 20, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="index"
                      type="number"
                      scale="linear"
                      domain={["dataMin", "dataMax"]}
                      tickFormatter={(value) => {
                        const dataPoint = decompositionData[Math.floor(value)]
                        if (!dataPoint) return ""

                        if (value % 72 === 0) {
                          return dataPoint.dayOnly
                        }
                        return ""
                      }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={40}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => [
                        `${value.toFixed(2)} ${getPollutantUnit(selectedPollutant)}`,
                        "Estacionalidad",
                      ]}
                      labelFormatter={(value) => {
                        const dataPoint = decompositionData[Math.floor(value as number)]
                        return dataPoint ? formatDate(dataPoint.timestamp) : ""
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="seasonal"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="h-[150px] w-full">
                <p className="text-sm font-medium mb-2">Residual</p>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={decompositionData} margin={{ top: 5, right: 30, left: 20, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="index"
                      type="number"
                      scale="linear"
                      domain={["dataMin", "dataMax"]}
                      tickFormatter={(value) => {
                        const dataPoint = decompositionData[Math.floor(value)]
                        if (!dataPoint) return ""

                        if (value % 72 === 0) {
                          return dataPoint.dayOnly
                        }
                        return ""
                      }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={40}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => [
                        `${value.toFixed(2)} ${getPollutantUnit(selectedPollutant)}`,
                        "Residual",
                      ]}
                      labelFormatter={(value) => {
                        const dataPoint = decompositionData[Math.floor(value as number)]
                        return dataPoint ? formatDate(dataPoint.timestamp) : ""
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="residual"
                      stroke="#f97316"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}

      <div className="bg-muted p-4 rounded-md">
        <h4 className="font-medium mb-2">Acerca del análisis de series temporales</h4>
        <p className="text-sm text-muted-foreground">
          El análisis de series temporales descompone los datos en tres componentes principales: tendencia (cambios a
          largo plazo), estacionalidad (patrones cíclicos) y residual (variaciones aleatorias). Esta descomposición
          permite identificar patrones recurrentes en la calidad del aire, como los picos diarios durante las horas de
          mayor tráfico o las variaciones estacionales relacionadas con factores meteorológicos.
        </p>
      </div>
    </div>
  )
}
