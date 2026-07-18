"use client"

import { useState, useEffect, useRef } from "react"
import { Loader } from "lucide-react"

export default function CorrelationMatrix() {
  const [loading, setLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const renderedRef = useRef(false)

  useEffect(() => {
    // Simulación de carga de datos
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Efecto para renderizar cuando termine la carga
  useEffect(() => {
    if (!loading && !renderedRef.current) {
      // Pequeño delay para asegurar que el DOM esté listo
      setTimeout(() => {
        renderCorrelationMatrix()
      }, 100)
    }
  }, [loading])

  const renderCorrelationMatrix = async () => {
    try {
      // Importar D3 dinámicamente
      const d3 = await import("d3")
      const container = containerRef.current
      if (!container) return

      // Limpiar el contenedor
      container.innerHTML = ""

      // Datos de correlación simulados
      const correlationData = [
        { x: "PM2.5", y: "PM2.5", value: 1.0 },
        { x: "PM2.5", y: "PM10", value: 0.82 },
        { x: "PM2.5", y: "O₃", value: 0.31 },
        { x: "PM2.5", y: "NO₂", value: 0.67 },
        { x: "PM2.5", y: "CO", value: 0.58 },
        { x: "PM2.5", y: "Temp", value: -0.42 },
        { x: "PM2.5", y: "Hum", value: 0.35 },
        { x: "PM2.5", y: "Viento", value: -0.61 },

        { x: "PM10", y: "PM2.5", value: 0.82 },
        { x: "PM10", y: "PM10", value: 1.0 },
        { x: "PM10", y: "O₃", value: 0.25 },
        { x: "PM10", y: "NO₂", value: 0.59 },
        { x: "PM10", y: "CO", value: 0.51 },
        { x: "PM10", y: "Temp", value: -0.38 },
        { x: "PM10", y: "Hum", value: 0.29 },
        { x: "PM10", y: "Viento", value: -0.57 },

        { x: "O₃", y: "PM2.5", value: 0.31 },
        { x: "O₃", y: "PM10", value: 0.25 },
        { x: "O₃", y: "O₃", value: 1.0 },
        { x: "O₃", y: "NO₂", value: 0.43 },
        { x: "O₃", y: "CO", value: 0.22 },
        { x: "O₃", y: "Temp", value: 0.65 },
        { x: "O₃", y: "Hum", value: -0.48 },
        { x: "O₃", y: "Viento", value: -0.15 },

        { x: "NO₂", y: "PM2.5", value: 0.67 },
        { x: "NO₂", y: "PM10", value: 0.59 },
        { x: "NO₂", y: "O₃", value: 0.43 },
        { x: "NO₂", y: "NO₂", value: 1.0 },
        { x: "NO₂", y: "CO", value: 0.73 },
        { x: "NO₂", y: "Temp", value: -0.21 },
        { x: "NO₂", y: "Hum", value: 0.18 },
        { x: "NO₂", y: "Viento", value: -0.69 },

        { x: "CO", y: "PM2.5", value: 0.58 },
        { x: "CO", y: "PM10", value: 0.51 },
        { x: "CO", y: "O₃", value: 0.22 },
        { x: "CO", y: "NO₂", value: 0.73 },
        { x: "CO", y: "CO", value: 1.0 },
        { x: "CO", y: "Temp", value: -0.33 },
        { x: "CO", y: "Hum", value: 0.27 },
        { x: "CO", y: "Viento", value: -0.62 },

        { x: "Temp", y: "PM2.5", value: -0.42 },
        { x: "Temp", y: "PM10", value: -0.38 },
        { x: "Temp", y: "O₃", value: 0.65 },
        { x: "Temp", y: "NO₂", value: -0.21 },
        { x: "Temp", y: "CO", value: -0.33 },
        { x: "Temp", y: "Temp", value: 1.0 },
        { x: "Temp", y: "Hum", value: -0.71 },
        { x: "Temp", y: "Viento", value: 0.24 },

        { x: "Hum", y: "PM2.5", value: 0.35 },
        { x: "Hum", y: "PM10", value: 0.29 },
        { x: "Hum", y: "O₃", value: -0.48 },
        { x: "Hum", y: "NO₂", value: 0.18 },
        { x: "Hum", y: "CO", value: 0.27 },
        { x: "Hum", y: "Temp", value: -0.71 },
        { x: "Hum", y: "Hum", value: 1.0 },
        { x: "Hum", y: "Viento", value: -0.31 },

        { x: "Viento", y: "PM2.5", value: -0.61 },
        { x: "Viento", y: "PM10", value: -0.57 },
        { x: "Viento", y: "O₃", value: -0.15 },
        { x: "Viento", y: "NO₂", value: -0.69 },
        { x: "Viento", y: "CO", value: -0.62 },
        { x: "Viento", y: "Temp", value: 0.24 },
        { x: "Viento", y: "Hum", value: -0.31 },
        { x: "Viento", y: "Viento", value: 1.0 },
      ]

      const variables = ["PM2.5", "PM10", "O₃", "NO₂", "CO", "Temp", "Hum", "Viento"]
      const n = variables.length

      // Configurar dimensiones más grandes
      const margin = { top: 80, right: 80, bottom: 80, left: 80 }
      const containerWidth = container.clientWidth || 800
      const totalWidth = Math.max(700, containerWidth)
      const totalHeight = 700
      const width = totalWidth - margin.left - margin.right
      const height = totalHeight - margin.top - margin.bottom
      const cellSize = Math.min(width, height) / n

      // Crear el SVG
      const svg = d3
        .select(container)
        .append("svg")
        .attr("width", totalWidth)
        .attr("height", totalHeight)
        .style("background", "#fff")

      const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

      // Escala de colores
      const colorScale = d3.scaleLinear<string>().domain([-1, 0, 1]).range(["#ef4444", "#f8f9fa", "#22c55e"])

      // Crear las celdas
      const cells = g
        .selectAll(".cell")
        .data(correlationData)
        .enter()
        .append("g")
        .attr("class", "cell")
        .attr(
          "transform",
          (d) => `translate(${variables.indexOf(d.x) * cellSize}, ${variables.indexOf(d.y) * cellSize})`,
        )

      // Añadir rectángulos
      cells
        .append("rect")
        .attr("width", cellSize - 1)
        .attr("height", cellSize - 1)
        .style("fill", (d) => colorScale(d.value))
        .style("stroke", "#fff")
        .style("stroke-width", 1)

      // Añadir texto con mejor contraste
      cells
        .append("text")
        .attr("x", cellSize / 2)
        .attr("y", cellSize / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .style("font-family", "Arial, sans-serif")
        .style("fill", (d) => {
          // Determinar color del texto basado en el valor
          if (Math.abs(d.value) > 0.5) {
            return "#ffffff"
          } else {
            return "#000000"
          }
        })
        .text((d) => d.value.toFixed(2))

      // Añadir etiquetas de filas
      g.selectAll(".row-label")
        .data(variables)
        .enter()
        .append("text")
        .attr("class", "row-label")
        .attr("x", -10)
        .attr("y", (d, i) => i * cellSize + cellSize / 2)
        .attr("text-anchor", "end")
        .attr("dominant-baseline", "central")
        .style("font-size", "14px")
        .style("font-weight", "600")
        .style("font-family", "Arial, sans-serif")
        .style("fill", "#374151")
        .text((d) => d)

      // Añadir etiquetas de columnas
      g.selectAll(".col-label")
        .data(variables)
        .enter()
        .append("text")
        .attr("class", "col-label")
        .attr("x", (d, i) => i * cellSize + cellSize / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .style("font-size", "14px")
        .style("font-weight", "600")
        .style("font-family", "Arial, sans-serif")
        .style("fill", "#374151")
        .text((d) => d)

      // Añadir leyenda
      const legendWidth = 300
      const legendHeight = 20
      const legendX = (width - legendWidth) / 2
      const legendY = height + 40

      const legend = g.append("g").attr("transform", `translate(${legendX}, ${legendY})`)

      // Crear gradiente para la leyenda
      const defs = svg.append("defs")
      const gradient = defs
        .append("linearGradient")
        .attr("id", "correlation-gradient")
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "0%")

      gradient.append("stop").attr("offset", "0%").attr("stop-color", "#ef4444")
      gradient.append("stop").attr("offset", "50%").attr("stop-color", "#f8f9fa")
      gradient.append("stop").attr("offset", "100%").attr("stop-color", "#22c55e")

      // Rectángulo de la leyenda
      legend
        .append("rect")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "url(#correlation-gradient)")
        .style("stroke", "#ccc")

      // Escala y eje de la leyenda
      const legendScale = d3.scaleLinear().domain([-1, 1]).range([0, legendWidth])
      const legendAxis = d3.axisBottom(legendScale).ticks(5).tickFormat(d3.format(".1f"))

      legend.append("g").attr("transform", `translate(0, ${legendHeight})`).call(legendAxis)

      // Título de la leyenda
      legend
        .append("text")
        .attr("x", legendWidth / 2)
        .attr("y", -5)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-weight", "600")
        .style("font-family", "Arial, sans-serif")
        .style("fill", "#374151")
        .text("Coeficiente de Correlación")

      renderedRef.current = true
    } catch (error) {
      console.error("Error al renderizar la matriz de correlación:", error)
    }
  }

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex items-center justify-center h-[500px]">
          <div className="flex flex-col items-center gap-2">
            <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Calculando correlaciones...</p>
          </div>
        </div>
      ) : (
        <>
          <div ref={containerRef} className="w-full h-[700px] overflow-auto"></div>
          <div className="bg-muted p-4 rounded-md">
            <h4 className="font-medium mb-2">Interpretación de la matriz de correlación</h4>
            <p className="text-sm text-muted-foreground">
              Esta matriz muestra la correlación entre diferentes contaminantes y variables meteorológicas. Los valores
              cercanos a 1 (verde) indican una fuerte correlación positiva, mientras que los valores cercanos a -1
              (rojo) indican una fuerte correlación negativa. Los valores cercanos a 0 indican poca o ninguna
              correlación. Observe cómo la velocidad del viento tiene una correlación negativa con la mayoría de los
              contaminantes, indicando que vientos más fuertes tienden a dispersar los contaminantes.
            </p>
          </div>
        </>
      )}
    </div>
  )
}
