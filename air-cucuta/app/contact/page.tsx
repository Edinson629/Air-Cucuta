"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Phone, Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ThemeToggle } from "@/components/theme-toggle"
import ChatBot from "@/components/chat-bot"

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envío del formulario
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Resetear el formulario
    const form = e.target as HTMLFormElement
    form.reset()

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
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
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Contacto</h1>
            <p className="text-muted-foreground">
              ¿Tienes preguntas sobre la calidad del aire? Estamos aquí para ayudarte
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                  <CardDescription>Múltiples formas de comunicarte con nosotros</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-100">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Teléfonos</h3>
                      <p className="text-sm text-muted-foreground">
                        <a href="tel:+573137298287" className="hover:text-green-600">
                          +57 313 729 8287
                        </a>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <a href="tel:+573043434717" className="hover:text-green-600">
                          +57 304 343 4717
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Correo Electrónico</h3>
                      <p className="text-sm text-muted-foreground">
                        <a href="mailto:info@aircucuta.com" className="hover:text-blue-600">
                          info@aircucuta.com
                        </a>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <a href="mailto:soporte@aircucuta.com" className="hover:text-blue-600">
                          soporte@aircucuta.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-orange-100">
                      <MapPin className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Dirección</h3>
                      <p className="text-sm text-muted-foreground">
                        Avenida Gran Colombia #12-96
                        <br />
                        Centro, Cúcuta, Norte de Santander
                        <br />
                        Colombia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-purple-100">
                      <Clock className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Horarios de Atención</h3>
                      <p className="text-sm text-muted-foreground">
                        Lunes a Viernes: 8:00 AM - 6:00 PM
                        <br />
                        Sábados: 9:00 AM - 2:00 PM
                        <br />
                        Domingos: Cerrado
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Soporte Técnico</CardTitle>
                  <CardDescription>Para problemas técnicos y reportes de errores</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-red-100">
                      <MessageSquare className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Chat en Vivo</h3>
                      <p className="text-sm text-muted-foreground">Disponible de Lunes a Viernes, 9:00 AM - 5:00 PM</p>
                      <Button variant="outline" size="sm" className="mt-2" onClick={() => setIsChatOpen(true)}>
                        Iniciar Chat
                      </Button>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Reportar Problemas</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Si encuentras algún problema con la plataforma, por favor incluye:
                    </p>
                    <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                      <li>Descripción detallada del problema</li>
                      <li>Pasos para reproducir el error</li>
                      <li>Navegador y versión que estás usando</li>
                      <li>Capturas de pantalla si es posible</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Envíanos un Mensaje</CardTitle>
                <CardDescription>Completa el formulario y te responderemos pronto</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {isSubmitted && (
                    <div className="p-4 bg-green-100 border border-green-200 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <p className="text-green-800 font-medium">¡Mensaje enviado exitosamente!</p>
                      </div>
                      <p className="text-green-700 text-sm mt-1">Te responderemos en un plazo de 24-48 horas.</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="text-sm font-medium">
                        Nombre
                      </label>
                      <Input id="firstName" placeholder="Tu nombre" required />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Apellido
                      </label>
                      <Input id="lastName" placeholder="Tu apellido" required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="text-sm font-medium">
                      Correo Electrónico
                    </label>
                    <Input id="email" type="email" placeholder="tu@email.com" required />
                  </div>

                  <div>
                    <label htmlFor="phone" className="text-sm font-medium">
                      Teléfono (Opcional)
                    </label>
                    <Input id="phone" type="tel" placeholder="+57 300 123 4567" />
                  </div>

                  <div>
                    <label htmlFor="subject" className="text-sm font-medium">
                      Asunto
                    </label>
                    <select id="subject" className="w-full p-2 border border-input rounded-md bg-background" required>
                      <option value="">Selecciona un tema</option>
                      <option value="general">Consulta General</option>
                      <option value="technical">Soporte Técnico</option>
                      <option value="data">Calidad de Datos</option>
                      <option value="partnership">Colaboración</option>
                      <option value="media">Medios de Comunicación</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="text-sm font-medium">
                      Mensaje
                    </label>
                    <Textarea id="message" placeholder="Escribe tu mensaje aquí..." rows={5} required />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Mensaje
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground">
                    Al enviar este formulario, aceptas nuestra{" "}
                    <Link href="/privacy" className="text-green-600 hover:underline">
                      Política de Privacidad
                    </Link>
                    . Responderemos en un plazo de 24-48 horas.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Preguntas Frecuentes</CardTitle>
              <CardDescription>Respuestas a las consultas más comunes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-2">¿Con qué frecuencia se actualizan los datos?</h3>
                  <p className="text-sm text-muted-foreground">
                    Los datos se actualizan cada hora desde nuestras estaciones de monitoreo y fuentes oficiales.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">¿Cómo puedo reportar una estación defectuosa?</h3>
                  <p className="text-sm text-muted-foreground">
                    Puedes reportar problemas con estaciones específicas a través del formulario de contacto o llamando
                    directamente.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">¿Ofrecen API para desarrolladores?</h3>
                  <p className="text-sm text-muted-foreground">
                    Sí, ofrecemos una API REST para acceder a los datos. Contacta con nosotros para obtener acceso.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">¿Puedo usar los datos para investigación?</h3>
                  <p className="text-sm text-muted-foreground">
                    Los datos están disponibles para uso académico y de investigación. Consulta nuestros términos de
                    uso.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          {isChatOpen && <ChatBot onClose={() => setIsChatOpen(false)} />}
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
