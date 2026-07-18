"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatBotProps {
  onClose: () => void;
}

export default function ChatBot({ onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! Soy el asistente virtual de AirCúcuta. ¿En qué puedo ayudarte hoy? Puedo responder preguntas sobre calidad del aire, nuestra plataforma o brindarte soporte técnico.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll al final cuando hay nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus en el input cuando se abre el chat
  useEffect(() => {
    if (!isMinimized) {
      inputRef.current?.focus();
    }
  }, [isMinimized]);

  // Respuestas predefinidas del bot con contexto de conversación
  const getBotResponse = (userMessage: string, conversationHistory: Message[]): string => {
    const message = userMessage.toLowerCase().trim();
    const lastBotMessage = conversationHistory
      .slice()
      .reverse()
      .find((m) => m.sender === "bot")?.text.toLowerCase();

    // Respuestas contextuales
    if (message === "si" || message === "sí") {
      if (lastBotMessage?.includes("qué te gustaría saber")) {
        return "Puedes preguntarme sobre: la calidad del aire actual, niveles de contaminantes específicos (PM2.5, PM10, ozono), recomendaciones de salud, o información sobre nuestras estaciones de monitoreo. ¿Qué te interesa saber?";
      }
      if (lastBotMessage?.includes("niveles de contaminantes específicos")) {
        return "Los principales contaminantes que monitoreamos son: PM2.5 (18 μg/m³ - Bueno), PM10 (35 μg/m³ - Moderado), Ozono (45 ppb - Moderado), Dióxido de Nitrógeno (28 ppb - Bueno). ¿Te gustaría detalles sobre alguno en particular?";
      }
      if (lastBotMessage?.includes("recomendaciones específicas para algún grupo")) {
        return "Para grupos específicos:\n\n👶 Niños: Reducir actividades al aire libre\n🤰 Embarazadas: Evitar zonas de alto tráfico\n🧑‍🦳 Adultos mayores: Usar mascarilla en días con alta contaminación\n🤧 Personas con alergias: Mantener ventanas cerradas\n\n¿Necesitas más detalles sobre alguno?";
      }
    }

    // Saludos
    if (
      message.includes("hola") ||
      message.includes("buenos") ||
      message.includes("buenas")
    ) {
      if (conversationHistory.length > 2) {
        return "¡Hola de nuevo! ¿En qué más puedo ayudarte hoy?";
      }
      return "¡Hola! Me alegra poder ayudarte. ¿Qué te gustaría saber sobre la calidad del aire en Cúcuta?";
    }

    // Calidad del aire
    if (
      message.includes("calidad del aire") ||
      message.includes("contaminación") ||
      message.includes("aire")
    ) {
      return "La calidad del aire en Cúcuta actualmente está en nivel MODERADO (AQI: 75). ¿Te gustaría conocer:\n\n1. Los niveles específicos de contaminantes\n2. Recomendaciones para este nivel\n3. Ubicación de estaciones cercanas\n\nResponde con el número de tu interés o haz tu pregunta.";
    }

    // Contaminantes específicos
    if (message.includes("pm2.5") || message.includes("pm10")) {
      return "Niveles actuales:\n\n🔵 PM2.5: 18 μg/m³ (Bueno) - Partículas finas\n🟠 PM10: 35 μg/m³ (Moderado) - Partículas respirables\n\nEstos valores están dentro de los límites aceptables, pero personas sensibles deben tomar precauciones. ¿Quieres saber sobre otros contaminantes?";
    }

    if (message.includes("ozono") || message.includes("o3")) {
      return "El nivel actual de ozono (O₃) es de 45 ppb (Moderado). Recomendaciones:\n\n⏰ Evitar ejercicio intenso entre 12:00 PM - 4:00 PM\n🌳 Permanecer en áreas verdes cuando sea posible\n🚗 Reducir uso de vehículos en horas pico\n\n¿Necesitas más información?";
    }

    // Recomendaciones
    if (
      message.includes("recomendación") ||
      message.includes("qué hacer") ||
      message.includes("consejo") ||
      message.includes("2")
    ) {
      return "Recomendaciones para calidad del aire MODERADO:\n\n1️⃣ Mantener ventanas cerradas en horas pico (7-9 AM / 5-7 PM)\n2️⃣ Usar mascarilla si eres sensible\n3️⃣ Limitar ejercicio intenso al aire libre\n4️⃣ Mantenerte hidratado\n\n¿Necesitas recomendaciones específicas para algún grupo? (niños, embarazadas, asma, etc.)";
    }

    // Grupos sensibles
    if (
      message.includes("niños") ||
      message.includes("embarazada") ||
      message.includes("asma") ||
      message.includes("sensible") ||
      message.includes("adulto mayor")
    ) {
      return "Para grupos sensibles:\n\n👶 Niños: Limitar recreación al aire libre a 1 hora\n🤰 Embarazadas: Evitar zonas con alto tráfico vehicular\n🧓 Adultos mayores: Usar mascarilla N95 en exteriores\n🤧 Personas con asma: Tener medicación de rescate a mano\n\n¿Quieres más detalles para algún grupo en particular?";
    }

    // Datos y actualizaciones
    if (
      message.includes("datos") ||
      message.includes("actualización") ||
      message.includes("frecuencia")
    ) {
      return "📊 Datos técnicos:\n\n• Actualización: Cada hora\n• Última actualización: Hace 15 minutos\n• Fuente: 5 estaciones oficiales\n• Precisión: ±5% margen de error\n\nPuedes ver datos históricos y predicciones en nuestra sección de análisis. ¿Te interesa algo específico?";
    }

    // Problemas técnicos
    if (
      message.includes("problema") ||
      message.includes("error") ||
      message.includes("no funciona") ||
      message.includes("bug")
    ) {
      return "🛠️ Para ayudarte con problemas técnicos:\n\n1. Describe el problema en detalle\n2. Indica qué dispositivo/navegador usas\n3. Si es posible, adjunta captura de pantalla\n\nTambién puedes contactar a soporte@aircucuta.com. ¿Cuál es el problema que experimentas?";
    }

    // Mapa
    if (
      message.includes("mapa") ||
      message.includes("ubicación") ||
      message.includes("estación") ||
      message.includes("3")
    ) {
      return "📍 Estaciones de monitoreo en Cúcuta:\n\n1. Centro: Plaza de Banderas\n2. Atalaya: Parque Principal\n3. Los Patios: Alcaldía Municipal\n4. La Libertad: Parque Central\n5. El Malecón: Río Pamplonita\n\n¿Te gustaría saber los datos de alguna en particular?";
    }

    // API
    if (
      message.includes("api") ||
      message.includes("desarrollador") ||
      message.includes("integración")
    ) {
      return "💻 API para desarrolladores:\n\n• Tipo: REST\n• Datos: Tiempo real, históricos y predicciones\n• Acceso: Solicitar clave a info@aircucuta.com\n• Documentación: Disponible para usuarios registrados\n\n¿Necesitas información específica sobre la API?";
    }

    // Horarios
    if (
      message.includes("horario") ||
      message.includes("atención") ||
      message.includes("disponible")
    ) {
      return "⏳ Horarios de atención:\n\n• Chat: Lunes a Viernes (9AM - 5PM)\n• Soporte técnico: 24/7 por email\n• Oficina física: Villa del Rosario (8AM - 12PM / 2PM - 5PM)\n\nFuera de horario, responderemos en 24-48 horas. ¿En qué más puedo ayudarte?";
    }

    // Contacto
    if (
      message.includes("teléfono") ||
      message.includes("llamar") ||
      message.includes("contacto")
    ) {
      return "📞 Contacto:\n\n• Teléfono: +57 313 729 8287\n• WhatsApp: +57 304 343 4717\n• Email: info@aircucuta.com\n• Dirección: Barrio Centro #7-41, Villa del Rosario\n\nHorario de atención telefónica: 8AM - 6PM. ¿Prefieres algún medio en particular?";
    }

    // Predicciones
    if (
      message.includes("predicción") ||
      message.includes("pronóstico") ||
      message.includes("mañana")
    ) {
      return "🔮 Pronóstico para mañana:\n\n• Mañana: MODERADO (AQI 68-72)\n• Tarde: MODERADO a BUENO (AQI 55-60)\n• Pico de contaminación: 4:00 PM\n• Viento: 15 km/h del noreste\n\n¿Quieres ver el pronóstico extendido o para tu zona?";
    }

    // Despedidas
    if (
      message.includes("gracias") ||
      message.includes("adiós") ||
      message.includes("chao") ||
      message.includes("bye")
    ) {
      return "¡De nada! 😊 Recuerda que puedes consultarme cuando quieras sobre:\n\n• Calidad del aire actual\n• Recomendaciones de salud\n• Datos técnicos\n• Ubicación de estaciones\n\n¡Que tengas un excelente día y respira aire limpio!";
    }

    // Respuesta por defecto mejorada
    return "🤔 No estoy seguro de entender. Puedo ayudarte con:\n\n1. Calidad del aire actual\n2. Recomendaciones de salud\n3. Datos técnicos y estaciones\n4. Problemas con la plataforma\n\n¿Cuál de estos temas te interesa? (Responde con el número)";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simular tiempo de respuesta del bot
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage, messages),
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800 + Math.random() * 500); // 0.8-1.3 segundos de delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-3 shadow-lg flex items-center gap-2 transition-all"
        >
          <Bot className="h-5 w-5" />
          <span className="font-medium">AirCúcuta</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-md h-[70vh] max-h-[600px] shadow-2xl flex flex-col">
      <Card className="flex-1 flex flex-col border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <CardHeader className="bg-green-600 text-white p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <div>
                <CardTitle className="text-sm font-semibold">Asistente AirCúcuta</CardTitle>
                <p className="text-xs opacity-90">En línea • Responde preguntas sobre calidad del aire</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="text-white hover:bg-green-700 p-1 h-auto rounded-full"
                title="Minimizar"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-green-700 p-1 h-auto rounded-full"
                title="Cerrar"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Área de mensajes */}
        <CardContent className="flex-1 overflow-hidden p-0 flex flex-col bg-white">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-900 border border-gray-200"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.sender === "bot" && (
                      <Bot className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                    )}
                    {message.sender === "user" && (
                      <User className="h-4 w-4 mt-0.5 flex-shrink-0 text-white" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-green-100"
                            : "text-gray-500"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 max-w-[85%]">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-green-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Área de input */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 border-gray-300 focus-visible:ring-green-500"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-green-600 hover:bg-green-700 transition-colors"
                aria-label="Enviar mensaje"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Presiona Enter para enviar • Horario: 9:00 AM - 5:00 PM
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}