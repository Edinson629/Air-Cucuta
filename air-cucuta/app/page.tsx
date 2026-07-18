import Link from "next/link"
import { Wind, MapPin, BarChart2, Info, Database, Cpu } from "lucide-react"
import AirQualityCard from "@/components/air-quality-card"
import MapPreview from "@/components/map-preview"
import PollutionChart from "@/components/pollution-chart"
import RecommendationCard from "@/components/recommendation-card"
import PredictionBanner from "@/components/prediction-banner"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Wind className="h-6 w-6 text-green-600" />
            <span>AirCúcuta</span>
          </div>
          <nav className="ml-auto flex items-center gap-4 sm:gap-6">
            <Link href="/" className="text-sm font-medium underline underline-offset-4">
              Inicio
            </Link>
            <Link href="/mapa" className="text-sm font-medium hover:underline underline-offset-4">
              Mapa
            </Link>
            <Link href="/contaminantes" className="text-sm font-medium hover:underline underline-offset-4">
              Contaminantes
            </Link>
            <Link href="/recomendaciones" className="text-sm font-medium hover:underline underline-offset-4">
              Recomendaciones
            </Link>
            <Link href="/analisis" className="text-sm font-medium hover:underline underline-offset-4">
              Análisis
            </Link>
            <Link href="/documentacion" className="text-sm font-medium hover:underline underline-offset-4">
              Documentación
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-8 md:py-12">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Monitoreo de Calidad del Aire en Cúcuta y Colombia
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Información actualizada sobre la calidad del aire, contaminantes y recomendaciones para proteger tu
                  salud.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/mapa"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Ver Mapa
                </Link>
                <Link
                  href="/analisis"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Análisis Avanzado
                </Link>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
              <AirQualityCard location="Cúcuta" />
            </div>
          </div>
        </section>

        <PredictionBanner />

        <section className="container py-8 md:py-12">
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Mapa de Calidad del Aire</h2>
            <p className="text-muted-foreground">
              Visualiza la calidad del aire en diferentes zonas de Cúcuta y Colombia
            </p>
          </div>
          <div className="rounded-lg border overflow-hidden h-[400px]">
            <MapPreview />
          </div>
          <div className="flex justify-end mt-4">
            <Link
              href="/mapa"
              className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700"
            >
              Ver mapa completo <MapPin className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="container py-8 md:py-12">
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Principales Contaminantes</h2>
            <p className="text-muted-foreground">Monitoreo de los niveles de contaminantes en el aire de Cúcuta</p>
          </div>
          <div className="rounded-lg border p-4 bg-card">
            <PollutionChart />
          </div>
          <div className="flex justify-end mt-4">
            <Link
              href="/contaminantes"
              className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700"
            >
              Ver todos los contaminantes <BarChart2 className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="container py-8 md:py-12 bg-muted/50 rounded-lg">
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Recomendaciones de Salud</h2>
            <p className="text-muted-foreground">Basadas en la calidad actual del aire en Cúcuta</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <RecommendationCard
              title="Actividad Física"
              description="Se recomienda realizar actividades al aire libre con precaución. Personas sensibles deben considerar reducir la actividad prolongada."
              icon="activity"
              level="moderate"
            />
            <RecommendationCard
              title="Ventilación"
              description="Puede mantener las ventanas abiertas, pero esté atento a cambios en la calidad del aire durante el día."
              icon="wind"
              level="good"
            />
            <RecommendationCard
              title="Grupos Sensibles"
              description="Niños, adultos mayores y personas con problemas respiratorios deben limitar la exposición prolongada al aire libre."
              icon="alert-circle"
              level="sensitive"
            />
          </div>
          <div className="flex justify-end mt-4">
            <Link
              href="/recomendaciones"
              className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700"
            >
              Ver todas las recomendaciones <Info className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="container py-8 md:py-12">
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Tecnología Avanzada</h2>
            <p className="text-muted-foreground">
              Utilizamos algoritmos de procesamiento y ciencia de datos para ofrecer información precisa
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-blue-100">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium">Procesamiento FCFS</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Implementamos el algoritmo First Come First Served para gestionar las solicitudes de datos, garantizando
                un procesamiento justo y eficiente de todas las peticiones de información.
              </p>
              <Link href="/documentacion#fcfs" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                Más información sobre nuestro sistema de colas →
              </Link>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-purple-100">
                  <Cpu className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-medium">Procesamiento Paralelo</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Utilizamos técnicas de programación paralela para analizar grandes volúmenes de datos en tiempo real,
                permitiendo predicciones precisas y análisis complejos sin comprometer el rendimiento.
              </p>
              <Link
                href="/documentacion#paralelo"
                className="text-sm font-medium text-purple-600 hover:text-purple-700"
              >
                Descubre nuestra arquitectura de procesamiento →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} AirCúcuta. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="/documentacion" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Acerca de
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Contacto
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Privacidad
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
