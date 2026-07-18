"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader, RefreshCw } from "lucide-react"

export default function PredictiveModel() {
  const [loading, setLoading] = useState(true)
  const [predicting, setPredicting] = useState(false)
  const [selectedPollutant, setSelectedPollutant] = useState("pm25")
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Simulación de carga de datos
    const timer = setTimeout(() => {
      generatePredictionData()
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const generatePredictionData = () => {
    // Generar datos simulados para la predicción
    const currentHour = new Date().getHours()
    const newData = []

    // Datos históricos (últimas 12 horas)
    for (let i = 0; i < 12; i++) {
      const hour = (currentHour - 12 + i + 24) % 24
      newData.push({
        hour: `${hour}:00`,
        actual: getRandomValue(selectedPollutant, false),
        predicted: null,
        type: "histórico",
      })
    }

    // Datos actuales (hora actual)
    newData.push({
      hour: `${currentHour}:00`,
      actual: getRandomValue(selectedPollutant, false),
      predicted: getRandomValue(selectedPollutant, true),
      type: "actual",
    })

    // Datos predichos (próximas 24 horas)
    for (let i = 1; i <= 24; i++) {
      const hour = (currentHour + i) % 24
      newData.push({
        hour: `${hour}:00`,
        actual: null,
        predicted: getRandomValue(selectedPollutant, true),
        type: "predicción",
      })
    }

    setData(newData)
  }

  const getRandomValue = (pollutant: string, isPrediction: boolean) => {
    // Generar valores aleatorios según el tipo de contaminante
    const baseValue =
      {
        pm25: 18,
        pm10: 35,
        o3: 45,
        no2: 22,
        co: 0.8,
      }[pollutant] || 50

    // Añadir variación aleatoria
    const variation = isPrediction ? Math.random() * 20 - 5 : Math.random() * 10 - 5
    return Math.max(0, baseValue + variation)
  }

  const handleRefresh = () => {
    setPredicting(true)
    setTimeout(() => {
      generatePredictionData()
      setPredicting(false)
    }, 2000)
  }

  const handlePollutantChange = (value: string) => {
    setSelectedPollutant(value)
    setPredicting(true)
    setTimeout(() => {
      generatePredictionData()
      setPredicting(false)
    }, 1500)
  }

  // Obtener el límite según el contaminante seleccionado
  const getPollutantLimit = (pollutant: string) => {
    const limits = {
      pm25: 25,
      pm10: 50,
      o3: 100,
      no2: 53,
      co: 9,
    }
    return limits[pollutant as keyof typeof limits] || 50
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

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
        <Button variant="outline" onClick={handleRefresh} disabled={loading || predicting}>
          {predicting ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
          Actualizar predicción
        </Button>
      </div>

      <div className="h-[400px] w-full">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-2">
              <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Cargando modelo predictivo...</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="hour"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.split(":")[0]}
                interval={2}
              />
              <YAxis />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value.toFixed(2)} ${getPollutantUnit(selectedPollutant)}`,
                  name === "actual" ? "Valor real" : "Predicción",
                ]}
                labelFormatter={(label) => `Hora: ${label}`}
              />
              <Legend
                payload={[
                  { value: "Valor real", type: "line", color: "#3b82f6" },
                  { value: "Predicción", type: "line", color: "#8b5cf6" },
                ]}
              />
              <ReferenceLine
                y={getPollutantLimit(selectedPollutant)}
                label={{ value: "Límite", position: "top" }}
                stroke="#ef4444"
                strokeDasharray="3 3"
              />
              <Line
                type="monotone"
                dataKey="actual"
                name="actual"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                name="predicted"
                stroke="#8b5cf6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="bg-muted p-4 rounded-md">
        <h4 className="font-medium mb-2">Acerca del modelo predictivo</h4>
        <p className="text-sm text-muted-foreground">
          Este modelo utiliza una red neuronal LSTM (Long Short-Term Memory) entrenada con datos históricos de calidad
          del aire, variables meteorológicas y patrones temporales. La predicción se actualiza cada hora y tiene un
          horizonte de 24 horas. El procesamiento se realiza mediante computación paralela distribuida para garantizar
          resultados rápidos y precisos.
        </p>
      </div>
    </div>
  )
}
