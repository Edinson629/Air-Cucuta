"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "lucide-react"

// Definir las coordenadas de las ciudades
const cityCoordinates: Record<string, [number, number]> = {
  cucuta: [7.8939, -72.5078],
  bogota: [4.6097, -74.0817],
  medellin: [6.2476, -75.5658],
  cali: [3.4516, -76.532],
  barranquilla: [10.9685, -74.7813],
}

// Definir las estaciones para cada ciudad
const cityStations: Record<string, Array<{ name: string; coords: [number, number]; aqi: number }>> = {
  cucuta: [
    { name: "Centro", coords: [7.8939, -72.5078], aqi: 75 },
    { name: "Atalaya", coords: [7.8739, -72.5278], aqi: 85 },
    { name: "Los Patios", coords: [7.8389, -72.4978], aqi: 45 },
    { name: "La Libertad", coords: [7.9039, -72.5178], aqi: 155 },
    { name: "El Malecón", coords: [7.8839, -72.4878], aqi: 65 },
  ],
  bogota: [
    { name: "Centro", coords: [4.6097, -74.0817], aqi: 95 },
    { name: "Chapinero", coords: [4.6561, -74.0573], aqi: 85 },
    { name: "Kennedy", coords: [4.6297, -74.1618], aqi: 125 },
    { name: "Suba", coords: [4.7438, -74.0836], aqi: 65 },
    { name: "Usaquén", coords: [4.711, -74.0304], aqi: 55 },
  ],
  medellin: [
    { name: "Centro", coords: [6.2476, -75.5658], aqi: 85 },
    { name: "El Poblado", coords: [6.2086, -75.5695], aqi: 65 },
    { name: "Laureles", coords: [6.2453, -75.6058], aqi: 75 },
    { name: "Belén", coords: [6.2269, -75.6151], aqi: 95 },
    { name: "Robledo", coords: [6.2841, -75.5909], aqi: 105 },
  ],
  cali: [
    { name: "Centro", coords: [3.4516, -76.532], aqi: 80 },
    { name: "Granada", coords: [3.4698, -76.5282], aqi: 65 },
    { name: "San Fernando", coords: [3.4278, -76.54], aqi: 75 },
    { name: "Ciudad Jardín", coords: [3.3714, -76.538], aqi: 45 },
    { name: "Menga", coords: [3.48, -76.515], aqi: 95 },
  ],
  barranquilla: [
    { name: "Centro", coords: [10.9685, -74.7813], aqi: 70 },
    { name: "Norte", coords: [11.0089, -74.829], aqi: 55 },
    { name: "Riomar", coords: [11.0266, -74.8341], aqi: 45 },
    { name: "Metropolitana", coords: [10.9456, -74.799], aqi: 85 },
    { name: "Soledad", coords: [10.9184, -74.777], aqi: 95 },
  ],
}

interface MapViewProps {
  city?: string
  showHeatmap?: boolean
}

export default function MapView({ city = "cucuta", showHeatmap = false }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const heatmapLayerRef = useRef<any>(null)
  const isLoadingRef = useRef(true)
  const [selectedCity, setSelectedCity] = useState<string>(city)

  // Función para generar valores aleatorios de AQI
  const generateRandomAQI = () => {
    return Math.floor(Math.random() * 200) + 20
  }

  // Función para actualizar los datos del mapa
  const updateMapData = () => {
    if (!mapInstanceRef.current) return

    const L = window.L
    const map = mapInstanceRef.current

    // Limpiar marcadores existentes
    markersRef.current.forEach((marker) => {
      map.removeLayer(marker)
    })
    markersRef.current = []

    // Generar nuevos datos aleatorios para las estaciones
    const updatedStations = cityStations[selectedCity].map((station) => ({
      ...station,
      aqi: generateRandomAQI(),
    }))

    // Actualizar cityStations con los nuevos datos
    cityStations[selectedCity as keyof typeof cityStations] = updatedStations

    // Añadir nuevos marcadores
    addMarkers(L, map, updatedStations)

    // Actualizar mapa de calor si está visible
    if (showHeatmap && heatmapLayerRef.current) {
      updateHeatmap(L, map, updatedStations)
    }
  }

  // Función para añadir marcadores al mapa
  const addMarkers = (L: any, map: any, stations: any[]) => {
    stations.forEach((station) => {
      const markerColor = getMarkerColor(station.aqi)

      // Crear icono personalizado
      const icon = L.divIcon({
        className: "custom-div-icon",
        html: `<div style="background-color: ${markerColor}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      })

      // Añadir marcador al mapa
      const marker = L.marker(station.coords, { icon }).addTo(map)

      // Añadir popup con información
      marker.bindPopup(`
        <div style="min-width: 150px;">
          <h3 style="margin: 0; font-weight: bold;">${station.name}</h3>
          <p style="margin: 5px 0;">Índice de Calidad: <span style="font-weight: bold;">${station.aqi}</span></p>
          <p style="margin: 0;">Estado: <span style="color: ${markerColor}; font-weight: bold;">
            ${
              station.aqi <= 50
                ? "Bueno"
                : station.aqi <= 100
                  ? "Moderado"
                  : station.aqi <= 150
                    ? "Insalubre para grupos sensibles"
                    : station.aqi <= 200
                      ? "Insalubre"
                      : "Muy insalubre"
            }
          </span></p>
        </div>
      `)

      // Guardar referencia al marcador
      markersRef.current.push(marker)
    })
  }

  // Función para actualizar el mapa de calor
  const updateHeatmap = (L: any, map: any, stations: any[]) => {
    // Eliminar capa de calor existente si hay una
    if (heatmapLayerRef.current) {
      map.removeLayer(heatmapLayerRef.current)
    }

    // Crear datos para el mapa de calor
    const heatData = stations.map((station) => [
      station.coords[0],
      station.coords[1],
      station.aqi / 2, // Intensidad basada en AQI
    ])

    // Añadir puntos adicionales para suavizar el mapa de calor
    stations.forEach((station) => {
      const [lat, lng] = station.coords
      const radius = 0.02 // Radio aproximado para puntos adicionales
      const points = 8 // Número de puntos adicionales alrededor de cada estación

      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2
        const offsetLat = lat + Math.sin(angle) * radius * Math.random()
        const offsetLng = lng + Math.cos(angle) * radius * Math.random()
        const intensity = (station.aqi / 2) * (0.5 + Math.random() * 0.5) // Intensidad variable

        heatData.push([offsetLat, offsetLng, intensity])
      }
    })

    // Crear nueva capa de calor
    heatmapLayerRef.current = L.heatLayer(heatData, {
      radius: 25,
      blur: 15,
      maxZoom: 10,
      gradient: { 0.4: "blue", 0.6: "lime", 0.7: "yellow", 0.8: "orange", 1: "red" },
      minOpacity: 0.5,
    }).addTo(map)
  }

  // Función para alternar la visibilidad del mapa de calor
  const toggleHeatmap = () => {
    if (!mapInstanceRef.current) return

    const L = window.L
    const map = mapInstanceRef.current
    const stations = cityStations[selectedCity]

    if (heatmapLayerRef.current) {
      map.removeLayer(heatmapLayerRef.current)
      heatmapLayerRef.current = null
    } else {
      updateHeatmap(L, map, stations)
    }
  }

  // Función para actualizar el mapa cuando cambia la ciudad
  const updateMap = (city: string) => {
    if (!mapInstanceRef.current) return

    const L = window.L
    const map = mapInstanceRef.current
    const coordinates = cityCoordinates[city] || cityCoordinates.cucuta
    const stations = cityStations[city] || cityStations.cucuta

    // Actualizar la vista del mapa
    map.setView(coordinates, 13)

    // Limpiar marcadores existentes
    markersRef.current.forEach((marker) => {
      map.removeLayer(marker)
    })
    markersRef.current = []

    // Añadir nuevos marcadores
    addMarkers(L, map, stations)

    // Actualizar mapa de calor si está visible
    if (showHeatmap) {
      updateHeatmap(L, map, stations)
    }
  }

  // Función para determinar el color del marcador según el AQI
  const getMarkerColor = (aqi: number) => {
    if (aqi <= 50) return "green"
    if (aqi <= 100) return "yellow"
    if (aqi <= 150) return "orange"
    if (aqi <= 200) return "red"
    return "purple"
  }

  useEffect(() => {
    // Actualizar ciudad seleccionada cuando cambia la prop
    if (city !== selectedCity) {
      setSelectedCity(city)
      if (mapInstanceRef.current) {
        updateMap(city)
      }
    }
  }, [city])

  useEffect(() => {
    // Actualizar mapa de calor cuando cambia la prop
    if (mapInstanceRef.current) {
      if (showHeatmap) {
        updateHeatmap(window.L, mapInstanceRef.current, cityStations[selectedCity])
      } else if (heatmapLayerRef.current) {
        mapInstanceRef.current.removeLayer(heatmapLayerRef.current)
        heatmapLayerRef.current = null
      }
    }
  }, [showHeatmap, selectedCity])

  useEffect(() => {
    // Registrar manejadores globales
    window.cityChangeHandler = (city: string) => {
      setSelectedCity(city)
      if (mapInstanceRef.current) {
        updateMap(city)
      }
    }

    window.updateMapData = updateMapData
    window.toggleHeatmap = toggleHeatmap

    return () => {
      // Limpiar manejadores al desmontar
      delete window.cityChangeHandler
      delete window.updateMapData
      delete window.toggleHeatmap
    }
  }, [selectedCity, showHeatmap])

  useEffect(() => {
    // Función para cargar el mapa de Leaflet
    const loadMap = async () => {
      if (!mapRef.current || mapInstanceRef.current) return

      try {
        // Importar Leaflet y el plugin de mapa de calor dinámicamente
        const L = (await import("leaflet")).default
        window.L = L

        // Importar el plugin de mapa de calor
        await import("leaflet.heat")

        // Importar estilos de Leaflet
        await import("leaflet/dist/leaflet.css")

        // Coordenadas de la ciudad seleccionada
        const coordinates = cityCoordinates[selectedCity] || cityCoordinates.cucuta

        // Inicializar el mapa
        const map = L.map(mapRef.current).setView(coordinates, 13)

        // Añadir capa de OpenStreetMap
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        // Datos de estaciones para la ciudad seleccionada
        const stations = cityStations[selectedCity] || cityStations.cucuta

        // Añadir marcadores para cada estación
        addMarkers(L, map, stations)

        // Añadir mapa de calor si está habilitado
        if (showHeatmap) {
          updateHeatmap(L, map, stations)
        }

        // Guardar la instancia del mapa
        mapInstanceRef.current = map
        isLoadingRef.current = false
      } catch (error) {
        console.error("Error al cargar el mapa:", error)
        isLoadingRef.current = false
      }
    }

    loadMap()

    // Limpiar al desmontar
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
      markersRef.current = []
      if (heatmapLayerRef.current) {
        heatmapLayerRef.current = null
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      {isLoadingRef.current && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
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

// Extender el objeto Window para incluir nuestros manejadores
declare global {
  interface Window {
    L: any
    cityChangeHandler?: (city: string) => void
    updateMapData?: () => void
    toggleHeatmap?: () => void
  }
}
