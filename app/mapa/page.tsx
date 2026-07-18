"use client"

import { useState, useEffect } from "react"
import MapView from "@/components/map-view"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

// Datos de estaciones por ciudad
const cityStations = {
  cucuta: [
    { id: 1, name: "Centro", address: "Av. 5 #12-34", status: "Buena" },
    { id: 2, name: "Atalaya", address: "Calle 7 #23-45", status: "Moderada" },
    { id: 3, name: "Los Patios", address: "Av. 2E #15-67", status: "Buena" },
    { id: 4, name: "La Libertad", address: "Calle 13 #8-90", status: "Insalubre" },
    { id: 5, name: "El Malecón", address: "Av. Libertadores #45-12", status: "Moderada" },
  ],
  bogota: [
    { id: 1, name: "Centro", address: "Carrera 7 #26-45", status: "Moderada" },
    { id: 2, name: "Chapinero", address: "Calle 63 #13-15", status: "Insalubre" },
    { id: 3, name: "Kennedy", address: "Av. Boyacá #38-12 Sur", status: "Insalubre" },
    { id: 4, name: "Suba", address: "Calle 145 #91-34", status: "Moderada" },
    { id: 5, name: "Usaquén", address: "Carrera 7 #118-30", status: "Buena" },
  ],
  medellin: [
    { id: 1, name: "Centro", address: "Carrera 50 #45-12", status: "Moderada" },
    { id: 2, name: "El Poblado", address: "Calle 10 #43E-30", status: "Buena" },
    { id: 3, name: "Laureles", address: "Circular 73 #39-22", status: "Buena" },
    { id: 4, name: "Belén", address: "Calle 30 #76-45", status: "Moderada" },
    { id: 5, name: "Robledo", address: "Carrera 80 #65-20", status: "Insalubre" },
  ],
  cali: [
    { id: 1, name: "Centro", address: "Calle 13 #5-45", status: "Moderada" },
    { id: 2, name: "Granada", address: "Av. 8 Norte #15-20", status: "Buena" },
    { id: 3, name: "San Fernando", address: "Calle 5 #38-12", status: "Buena" },
    { id: 4, name: "Ciudad Jardín", address: "Calle 16 #103-20", status: "Buena" },
    { id: 5, name: "Menga", address: "Av. 3 Norte #56-12", status: "Insalubre" },
  ],
  barranquilla: [
    { id: 1, name: "Centro", address: "Carrera 44 #34-12", status: "Moderada" },
    { id: 2, name: "Norte", address: "Calle 85 #53-45", status: "Buena" },
    { id: 3, name: "Riomar", address: "Carrera 59 #84-30", status: "Buena" },
    { id: 4, name: "Metropolitana", address: "Calle 45 #1-15", status: "Insalubre" },
    { id: 5, name: "Soledad", address: "Calle 30 #23-10", status: "Insalubre" },
  ],
}

// Función para generar datos aleatorios
const generateRandomStatus = () => {
  const statuses = ["Buena", "Moderada", "Insalubre"]
  return statuses[Math.floor(Math.random() * statuses.length)]
}

export default function MapPage() {
  const [selectedCity, setSelectedCity] = useState("cucuta")
  const [stations, setStations] = useState(cityStations.cucuta)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showHeatmap, setShowHeatmap] = useState(false)

  // Actualizar estaciones cuando cambia la ciudad
  useEffect(() => {
    setStations(cityStations[selectedCity as keyof typeof cityStations] || cityStations.cucuta)
  }, [selectedCity])

  // Manejar cambio de ciudad
  const handleCityChange = (city: string) => {
    setSelectedCity(city)
    window.cityChangeHandler?.(city)
  }

  // Actualizar datos
  const handleUpdateData = () => {
    setIsUpdating(true)

    // Actualizar datos de estaciones con valores aleatorios
    setTimeout(() => {
      const updatedStations = stations.map((station) => ({
        ...station,
        status: generateRandomStatus(),
      }))
      setStations(updatedStations)

      // Notificar al mapa para actualizar datos
      window.updateMapData?.()

      setIsUpdating(false)
    }, 1000)
  }

  // Alternar mapa de calor
  const toggleHeatmap = () => {
    setShowHeatmap(!showHeatmap)
    window.toggleHeatmap?.()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <ArrowLeft className="h-5 w-5" />
            <span>AirCúcuta</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <Select defaultValue={selectedCity} onValueChange={handleCityChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar ciudad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cucuta">Cúcuta</SelectItem>
                <SelectItem value="bogota">Bogotá</SelectItem>
                <SelectItem value="medellin">Medellín</SelectItem>
                <SelectItem value="cali">Cali</SelectItem>
                <SelectItem value="barranquilla">Barranquilla</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleUpdateData} disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Actualizando...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Actualizar datos
                </>
              )}
            </Button>
            <Button variant="outline" onClick={toggleHeatmap}>
              {showHeatmap ? "Ocultar mapa de calor" : "Mostrar mapa de calor"}
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mapa de Calidad del Aire</h1>
            <p className="text-muted-foreground">
              Visualiza la calidad del aire en diferentes zonas de{" "}
              {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)} y Colombia
            </p>
          </div>

          <Tabs defaultValue="mapa" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="mapa">Mapa</TabsTrigger>
              <TabsTrigger value="estaciones">Estaciones</TabsTrigger>
            </TabsList>
            <TabsContent value="mapa" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Mapa Interactivo</CardTitle>
                  <CardDescription>
                    Haz clic en cualquier estación para ver detalles de la calidad del aire
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[600px] w-full rounded-md overflow-hidden border">
                    <MapView city={selectedCity} showHeatmap={showHeatmap} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="estaciones" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Estaciones de Monitoreo</CardTitle>
                  <CardDescription>
                    Lista de estaciones de monitoreo de calidad del aire en{" "}
                    {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {stations.map((station) => (
                      <div key={station.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{station.name}</h3>
                          <p className="text-sm text-muted-foreground">{station.address}</p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm ${
                            station.status === "Buena"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : station.status === "Moderada"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          }`}
                        >
                          {station.status}
                        </div>
                      </div>
                    ))}
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
