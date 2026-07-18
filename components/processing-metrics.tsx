"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader } from "lucide-react"

export default function ProcessingMetrics() {
  const [loading, setLoading] = useState(true)
  const [queueData, setQueueData] = useState<any[]>([])
  const [performanceData, setPerformanceData] = useState<any[]>([])

  useEffect(() => {
    // Simulación de carga de datos
    const timer = setTimeout(() => {
      generateMetricsData()
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const generateMetricsData = () => {
    // Generar datos simulados para la cola FCFS
    const newQueueData = []
    for (let i = 0; i < 24; i++) {
      newQueueData.push({
        hour: `${i}:00`,
        requests: Math.floor(Math.random() * 50) + 10,
        processed: Math.floor(Math.random() * 50) + 10,
        waitTime: Math.random() * 2,
      })
    }
    setQueueData(newQueueData)

    // Generar datos simulados para el rendimiento del procesamiento paralelo
    const newPerformanceData = []
    for (let i = 1; i <= 8; i++) {
      newPerformanceData.push({
        workers: i,
        speedup: i * 0.8 + Math.random() * 0.4,
        efficiency: (i * 0.8 + Math.random() * 0.4) / i,
      })
    }
    setPerformanceData(newPerformanceData)
  }

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex items-center justify-center h-[400px]">
          <div className="flex flex-col items-center gap-2">
            <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Cargando métricas de procesamiento...</p>
          </div>
        </div>
      ) : (
        <Tabs defaultValue="cola" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="cola">Cola FCFS</TabsTrigger>
            <TabsTrigger value="paralelo">Procesamiento Paralelo</TabsTrigger>
          </TabsList>
          <TabsContent value="cola" className="mt-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={queueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="hour" interval={3} />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="requests"
                    name="Solicitudes"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    barSize={10}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="processed"
                    name="Procesadas"
                    fill="#22c55e"
                    radius={[4, 4, 0, 0]}
                    barSize={10}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="waitTime"
                    name="Tiempo de espera (s)"
                    stroke="#f97316"
                    strokeWidth={2}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-muted p-4 rounded-md mt-4">
              <h4 className="font-medium mb-2">Rendimiento de la Cola FCFS</h4>
              <p className="text-sm text-muted-foreground">
                El gráfico muestra el número de solicitudes recibidas y procesadas por hora, junto con el tiempo medio
                de espera. El algoritmo First Come First Served garantiza que todas las solicitudes se procesen en el
                orden exacto en que se reciben, sin priorización. Observe cómo el tiempo de espera aumenta durante las
                horas pico cuando hay más solicitudes que capacidad de procesamiento.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="paralelo" className="mt-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="workers" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 1]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="speedup"
                    name="Aceleración"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="efficiency"
                    name="Eficiencia"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-muted p-4 rounded-md mt-4">
              <h4 className="font-medium mb-2">Rendimiento del Procesamiento Paralelo</h4>
              <p className="text-sm text-muted-foreground">
                Este gráfico muestra la aceleración (speedup) y la eficiencia del sistema al aumentar el número de
                trabajadores paralelos. La aceleración ideal sería igual al número de trabajadores, pero debido a la
                sobrecarga de comunicación y sincronización, la aceleración real es menor. La eficiencia (aceleración
                dividida por el número de trabajadores) disminuye a medida que se añaden más trabajadores, lo que indica
                rendimientos decrecientes.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
