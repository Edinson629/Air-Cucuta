import { ArrowLeft, FileText, Code, Server, Database, Cpu } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import SystemArchitectureDiagram from "@/components/system-architecture-diagram"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from 'next/image';


export default function DocumentacionPage() {
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
              <FileText className="h-4 w-4" />
              <span>Documentación Técnica</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Documentación Técnica</h1>
            <p className="text-muted-foreground">
              Información detallada sobre la arquitectura y algoritmos de AirCúcuta
            </p>
          </div>

          <Tabs defaultValue="arquitectura" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="arquitectura">Arquitectura</TabsTrigger>
              <TabsTrigger value="algoritmos">Algoritmos</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
            </TabsList>
            <TabsContent value="arquitectura" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Arquitectura del Sistema</CardTitle>
                  <CardDescription>Componentes principales y flujo de datos</CardDescription>
                </CardHeader>
                <CardContent>
                                
                <div className="mb-6 overflow-x-auto">
                  <div className="inline-block min-w-min">
                    <img 
                      src="/diagrama.svg" 
                      alt="Diagrama SVG"
                      className="w-[200%] max-w-none"
                    />
                  </div>
                </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Visión General</h3>
                      <p className="text-muted-foreground">
                        AirCúcuta utiliza una arquitectura distribuida para procesar, analizar y visualizar datos de
                        calidad del aire en tiempo real. El sistema está diseñado para manejar grandes volúmenes de
                        datos y proporcionar análisis avanzados mediante técnicas de ciencia de datos y programación
                        paralela.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Componentes Principales</h3>
                      <ul className="space-y-4">
                        <li className="flex gap-3">
                          <Server className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-medium">Servidor de Adquisición de Datos</h4>
                            <p className="text-sm text-muted-foreground">
                              Recopila datos de estaciones de monitoreo y fuentes externas mediante APIs.
                            </p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <Database className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-medium">Sistema de Almacenamiento</h4>
                            <p className="text-sm text-muted-foreground">
                              Base de datos de series temporales optimizada para datos de sensores ambientales.
                            </p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <Cpu className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-medium">Motor de Procesamiento Paralelo</h4>
                            <p className="text-sm text-muted-foreground">
                              Distribuye tareas de análisis entre múltiples nodos de procesamiento utilizando Web
                              Workers y computación paralela.
                            </p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <Code className="h-5 w-5 text-orange-600 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-medium">API de Servicios</h4>
                            <p className="text-sm text-muted-foreground">
                              Proporciona endpoints RESTful para acceder a datos procesados y resultados de análisis.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="algoritmos" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Algoritmos y Modelos</CardTitle>
                  <CardDescription>Detalles técnicos sobre los algoritmos implementados</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="fcfs" id="fcfs">
                      <AccordionTrigger>Algoritmo First Come First Served (FCFS)</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>
                            El algoritmo FCFS se implementa para gestionar la cola de solicitudes de datos, asegurando
                            que las peticiones se procesen en el orden exacto en que se reciben, sin priorización.
                          </p>
                          <div>
                            <h4 className="font-medium mb-2">Implementación</h4>
                            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                              {`class RequestQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  enqueue(request) {
    return new Promise((resolve) => {
      this.queue.push({ request, resolve });
      this.processQueue();
    });
  }

  async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    const { request, resolve } = this.queue.shift();
    
    try {
      const result = await this.processRequest(request);
      resolve(result);
    } catch (error) {
      console.error("Error processing request:", error);
    } finally {
      this.processing = false;
      this.processQueue();
    }
  }

  async processRequest(request) {
    // Procesamiento real de la solicitud
    return await fetchData(request);
  }
}`}
                            </pre>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Ventajas</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                              <li>Garantiza un orden justo de procesamiento</li>
                              <li>Evita la inanición de solicitudes</li>
                              <li>Implementación simple y eficiente</li>
                              <li>Predecible en términos de tiempo de espera</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="paralelo" id="paralelo">
                      <AccordionTrigger>Procesamiento Paralelo</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>
                            Utilizamos técnicas de programación paralela para distribuir la carga de trabajo entre
                            múltiples hilos de ejecución, aprovechando al máximo los recursos de hardware disponibles.
                          </p>
                          <div>
                            <h4 className="font-medium mb-2">Web Workers</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              Implementamos Web Workers para ejecutar cálculos intensivos en hilos separados, evitando
                              bloquear la interfaz de usuario.
                            </p>
                            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                              {`// Creación de un pool de workers
class WorkerPool {
  constructor(size, workerScript) {
    this.workers = [];
    this.queue = [];
    this.activeWorkers = 0;
    
    for (let i = 0; i < size; i++) {
      const worker = new Worker(workerScript);
      this.workers.push(worker);
    }
  }

  executeTask(data) {
    return new Promise((resolve, reject) => {
      const task = { data, resolve, reject };
      
      if (this.activeWorkers < this.workers.length) {
        this.runTask(task);
      } else {
        this.queue.push(task);
      }
    });
  }

  runTask(task) {
    const workerIndex = this.workers.findIndex(w => !w.busy);
    if (workerIndex === -1) return;
    
    const worker = this.workers[workerIndex];
    worker.busy = true;
    this.activeWorkers++;
    
    worker.onmessage = (e) => {
      task.resolve(e.data);
      worker.busy = false;
      this.activeWorkers--;
      
      if (this.queue.length > 0) {
        this.runTask(this.queue.shift());
      }
    };
    
    worker.onerror = (e) => {
      task.reject(e);
      worker.busy = false;
      this.activeWorkers--;
      
      if (this.queue.length > 0) {
        this.runTask(this.queue.shift());
      }
    };
    
    worker.postMessage(task.data);
  }
}`}
                            </pre>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Algoritmos Paralelos</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                              <li>Procesamiento de datos distribuido entre múltiples workers</li>
                              <li>Cálculo paralelo de índices de calidad del aire</li>
                              <li>Análisis de series temporales con paralelización de tareas</li>
                              <li>Entrenamiento distribuido de modelos predictivos</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="predictivo">
                      <AccordionTrigger>Modelos Predictivos</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>
                            Implementamos modelos de machine learning para predecir la calidad del aire en diferentes
                            ubicaciones, utilizando datos históricos y variables ambientales.
                          </p>
                          <div>
                            <h4 className="font-medium mb-2">Arquitectura del Modelo</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                              <li>Red neuronal LSTM (Long Short-Term Memory) para capturar patrones temporales</li>
                              <li>
                                Características de entrada: niveles históricos de contaminantes, datos meteorológicos,
                                variables temporales
                              </li>
                              <li>Salida: predicción de niveles de contaminantes para las próximas 24 horas</li>
                              <li>Entrenamiento distribuido utilizando TensorFlow.js</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Métricas de Rendimiento</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                              <li>Error cuadrático medio (MSE): 0.0023</li>
                              <li>Error absoluto medio (MAE): 0.0187</li>
                              <li>Coeficiente de determinación (R²): 0.89</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="clustering">
                      <AccordionTrigger>Análisis de Clusters</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>
                            Utilizamos algoritmos de clustering para identificar patrones y agrupar zonas con
                            características similares de contaminación.
                          </p>
                          <div>
                            <h4 className="font-medium mb-2">Algoritmo K-means</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              Implementamos K-means para agrupar estaciones de monitoreo según sus perfiles de
                              contaminación.
                            </p>
                            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                              {`// Implementación paralela de K-means
async function parallelKMeans(data, k, maxIterations = 100) {
  // Inicializar centroides aleatoriamente
  let centroids = initializeCentroids(data, k);
  let iterations = 0;
  let changed = true;
  
  // Crear pool de workers
  const workerPool = new WorkerPool(
    navigator.hardwareConcurrency || 4,
    '/workers/kmeans-worker.js'
  );
  
  while (changed && iterations < maxIterations) {
    // Dividir datos en chunks para procesamiento paralelo
    const chunks = chunkArray(data, workerPool.workers.length);
    
    // Asignar puntos a clusters en paralelo
    const assignments = await Promise.all(
      chunks.map(chunk => 
        workerPool.executeTask({
          action: 'assign',
          data: chunk,
          centroids
        })
      )
    );
    
    // Combinar resultados
    const allAssignments = assignments.flat();
    
    // Recalcular centroides
    const newCentroids = calculateNewCentroids(data, allAssignments, k);
    
    // Verificar si los centroides cambiaron
    changed = centroidsChanged(centroids, newCentroids);
    centroids = newCentroids;
    iterations++;
  }
  
  return {
    centroids,
    assignments: assignPointsToClusters(data, centroids),
    iterations
  };
}`}
                            </pre>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="api" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Documentación de API</CardTitle>
                  <CardDescription>Endpoints disponibles para integración con otros sistemas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Autenticación</h3>
                      <p className="text-muted-foreground mb-4">
                        Todas las solicitudes a la API requieren un token de autenticación JWT que debe incluirse en el
                        encabezado de la solicitud.
                      </p>
                      <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                        {`Authorization: Bearer <your_token_here>`}
                      </pre>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Endpoints</h3>
                      <div className="space-y-4">
                        <div className="border rounded-md p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                              GET
                            </span>
                            <code className="text-sm">/api/air-quality/{"{city}"}</code>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Obtiene la calidad del aire actual para una ciudad específica.
                          </p>
                          <div className="text-sm">
                            <strong>Parámetros:</strong>
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                              <li>
                                <code>city</code> (obligatorio): Nombre de la ciudad (ej. cucuta, bogota)
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="border rounded-md p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                              GET
                            </span>
                            <code className="text-sm">
                              /api/historical/{"{city}"}/{"{pollutant}"}
                            </code>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Obtiene datos históricos de un contaminante específico para una ciudad.
                          </p>
                          <div className="text-sm">
                            <strong>Parámetros:</strong>
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                              <li>
                                <code>city</code> (obligatorio): Nombre de la ciudad
                              </li>
                              <li>
                                <code>pollutant</code> (obligatorio): Tipo de contaminante (pm25, pm10, o3, no2, co)
                              </li>
                              <li>
                                <code>start</code> (opcional): Fecha de inicio (YYYY-MM-DD)
                              </li>
                              <li>
                                <code>end</code> (opcional): Fecha de fin (YYYY-MM-DD)
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="border rounded-md p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                              POST
                            </span>
                            <code className="text-sm">/api/predict</code>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Genera predicciones de calidad del aire para las próximas 24 horas.
                          </p>
                          <div className="text-sm">
                            <strong>Cuerpo de la solicitud:</strong>
                            <pre className="bg-muted p-4 rounded-md overflow-x-auto mt-2">
                              {`{
  "city": "cucuta",
  "station_id": "centro",
  "features": {
    "temperature": 28,
    "humidity": 65,
    "wind_speed": 8,
    "wind_direction": 180
  }
}`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
