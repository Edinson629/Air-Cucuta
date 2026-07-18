"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MapPin, Clock } from "lucide-react"

interface AirQualityCardProps {
  location: string
  showDetails?: boolean
}

export default function AirQualityCard({ location, showDetails = false }: AirQualityCardProps) {
  // Datos simulados de calidad del aire
  const airQualityData = {
    index: 75,
    status: "Moderada",
    mainPollutant: "PM2.5",
    temperature: 28,
    humidity: 65,
    wind: 8,
    updated: new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }),
  }

  // Determinar el color basado en el índice de calidad del aire
  const getColorClass = (index: number) => {
    if (index <= 50) return "text-green-600"
    if (index <= 100) return "text-yellow-600"
    if (index <= 150) return "text-orange-600"
    if (index <= 200) return "text-red-600"
    return "text-purple-600"
  }

  const getProgressColor = (index: number) => {
    if (index <= 50) return "bg-green-600"
    if (index <= 100) return "bg-yellow-600"
    if (index <= 150) return "bg-orange-600"
    if (index <= 200) return "bg-red-600"
    return "bg-purple-600"
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{airQualityData.updated}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl font-bold leading-none tracking-tight">
              <span className={getColorClass(airQualityData.index)}>{airQualityData.index}</span>
            </div>
            <div>
              <div className={`font-medium ${getColorClass(airQualityData.index)}`}>{airQualityData.status}</div>
              <div className="text-sm text-muted-foreground">
                Contaminante principal: {airQualityData.mainPollutant}
              </div>
            </div>
          </div>

          <div className="mb-2">
            <Progress
             value={airQualityData.index}
             max={300}
             className="h-2"
           />
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2">
              <div className="text-sm text-muted-foreground">Temperatura</div>
              <div className="font-medium">{airQualityData.temperature}°C</div>
            </div>
            <div className="p-2">
              <div className="text-sm text-muted-foreground">Humedad</div>
              <div className="font-medium">{airQualityData.humidity}%</div>
            </div>
            <div className="p-2">
              <div className="text-sm text-muted-foreground">Viento</div>
              <div className="font-medium">{airQualityData.wind} km/h</div>
            </div>
          </div>

          {showDetails && (
            <div className="mt-4 pt-4 border-t">
              <h3 className="font-medium mb-2">Detalles por contaminante</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">PM2.5</span>
                  <span className="text-sm font-medium">18 μg/m³</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">PM10</span>
                  <span className="text-sm font-medium">35 μg/m³</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">O₃</span>
                  <span className="text-sm font-medium">45 ppb</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">NO₂</span>
                  <span className="text-sm font-medium">22 ppb</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">CO</span>
                  <span className="text-sm font-medium">0.8 ppm</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
