import PollutionChart from "@/components/pollution-chart"
import PollutantDetail from "@/components/pollutant-detail"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ContaminantesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <ArrowLeft className="h-5 w-5" />
            <span>AirCúcuta</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Última actualización: {new Date().toLocaleDateString("es-CO")}</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Contaminantes del Aire</h1>
            <p className="text-muted-foreground">Monitoreo de los niveles de contaminantes en el aire de Cúcuta</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resumen de Contaminantes</CardTitle>
              <CardDescription>Niveles actuales de los principales contaminantes en Cúcuta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <PollutionChart showLegend={true} />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="pm25" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-5">
              <TabsTrigger value="pm25">PM2.5</TabsTrigger>
              <TabsTrigger value="pm10">PM10</TabsTrigger>
              <TabsTrigger value="o3">O₃</TabsTrigger>
              <TabsTrigger value="no2">NO₂</TabsTrigger>
              <TabsTrigger value="co">CO</TabsTrigger>
            </TabsList>
            <TabsContent value="pm25" className="mt-4">
              <PollutantDetail
                name="PM2.5"
                fullName="Partículas finas"
                value={18}
                unit="μg/m³"
                description="Las partículas finas (PM2.5) son partículas inhalables con diámetros generalmente de 2.5 micrómetros o menos. Pueden penetrar profundamente en los pulmones e incluso entrar en el torrente sanguíneo."
                sources={[
                  "Emisiones de vehículos",
                  "Quema de combustibles",
                  "Incendios forestales",
                  "Actividades industriales",
                ]}
                healthEffects={[
                  "Problemas respiratorios",
                  "Enfermedades cardíacas",
                  "Disminución de la función pulmonar",
                  "Agravamiento del asma",
                ]}
                recommendations={[
                  "Reducir actividades al aire libre",
                  "Usar mascarillas en días de alta contaminación",
                  "Mantener ventanas cerradas",
                ]}
              />
            </TabsContent>
            <TabsContent value="pm10" className="mt-4">
              <PollutantDetail
                name="PM10"
                fullName="Partículas inhalables"
                value={35}
                unit="μg/m³"
                description="Las partículas inhalables (PM10) son partículas con diámetros de 10 micrómetros o menos. Pueden irritar las vías respiratorias y causar problemas de salud."
                sources={["Polvo de carreteras", "Construcción", "Operaciones mineras", "Agricultura"]}
                healthEffects={[
                  "Irritación en ojos, nariz y garganta",
                  "Tos y estornudos",
                  "Infecciones respiratorias",
                  "Agravamiento de asma y bronquitis",
                ]}
                recommendations={[
                  "Limitar actividades al aire libre en días ventosos",
                  "Mantener limpio el hogar",
                  "Usar purificadores de aire",
                ]}
              />
            </TabsContent>
            <TabsContent value="o3" className="mt-4">
              <PollutantDetail
                name="O₃"
                fullName="Ozono"
                value={45}
                unit="ppb"
                description="El ozono troposférico es un gas que se forma cuando los óxidos de nitrógeno y los compuestos orgánicos volátiles reaccionan en presencia de la luz solar."
                sources={["Emisiones de vehículos", "Plantas de energía", "Refinerías", "Productos químicos"]}
                healthEffects={[
                  "Dificultad para respirar",
                  "Dolor en el pecho",
                  "Inflamación de las vías respiratorias",
                  "Reducción de la función pulmonar",
                ]}
                recommendations={[
                  "Evitar ejercicio al aire libre durante las horas pico de ozono",
                  "Programar actividades para la mañana temprano o la noche",
                ]}
              />
            </TabsContent>
            <TabsContent value="no2" className="mt-4">
              <PollutantDetail
                name="NO₂"
                fullName="Dióxido de Nitrógeno"
                value={22}
                unit="ppb"
                description="El dióxido de nitrógeno es un gas de color marrón rojizo con un olor acre. Es un contaminante común en áreas urbanas, principalmente de las emisiones de vehículos."
                sources={["Tráfico vehicular", "Centrales eléctricas", "Calderas industriales", "Estufas de gas"]}
                healthEffects={[
                  "Irritación de las vías respiratorias",
                  "Agravamiento del asma",
                  "Mayor susceptibilidad a infecciones respiratorias",
                  "Reducción de la función pulmonar",
                ]}
                recommendations={[
                  "Evitar áreas con tráfico intenso",
                  "Mantener una buena ventilación al usar estufas de gas",
                  "Considerar purificadores de aire",
                ]}
              />
            </TabsContent>
            <TabsContent value="co" className="mt-4">
              <PollutantDetail
                name="CO"
                fullName="Monóxido de Carbono"
                value={0.8}
                unit="ppm"
                description="El monóxido de carbono es un gas incoloro e inodoro que se produce por la combustión incompleta de combustibles que contienen carbono."
                sources={["Vehículos de motor", "Calentadores de gas", "Estufas", "Incendios"]}
                healthEffects={[
                  "Reducción de la capacidad de la sangre para transportar oxígeno",
                  "Dolores de cabeza",
                  "Mareos",
                  "Confusión",
                  "En altas concentraciones puede ser fatal",
                ]}
                recommendations={[
                  "Asegurar una ventilación adecuada",
                  "Instalar detectores de CO",
                  "Mantener los aparatos de combustión en buen estado",
                ]}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} AirCúcuta. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
