"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "lucide-react"

export default function MapPreview() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadMap = async () => {
      if (!mapRef.current) return

      try {
        // Destruir el mapa previo si ya existe (Next.js puede reusar el div)
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove()
          mapInstanceRef.current = null
        }

        // ⚙️ Limpiar el contenedor manualmente
        mapRef.current.innerHTML = ""

        const L = (await import("leaflet")).default
        await import("leaflet/dist/leaflet.css")

        const cucuta = [7.8939, -72.5078]

        const map = L.map(mapRef.current, {
          zoomControl: false,
          dragging: false,
          scrollWheelZoom: false,
        }).setView(cucuta, 12)

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        const stations = [
          { name: "Centro", coords: [7.8939, -72.5078], aqi: 75, color: "yellow" },
          { name: "Atalaya", coords: [7.8739, -72.5278], aqi: 85, color: "yellow" },
          { name: "Los Patios", coords: [7.8389, -72.4978], aqi: 45, color: "green" },
          { name: "La Libertad", coords: [7.9039, -72.5178], aqi: 155, color: "red" },
          { name: "El Malecón", coords: [7.8839, -72.4878], aqi: 65, color: "yellow" },
        ]

        const getMarkerColor = (aqi: number) => {
          if (aqi <= 50) return "green"
          if (aqi <= 100) return "yellow"
          if (aqi <= 150) return "orange"
          if (aqi <= 200) return "red"
          return "purple"
        }

        stations.forEach((station) => {
          const markerColor = getMarkerColor(station.aqi)

          const icon = L.divIcon({
            className: "custom-div-icon",
            html: `<div style="background-color: ${markerColor}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          })

          L.marker(station.coords as [number, number], { icon }).addTo(map)
        })

        // Guardar la instancia del mapa
        mapInstanceRef.current = map

        // Finalizar la carga
        setIsLoading(false)
      } catch (error) {
        console.error("Error al cargar el mapa:", error)
        setIsLoading(false)
      }
    }

    loadMap()

    // Limpiar el mapa al desmontar el componente
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }

      // ⚙️ Limpiar el contenedor manualmente (esto evita el error)
      if (mapRef.current) {
        mapRef.current.innerHTML = ""
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 z-10">
          <div className="flex flex-col items-center gap-2">
            <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Cargando mapa...</p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full z-0" />
    </div>
  )
}
