import { ArrowLeft, Database, Cpu, TrendingUp, Layers } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CorrelationMatrix from "@/components/correlation-matrix"
import PredictiveModel from "@/components/predictive-model"
import ClusterAnalysis from "@/components/cluster-analysis"
import TimeSeriesAnalysis from "@/components/time-series-analysis"
import ProcessingMetrics from "@/components/processing-metrics"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AnalisisPage() {
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
              <Database className="h-4 w-4" />
              <span>Análisis en tiempo real</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Análisis Avanzado de Datos</h1>
            <p className="text-muted-foreground">
              Herramientas de ciencia de datos para el análisis de la calidad del aire
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Procesamiento de Datos</CardTitle>
                <CardDescription>Métricas de rendimiento del sistema de procesamiento paralelo</CardDescription>
              </CardHeader>
              <CardContent>
                <ProcessingMetrics />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Arquitectura del Sistema</CardTitle>
                <CardDescription>Componentes principales de la plataforma de análisis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-md">
                  <div className="p-2 rounded-full bg-blue-100">
                    <Database className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Cola FCFS</h3>
                    <p className="text-sm text-muted-foreground">
                      Gestión de solicitudes mediante First Come First Served
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-md">
                  <div className="p-2 rounded-full bg-purple-100">
                    <Cpu className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Procesamiento Paralelo</h3>
                    <p className="text-sm text-muted-foreground">
                      Análisis distribuido mediante Web Workers y computación paralela
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-md">
                  <div className="p-2 rounded-full bg-green-100">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Modelos Predictivos</h3>
                    <p className="text-sm text-muted-foreground">
                      Algoritmos de machine learning para predicción de calidad del aire
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-md">
                  <div className="p-2 rounded-full bg-orange-100">
                    <Layers className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Análisis de Clusters</h3>
                    <p className="text-sm text-muted-foreground">
                      Identificación de patrones mediante algoritmos de clustering
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="predictivo" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="predictivo">Predictivo</TabsTrigger>
              <TabsTrigger value="correlacion">Correlación</TabsTrigger>
              <TabsTrigger value="series">Series Temporales</TabsTrigger>
              <TabsTrigger value="clusters">Clusters</TabsTrigger>
            </TabsList>
            <TabsContent value="predictivo" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Modelo Predictivo</CardTitle>
                  <CardDescription>
                    Predicción de calidad del aire para las próximas 24 horas utilizando redes neuronales
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PredictiveModel />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="correlacion" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Matriz de Correlación</CardTitle>
                  <CardDescription>Análisis de correlación entre contaminantes y factores ambientales</CardDescription>
                </CardHeader>
                <CardContent>
                  <CorrelationMatrix />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="series" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Análisis de Series Temporales</CardTitle>
                  <CardDescription>
                    Descomposición de series temporales para identificar tendencias y estacionalidad
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TimeSeriesAnalysis />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="clusters" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Análisis de Clusters</CardTitle>
                  <CardDescription>Agrupación de zonas por similitud en patrones de contaminación</CardDescription>
                </CardHeader>
                <CardContent>
                  <ClusterAnalysis />
                </CardContent>
              </Card>
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
