import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Info, Heart } from "lucide-react"

interface PollutantDetailProps {
  name: string
  fullName: string
  value: number
  unit: string
  description: string
  sources: string[]
  healthEffects: string[]
  recommendations: string[]
}

export default function PollutantDetail({
  name,
  fullName,
  value,
  unit,
  description,
  sources,
  healthEffects,
  recommendations,
}: PollutantDetailProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold">{name}</h3>
              <p className="text-muted-foreground">{fullName}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {value} <span className="text-base font-normal text-muted-foreground">{unit}</span>
              </div>
              <p className="text-sm text-muted-foreground">Valor actual</p>
            </div>
          </div>

          <div className="space-y-4">
            <p>{description}</p>

            <div>
              <h4 className="font-medium flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-blue-500" />
                Fuentes principales
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                {sources.map((source, index) => (
                  <li key={index} className="text-sm">
                    {source}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <h4 className="font-medium flex items-center gap-2 mb-3">
              <Heart className="h-4 w-4 text-red-500" />
              Efectos en la salud
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              {healthEffects.map((effect, index) => (
                <li key={index} className="text-sm">
                  {effect}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h4 className="font-medium flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              Recomendaciones
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="text-sm">
                  {recommendation}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
