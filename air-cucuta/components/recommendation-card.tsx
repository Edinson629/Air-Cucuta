import { Card, CardContent } from "@/components/ui/card"
import {
  Activity,
  Wind,
  AlertCircle,
  Shield,
  Droplet,
  Bell,
  Flower,
  Baby,
  User,
  TreesIcon as Lungs,
  Heart,
  Pill,
  Fan,
  Dumbbell,
  School,
  TreesIcon as Tree,
  Bike,
  Users,
  Car,
  Info,
} from "lucide-react"

interface RecommendationCardProps {
  title: string
  description: string
  icon: string
  level: "good" | "moderate" | "sensitive"
}

export default function RecommendationCard({ title, description, icon, level }: RecommendationCardProps) {
  // Función para determinar el color basado en el nivel
  const getLevelColor = (level: string) => {
    switch (level) {
      case "good":
        return "bg-green-100 text-green-800 border-green-200"
      case "moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "sensitive":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Función para renderizar el icono correcto
  const renderIcon = (iconName: string) => {
    const iconProps = { className: "h-5 w-5" }

    switch (iconName) {
      case "activity":
        return <Activity {...iconProps} />
      case "wind":
        return <Wind {...iconProps} />
      case "alert-circle":
        return <AlertCircle {...iconProps} />
      case "shield":
        return <Shield {...iconProps} />
      case "droplet":
        return <Droplet {...iconProps} />
      case "bell":
        return <Bell {...iconProps} />
      case "flower":
        return <Flower {...iconProps} />
      case "baby":
        return <Baby {...iconProps} />
      case "user":
        return <User {...iconProps} />
      case "lungs":
        return <Lungs {...iconProps} />
      case "heart":
        return <Heart {...iconProps} />
      case "pill":
        return <Pill {...iconProps} />
      case "fan":
        return <Fan {...iconProps} />
      case "dumbbell":
        return <Dumbbell {...iconProps} />
      case "school":
        return <School {...iconProps} />
      case "tree":
        return <Tree {...iconProps} />
      case "bike":
        return <Bike {...iconProps} />
      case "users":
        return <Users {...iconProps} />
      case "car":
        return <Car {...iconProps} />
      default:
        return <Info {...iconProps} />
    }
  }

  return (
    <Card className={`border-l-4 ${getLevelColor(level)}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={`p-2 rounded-full ${level === "good" ? "bg-green-100" : level === "moderate" ? "bg-yellow-100" : "bg-orange-100"}`}
          >
            {renderIcon(icon)}
          </div>
          <div>
            <h3 className="font-medium mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
