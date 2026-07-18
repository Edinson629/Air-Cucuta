"use client"

import { useEffect, useRef } from "react"

export default function SystemArchitectureDiagram() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        // Importar mermaid dinámicamente
        const mermaid = (await import("mermaid")).default

        // Configurar mermaid
        mermaid.initialize({
          startOnLoad: true,
          theme: "neutral",
          flowchart: {
            htmlLabels: true,
            curve: "basis",
          },
          securityLevel: "loose",
        })

        if (containerRef.current) {
          // Definir el diagrama
          const diagram = `
          flowchart TD
            A["Estaciones de Monitoreo"] -->|Datos en tiempo real| B["Servidor de Adquisición"]
            Z["APIs Externas"] -->|Datos complementarios| B
            
            B -->|Cola FCFS| C["Sistema de Almacenamiento"]
            C -->|Datos históricos| D["Motor de Procesamiento Paralelo"]
            
            D -->|Análisis básico| E["API de Servicios"]
            D -->|Procesamiento paralelo| F["Análisis Avanzado"]
            
            F -->|Modelos predictivos| G["Predicciones"]
            F -->|Clustering| H["Patrones"]
            F -->|Series temporales| I["Tendencias"]
            
            G --> E
            H --> E
            I --> E
            
            E -->|Datos procesados| J["Interfaz Web"]
            E -->|Alertas| K["Sistema de Notificaciones"]
            
            classDef primary fill:#3b82f6,stroke:#1d4ed8,color:#fff
            classDef secondary fill:#22c55e,stroke:#166534,color:#fff
            classDef tertiary fill:#8b5cf6,stroke:#6d28d9,color:#fff
            classDef quaternary fill:#f97316,stroke:#c2410c,color:#fff
            
            class A,Z secondary
            class B,C primary
            class D,F tertiary
            class E,G,H,I,J,K quaternary
          `

          // Renderizar el diagrama
          containerRef.current.innerHTML = diagram
          mermaid.contentLoaded()
        }
      } catch (error) {
        console.error("Error al renderizar el diagrama:", error)
      }
    }

    renderDiagram()
  }, [])

  return (
    <div className="w-full overflow-x-auto">
      <div className="mermaid min-w-[800px]" ref={containerRef}></div>
    </div>
  )
}
