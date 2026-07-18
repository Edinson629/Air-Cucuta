"use client"

import { useState, useEffect, useRef } from "react"

// Interfaz para las solicitudes
interface Request {
  id: number
  type: string
  priority: number
  timestamp: number
  processingTime: number
  status: "pending" | "processing" | "completed"
}

// Implementación de la cola FCFS
class FCFSQueue {
  private queue: Request[] = []
  private processing = false
  private onQueueUpdate: (queue: Request[]) => void
  private onProcessed: (request: Request) => void

  constructor(onQueueUpdate: (queue: Request[]) => void, onProcessed: (request: Request) => void) {
    this.onQueueUpdate = onQueueUpdate
    this.onProcessed = onProcessed
  }

  enqueue(request: Request): void {
    this.queue.push(request)
    this.onQueueUpdate([...this.queue])
    this.processQueue()
  }

  private async processQueue(): Promise<void> {
    if (this.processing || this.queue.length === 0) return

    this.processing = true
    const request = this.queue[0]
    request.status = "processing"
    this.onQueueUpdate([...this.queue])

    // Simular el tiempo de procesamiento
    await new Promise((resolve) => setTimeout(resolve, request.processingTime))

    // Marcar como completada y eliminar de la cola
    request.status = "completed"
    this.queue.shift()
    this.onQueueUpdate([...this.queue])
    this.onProcessed(request)

    this.processing = false
    this.processQueue()
  }

  getQueue(): Request[] {
    return [...this.queue]
  }
}

export default function DataProcessingQueue() {
  const [queue, setQueue] = useState<Request[]>([])
  const [processed, setProcessed] = useState<Request[]>([])
  const [nextId, setNextId] = useState(1)
  const queueRef = useRef<FCFSQueue | null>(null)

  useEffect(() => {
    // Inicializar la cola FCFS
    queueRef.current = new FCFSQueue(
      (updatedQueue) => setQueue(updatedQueue),
      (processedRequest) => setProcessed((prev) => [processedRequest, ...prev].slice(0, 5)),
    )

    // Generar solicitudes aleatorias periódicamente
    const interval = setInterval(() => {
      if (queueRef.current) {
        const requestTypes = ["datos", "análisis", "predicción", "mapa"]
        const type = requestTypes[Math.floor(Math.random() * requestTypes.length)]
        const priority = Math.floor(Math.random() * 3) + 1
        const processingTime = Math.floor(Math.random() * 2000) + 500

        const request: Request = {
          id: nextId,
          type,
          priority,
          timestamp: Date.now(),
          processingTime,
          status: "pending",
        }

        queueRef.current.enqueue(request)
        setNextId((prev) => prev + 1)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [nextId])

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-2">Cola de Procesamiento (FCFS)</h3>
        <div className="border rounded-md p-4 max-h-[200px] overflow-y-auto">
          {queue.length === 0 ? (
            <p className="text-sm text-muted-foreground">No hay solicitudes en la cola</p>
          ) : (
            <div className="space-y-2">
              {queue.map((request, index) => (
                <div
                  key={request.id}
                  className={`p-2 border rounded-md flex items-center justify-between ${
                    request.status === "processing" ? "bg-blue-50 border-blue-200" : ""
                  }`}
                >
                  <div>
                    <span className="font-medium">#{request.id}</span>
                    <span className="text-sm text-muted-foreground ml-2">{request.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-muted">
                      {index === 0 && request.status === "processing" ? "Procesando..." : `Posición: ${index + 1}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Solicitudes Procesadas</h3>
        <div className="border rounded-md p-4 max-h-[200px] overflow-y-auto">
          {processed.length === 0 ? (
            <p className="text-sm text-muted-foreground">No hay solicitudes procesadas</p>
          ) : (
            <div className="space-y-2">
              {processed.map((request) => (
                <div
                  key={request.id}
                  className="p-2 border rounded-md flex items-center justify-between bg-green-50 border-green-200"
                >
                  <div>
                    <span className="font-medium">#{request.id}</span>
                    <span className="text-sm text-muted-foreground ml-2">{request.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Completada</span>
                    <span className="text-xs text-muted-foreground">{(request.processingTime / 1000).toFixed(1)}s</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
