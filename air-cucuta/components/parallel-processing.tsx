"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"

// Simulación de un Worker
class SimulatedWorker {
  id: number
  busy = false
  progress = 0
  taskName = ""
  interval: NodeJS.Timeout | null = null

  constructor(id: number) {
    this.id = id
  }

  executeTask(taskName: string, duration: number): Promise<void> {
    return new Promise((resolve) => {
      this.busy = true
      this.taskName = taskName
      this.progress = 0

      // Simular progreso
      this.interval = setInterval(() => {
        this.progress += 5
        if (this.progress >= 100) {
          this.completeTask()
          resolve()
        }
      }, duration / 20)
    })
  }

  completeTask(): void {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
    this.busy = false
    this.progress = 0
    this.taskName = ""
  }
}

// Pool de Workers
class WorkerPool {
  workers: SimulatedWorker[]
  onUpdate: () => void

  constructor(size: number, onUpdate: () => void) {
    this.workers = Array.from({ length: size }, (_, i) => new SimulatedWorker(i + 1))
    this.onUpdate = onUpdate
  }

  async executeTask(taskName: string, duration: number): Promise<void> {
    // Buscar un worker disponible
    const availableWorker = this.workers.find((w) => !w.busy)
    if (availableWorker) {
      await availableWorker.executeTask(taskName, duration)
      this.onUpdate()
    } else {
      // Si no hay workers disponibles, esperar y reintentar
      await new Promise((resolve) => setTimeout(resolve, 500))
      return this.executeTask(taskName, duration)
    }
  }

  getWorkers(): SimulatedWorker[] {
    return [...this.workers]
  }
}

export default function ParallelProcessing() {
  const [workers, setWorkers] = useState<SimulatedWorker[]>([])
  const [taskCount, setTaskCount] = useState(0)
  const [workerPoolRef, setWorkerPoolRef] = useState<WorkerPool | null>(null)

  useEffect(() => {
    // Crear el pool de workers
    const pool = new WorkerPool(4, () => {
      // Actualizar el estado cuando cambie el estado de los workers
      setWorkers([...pool.getWorkers()])
    })
    setWorkerPoolRef(pool)
    setWorkers(pool.getWorkers())

    // Generar tareas periódicamente
    const taskInterval = setInterval(() => {
      const taskTypes = [
        "Análisis de datos",
        "Predicción",
        "Procesamiento de imagen",
        "Cálculo de índices",
        "Clustering",
      ]
      const taskName = taskTypes[Math.floor(Math.random() * taskTypes.length)]
      const duration = Math.floor(Math.random() * 5000) + 2000

      pool.executeTask(taskName, duration)
      setTaskCount((prev) => prev + 1)
      setWorkers([...pool.getWorkers()])
    }, 3000)

    return () => clearInterval(taskInterval)
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Procesamiento Paralelo</h3>
        <span className="text-sm text-muted-foreground">Tareas totales: {taskCount}</span>
      </div>

      <div className="space-y-3">
        {workers.map((worker) => (
          <div key={worker.id} className="border rounded-md p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${worker.busy ? "bg-green-500 animate-pulse" : "bg-gray-300"}`}
                ></div>
                <span className="font-medium">Worker {worker.id}</span>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-muted">{worker.busy ? "Ocupado" : "Disponible"}</span>
            </div>
            {worker.busy && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{worker.taskName}</span>
                  <span>{worker.progress}%</span>
                </div>
                <Progress value={worker.progress} className="h-2" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-muted p-4 rounded-md">
        <h4 className="font-medium mb-2">Acerca del procesamiento paralelo</h4>
        <p className="text-sm text-muted-foreground">
          Este componente simula un sistema de procesamiento paralelo utilizando un pool de workers. Cada worker puede
          ejecutar una tarea independientemente, lo que permite procesar múltiples solicitudes simultáneamente. Las
          tareas se distribuyen automáticamente a los workers disponibles, maximizando la utilización de recursos y
          reduciendo el tiempo total de procesamiento.
        </p>
      </div>
    </div>
  )
}
