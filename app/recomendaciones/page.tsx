import RecommendationCard from "@/components/recommendation-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"
import AirQualityCard from "@/components/air-quality-card"
import { ThemeToggle } from "@/components/theme-toggle"

export default function RecomendacionesPage() {
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
              <AlertTriangle className="h-4 w-4" />
              <span>Calidad del aire: Moderada</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Recomendaciones de Salud</h1>
            <p className="text-muted-foreground">Basadas en la calidad actual del aire en Cúcuta</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Estado Actual</CardTitle>
                <CardDescription>Calidad del aire en Cúcuta</CardDescription>
              </CardHeader>
              <CardContent>
                <AirQualityCard location="Cúcuta" showDetails={true} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Índice de Calidad del Aire</CardTitle>
                <CardDescription>Escala de referencia</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <div className="font-medium">Buena (0-50)</div>
                      <div className="text-sm text-muted-foreground">
                        La calidad del aire se considera satisfactoria.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                    <div className="flex-1">
                      <div className="font-medium">Moderada (51-100)</div>
                      <div className="text-sm text-muted-foreground">
                        Aceptable, pero puede haber riesgos para personas sensibles.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                    <div className="flex-1">
                      <div className="font-medium">Insalubre para grupos sensibles (101-150)</div>
                      <div className="text-sm text-muted-foreground">
                        Personas sensibles pueden experimentar efectos en la salud.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <div className="flex-1">
                      <div className="font-medium">Insalubre (151-200)</div>
                      <div className="text-sm text-muted-foreground">
                        Toda la población puede experimentar efectos en la salud.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                    <div className="flex-1">
                      <div className="font-medium">Muy insalubre (201-300)</div>
                      <div className="text-sm text-muted-foreground">Advertencias sanitarias de emergencia.</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="sensibles">Grupos Sensibles</TabsTrigger>
              <TabsTrigger value="actividades">Actividades</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="mt-4">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <RecommendationCard
                  title="Ventilación"
                  description="Puede mantener las ventanas abiertas, pero esté atento a cambios en la calidad del aire durante el día."
                  icon="wind"
                  level="good"
                />
                <RecommendationCard
                  title="Transporte"
                  description="Considere usar transporte público o compartir vehículo para reducir emisiones. Si es posible, camine o use bicicleta para trayectos cortos."
                  icon="car"
                  level="moderate"
                />
                <RecommendationCard
                  title="Mascarillas"
                  description="No es necesario el uso de mascarillas para la población general en condiciones actuales."
                  icon="shield"
                  level="good"
                />
                <RecommendationCard
                  title="Hidratación"
                  description="Manténgase bien hidratado, especialmente si realiza actividades al aire libre."
                  icon="droplet"
                  level="good"
                />
                <RecommendationCard
                  title="Monitoreo"
                  description="Esté atento a los cambios en la calidad del aire, especialmente en horas pico de tráfico."
                  icon="bell"
                  level="moderate"
                />
                <RecommendationCard
                  title="Plantas"
                  description="Las plantas de interior como la hiedra, el lirio de paz o la palmera de bambú pueden ayudar a filtrar el aire en interiores."
                  icon="flower"
                  level="good"
                />
              </div>
            </TabsContent>
            <TabsContent value="sensibles" className="mt-4">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <RecommendationCard
                  title="Niños"
                  description="Los niños pueden jugar al aire libre, pero limite la actividad intensa en exteriores durante las horas pico de contaminación."
                  icon="baby"
                  level="moderate"
                />
                <RecommendationCard
                  title="Adultos Mayores"
                  description="Personas mayores deben limitar la exposición prolongada al aire libre, especialmente en zonas de alto tráfico."
                  icon="user"
                  level="sensitive"
                />
                <RecommendationCard
                  title="Problemas Respiratorios"
                  description="Personas con asma, EPOC u otras condiciones respiratorias deben llevar siempre su medicación y reducir actividades al aire libre."
                  icon="lungs"
                  level="sensitive"
                />
                <RecommendationCard
                  title="Embarazadas"
                  description="Las mujeres embarazadas deben limitar la exposición prolongada a zonas con alta contaminación."
                  icon="heart"
                  level="moderate"
                />
                <RecommendationCard
                  title="Medicación"
                  description="Personas con condiciones crónicas deben seguir su plan de medicación y consultar con su médico si experimentan síntomas."
                  icon="pill"
                  level="moderate"
                />
                <RecommendationCard
                  title="Purificadores"
                  description="Considere el uso de purificadores de aire en interiores si pertenece a un grupo sensible."
                  icon="fan"
                  level="moderate"
                />
              </div>
            </TabsContent>
            <TabsContent value="actividades" className="mt-4">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <RecommendationCard
                  title="Ejercicio"
                  description="Se recomienda realizar actividades al aire libre con precaución. Evite ejercicio intenso cerca de vías con alto tráfico."
                  icon="activity"
                  level="moderate"
                />
                <RecommendationCard
                  title="Deportes"
                  description="Los deportes al aire libre son generalmente seguros, pero tome descansos frecuentes y manténgase hidratado."
                  icon="dumbbell"
                  level="moderate"
                />
                <RecommendationCard
                  title="Escuelas"
                  description="Las actividades escolares al aire libre pueden continuar con normalidad, pero los profesores deben estar atentos a niños con condiciones respiratorias."
                  icon="school"
                  level="good"
                />
                <RecommendationCard
                  title="Parques"
                  description="Visitar parques es recomendable, preferiblemente aquellos alejados de zonas de alto tráfico."
                  icon="tree"
                  level="good"
                />
                <RecommendationCard
                  title="Ciclismo"
                  description="Los ciclistas deben considerar rutas con menos tráfico y evitar horas pico de contaminación."
                  icon="bike"
                  level="moderate"
                />
                <RecommendationCard
                  title="Eventos al Aire Libre"
                  description="Los eventos al aire libre pueden realizarse normalmente, pero organice áreas de descanso con sombra y agua."
                  icon="users"
                  level="good"
                />
              </div>
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
