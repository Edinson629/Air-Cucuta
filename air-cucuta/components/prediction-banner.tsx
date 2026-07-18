"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, AlertTriangle, Clock } from "lucide-react"

export default function PredictionBanner() {
  const [loading, setLoading] = useState(true)
  const [prediction, setPrediction] = useState<{
    trend: "improving" | "worsening" | "stable"
    nextHours: { hour: number; aqi: number }[]
    worstTime: string
    confidence: number
  } | null>(null)

  useEffect(() => {
    // Simulación de carga de datos de predicción
    const timer = setTimeout(() => {
      setPrediction({
        trend: "worsening",
        nextHours: [
          { hour: 10, aqi: 65 },
          { hour: 12, aqi: 75 },
          { hour: 14, aqi: 85 },
          { hour: 16, aqi: 95 },
          { hour: 18, aqi: 90 },
          { hour: 20, aqi: 80 },
        ],
        worstTime: "16:00",
        confidence: 87,
      })
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Determinar el color basado en la tendencia
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving":
        return "text-green-600"
      case "worsening":
        return "text-orange-600"
      default:
        return "text-blue-600"
    }
  }

  // Determinar el mensaje basado en la tendencia
  const getTrendMessage = (trend: string) => {
    switch (trend) {
      case "improving":
        return "La calidad del aire mejorará en las próximas horas"
      case "worsening":
        return "La calidad del aire empeorará en las próximas horas"
      default:
        return "La calidad del aire se mantendrá estable"
    }
  }

  return (
    <section className="container py-4">
      <Card className="border-l-4 border-l-orange-500">
        <CardContent className="p-4">
          {loading ? (
            <div className="flex items-center justify-center h-16">
              <div className="flex flex-col items-center gap-2">
                <div className="h-4 w-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-muted-foreground">Cargando predicción...</p>
              </div>
            </div>
          ) : (
            prediction && (
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-orange-100">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Predicción</h3>
                    <p className={`text-sm ${getTrendColor(prediction.trend)}`}>{getTrendMessage(prediction.trend)}</p>
                  </div>
                </div>

                <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Próximas horas</span>
                      <span>Confianza: {prediction.confidence}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {prediction.nextHours.map((hour, index) => {
                        // Determinar el color basado en el AQI
                        const getColor = (aqi: number) => {
                          if (aqi <= 50) return "bg-green-500"
                          if (aqi <= 100) return "bg-yellow-500"
                          if (aqi <= 150) return "bg-orange-500"
                          return "bg-red-500"
                        }

                        return (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div
                              className={`w-full h-16 rounded-sm ${getColor(hour.aqi)}`}
                              style={{ height: `${(hour.aqi / 150) * 40 + 10}px` }}
                            ></div>
                            <span className="text-xs mt-1">{hour.hour}h</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 md:border-l md:pl-4">
                    <div className="p-2 rounded-full bg-red-100">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <div className="text-sm">Peor calidad a las</div>
                      <div className="font-medium flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {prediction.worstTime}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </section>
  )
}
