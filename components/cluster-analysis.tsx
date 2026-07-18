"use client"

import { useState, useEffect, useRef } from "react"
import { Loader } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export default function ClusterAnalysis() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("mapa")
  const clusterMapRef = useRef<HTMLDivElement>(null)
  const scatterPlotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulación de carga de datos
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Efecto para renderizar cuando cambia el tab activo y no está cargando
  useEffect(() => {
    if (!loading && activeTab) {
      // Pequeño delay para asegurar que el contenedor esté visible
      const timer = setTimeout(() => {
        if (activeTab === "mapa") {
          renderClusterMap()
        } else if (activeTab === "scatter") {
          renderScatterPlot()
        }
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [loading, activeTab])

  const renderClusterMap = async () => {
    try {
      // Importar D3 dinámicamente
      const d3 = await import("d3")
      const container = clusterMapRef.current
      if (!container) {
        console.log("Container not found for cluster map")
        return
      }

      // Verificar que el contenedor esté visible y tenga dimensiones
      const rect = container.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) {
        console.log("Container not visible, retrying...")
        setTimeout(() => renderClusterMap(), 200)
        return
      }

      // Limpiar el contenedor
      container.innerHTML = ""

      // Configurar dimensiones
      const width = container.clientWidth || 800
      const height = 400

      console.log("Rendering cluster map with dimensions:", width, height)

      // Crear el SVG
      const svg = d3
        .select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(0,0)`)

      // Datos simulados de estaciones con clusters
      const stations = [
        { id: 1, name: "Centro", x: width * 0.5, y: height * 0.5, cluster: 0 },
        { id: 2, name: "Atalaya", x: width * 0.4, y: height * 0.4, cluster: 0 },
        { id: 3, name: "Los Patios", x: width * 0.7, y: height * 0.3, cluster: 1 },
        { id: 4, name: "La Libertad", x: width * 0.3, y: height * 0.6, cluster: 0 },
        { id: 5, name: "El Malecón", x: width * 0.6, y: height * 0.7, cluster: 2 },
        { id: 6, name: "San Luis", x: width * 0.2, y: height * 0.5, cluster: 0 },
        { id: 7, name: "Aeropuerto", x: width * 0.8, y: height * 0.2, cluster: 1 },
        { id: 8, name: "Terminal", x: width * 0.4, y: height * 0.7, cluster: 2 },
        { id: 9, name: "Universidad", x: width * 0.6, y: height * 0.4, cluster: 1 },
        { id: 10, name: "Parque", x: width * 0.7, y: height * 0.6, cluster: 2 },
      ]

      // Colores para los clusters
      const clusterColors = ["#3b82f6", "#22c55e", "#f97316"]

      // Dibujar círculos para las estaciones
      svg
        .selectAll("circle")
        .data(stations)
        .enter()
        .append("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 15)
        .style("fill", (d) => clusterColors[d.cluster])
        .style("stroke", "#fff")
        .style("stroke-width", 2)

      // Añadir etiquetas
      svg
        .selectAll("text")
        .data(stations)
        .enter()
        .append("text")
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y + 30)
        .attr("text-anchor", "middle")
        .text((d) => d.name)
        .style("font-size", "12px")
        .style("font-weight", "bold")

      // Añadir leyenda
      const legend = svg.append("g").attr("transform", `translate(${width - 150}, 20)`)

      const clusterNames = ["Urbano Alto", "Residencial", "Industrial"]

      clusterNames.forEach((name, i) => {
        const legendRow = legend.append("g").attr("transform", `translate(0, ${i * 25})`)

        legendRow.append("rect").attr("width", 15).attr("height", 15).style("fill", clusterColors[i])

        legendRow.append("text").attr("x", 20).attr("y", 12).text(name).style("font-size", "12px")
      })

      console.log("Cluster map rendered successfully")
    } catch (error) {
      console.error("Error al renderizar el mapa de clusters:", error)
    }
  }

  const renderScatterPlot = async () => {
    try {
      // Importar D3 dinámicamente
      const d3 = await import("d3")
      const container = scatterPlotRef.current
      if (!container) {
        console.log("Container not found for scatter plot")
        return
      }

      // Verificar que el contenedor esté visible y tenga dimensiones
      const rect = container.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) {
        console.log("Container not visible, retrying...")
        setTimeout(() => renderScatterPlot(), 200)
        return
      }

      // Limpiar el contenedor
      container.innerHTML = ""

      // Configurar dimensiones
      const margin = { top: 20, right: 30, bottom: 40, left: 50 }
      const width = (container.clientWidth || 800) - margin.left - margin.right
      const height = 400 - margin.top - margin.bottom

      console.log("Rendering scatter plot with dimensions:", width, height)

      // Crear el SVG
      const svg = d3
        .select(container)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)

      // Datos simulados para el scatter plot
      const data = [
        { id: 1, pm25: 18, no2: 22, cluster: 0 },
        { id: 2, pm25: 20, no2: 25, cluster: 0 },
        { id: 3, pm25: 10, no2: 15, cluster: 1 },
        { id: 4, pm25: 22, no2: 28, cluster: 0 },
        { id: 5, pm25: 15, no2: 30, cluster: 2 },
        { id: 6, pm25: 25, no2: 26, cluster: 0 },
        { id: 7, pm25: 8, no2: 12, cluster: 1 },
        { id: 8, pm25: 17, no2: 32, cluster: 2 },
        { id: 9, pm25: 12, no2: 18, cluster: 1 },
        { id: 10, pm25: 16, no2: 29, cluster: 2 },
      ]

      // Escalas
      const x = d3
        .scaleLinear()
        .domain([0, (d3.max(data, (d) => d.pm25) as number) + 5])
        .range([0, width])

      const y = d3
        .scaleLinear()
        .domain([0, (d3.max(data, (d) => d.no2) as number) + 5])
        .range([height, 0])

      // Colores para los clusters
      const clusterColors = ["#3b82f6", "#22c55e", "#f97316"]

      // Ejes
      svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x))

      svg.append("g").call(d3.axisLeft(y))

      // Puntos
      svg
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => x(d.pm25))
        .attr("cy", (d) => y(d.no2))
        .attr("r", 8)
        .style("fill", (d) => clusterColors[d.cluster])
        .style("stroke", "#fff")
        .style("stroke-width", 1)

      // Etiquetas de ejes
      svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 5)
        .text("PM2.5 (μg/m³)")
        .style("font-size", "12px")

      svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 15)
        .attr("x", -height / 2)
        .text("NO₂ (ppb)")
        .style("font-size", "12px")

      // Centroides (simulados)
      const centroids = [
        { pm25: 21, no2: 25, cluster: 0 },
        { pm25: 10, no2: 15, cluster: 1 },
        { pm25: 16, no2: 30, cluster: 2 },
      ]

      // Dibujar centroides
      svg
        .selectAll(".centroid")
        .data(centroids)
        .enter()
        .append("circle")
        .attr("class", "centroid")
        .attr("cx", (d) => x(d.pm25))
        .attr("cy", (d) => y(d.no2))
        .attr("r", 12)
        .style("fill", (d) => clusterColors[d.cluster])
        .style("stroke", "#000")
        .style("stroke-width", 2)
        .style("stroke-dasharray", "3,3")

      console.log("Scatter plot rendered successfully")
    } catch (error) {
      console.error("Error al renderizar el scatter plot:", error)
    }
  }

  const handleTabChange = (value: string) => {
    console.log("Tab changed to:", value)
    setActiveTab(value)
  }

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex items-center justify-center h-[500px]">
          <div className="flex flex-col items-center gap-2">
            <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Ejecutando algoritmo de clustering...</p>
          </div>
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="mapa">Mapa de Clusters</TabsTrigger>
            <TabsTrigger value="scatter">Gráfico de Dispersión</TabsTrigger>
          </TabsList>
          <TabsContent value="mapa" className="mt-4">
            <div className="h-[400px] w-full">
              <div ref={clusterMapRef} className="w-full h-full border border-gray-200 rounded"></div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium text-blue-600 mb-2">Cluster Urbano Alto</h3>
                  <p className="text-sm text-muted-foreground">
                    Zonas con alta densidad poblacional y tráfico intenso. Niveles elevados de PM2.5 y NO₂.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium text-green-600 mb-2">Cluster Residencial</h3>
                  <p className="text-sm text-muted-foreground">
                    Áreas residenciales con menor tráfico y más espacios verdes. Niveles moderados a bajos de
                    contaminantes.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium text-orange-600 mb-2">Cluster Industrial</h3>
                  <p className="text-sm text-muted-foreground">
                    Zonas con actividad industrial. Niveles moderados de PM2.5 y elevados de NO₂ y otros gases.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="scatter" className="mt-4">
            <div className="h-[400px] w-full">
              <div ref={scatterPlotRef} className="w-full h-full border border-gray-200 rounded"></div>
            </div>
            <div className="bg-muted p-4 rounded-md mt-4">
              <h4 className="font-medium mb-2">Interpretación del gráfico de dispersión</h4>
              <p className="text-sm text-muted-foreground">
                Este gráfico muestra la relación entre los niveles de PM2.5 y NO₂ en diferentes estaciones de monitoreo.
                Los puntos están coloreados según el cluster al que pertenecen, y los círculos más grandes con borde
                punteado representan los centroides de cada cluster. Observe cómo las estaciones se agrupan naturalmente
                según sus perfiles de contaminación, lo que permite identificar zonas con características similares.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
