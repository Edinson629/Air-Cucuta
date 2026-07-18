# 🌬️ AirCúcuta

AirCúcuta es una plataforma web interactiva diseñada para visualizar, monitorear y analizar la calidad del aire en Cúcuta y otras ciudades de Colombia. La aplicación permite consultar indicadores ambientales, mapas interactivos, niveles de contaminantes, análisis de datos y recomendaciones para la población.

## 📋 Descripción

La plataforma centraliza información relacionada con la calidad del aire mediante una interfaz intuitiva que integra mapas, gráficos y métricas ambientales. Su objetivo es facilitar la comprensión del estado de la calidad del aire y apoyar la toma de decisiones tanto de ciudadanos como de entidades interesadas en la gestión ambiental.

## ❗ Problema que resuelve

El acceso a información ambiental suele encontrarse disperso en múltiples fuentes y formatos difíciles de interpretar. AirCúcuta resuelve este problema al ofrecer una plataforma unificada que:

- Visualiza datos de calidad del aire de forma clara e interactiva.
- Permite identificar zonas con diferentes niveles de contaminación.
- Facilita el análisis de contaminantes atmosféricos.
- Proporciona recomendaciones para reducir riesgos asociados a la contaminación del aire.
- Mejora la comprensión de los indicadores ambientales mediante gráficos y visualizaciones.

## 🎯 Resultado

Flujo de trabajo claro y visual que mejoró la organización, el acceso y el seguimiento de la información sobre la calidad del aire mediante mapas interactivos, análisis de contaminantes y visualizaciones en tiempo real.

## ✨ Características

- 📍 Mapa interactivo de estaciones de monitoreo.
- 📊 Visualización de indicadores de calidad del aire.
- 🌫️ Consulta de contaminantes atmosféricos.
- 📈 Gráficos y análisis de datos ambientales.
- 💡 Recomendaciones de salud según el nivel de contaminación.
- 📚 Sección de documentación informativa.
- 🌙 Soporte para modo claro y oscuro.

## 🛠️ Tecnologías Utilizadas

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

### Visualización de Datos
- Recharts
- D3.js

### Mapas
- Leaflet
- Leaflet Heat

### Formularios y Validación
- React Hook Form
- Zod

### UI y Componentes
- Radix UI
- Lucide React
- Sonner

### Diagramación
- Mermaid
- React Mermaid

## 📂 Estructura del Proyecto

```bash
app/
├── analisis/
├── contaminantes/
├── documentacion/
├── mapa/
├── recomendaciones/
├── contact/
├── privacy/
└── page.tsx

components/
├── air-quality-card
├── map-view
├── pollution-chart
├── recommendation-card
└── prediction-banner
```

## 🚀 Instalación

Clonar el repositorio:

```bash
git clone https://github.com/edinson629/AirCucuta.git
```

Entrar al directorio:

```bash
cd air-cucuta
```

Instalar dependencias:

```bash
npm install
```

Ejecutar en modo desarrollo:

```bash
npm run dev
```

Abrir en el navegador:

```bash
http://localhost:3000
```

## 📊 Módulos Principales

### Inicio
Muestra información general sobre la calidad del aire y acceso rápido a las funcionalidades principales.

### Mapa
Visualización geográfica de estaciones de monitoreo y estado de calidad del aire.

### Contaminantes
Información detallada sobre contaminantes atmosféricos y sus efectos.

### Recomendaciones
Consejos para proteger la salud según las condiciones ambientales.

### Análisis
Gráficos e indicadores para interpretar tendencias y patrones de contaminación.

### Documentación
Información técnica y educativa relacionada con la calidad del aire.

## 👨‍💻 Autores
Jose Jimenez && Edinson Palacio
Proyecto desarrollado como solución tecnológica para la visualización y análisis de la calidad del aire en Cúcuta y Colombia.

---

🌱 Contribuyendo a una mejor comprensión de la calidad del aire mediante tecnología y visualización de datos.