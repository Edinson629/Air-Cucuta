import { ArrowLeft, Shield, Eye, Database, Users, Lock, FileText } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ThemeToggle } from "@/components/theme-toggle"

export default function PrivacyPage() {
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
            <h1 className="text-3xl font-bold tracking-tight">Política de Privacidad</h1>
            <p className="text-muted-foreground">Última actualización: {new Date().toLocaleDateString("es-CO")}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Compromiso con tu Privacidad
              </CardTitle>
              <CardDescription>
                En AirCúcuta, respetamos y protegemos la privacidad de nuestros usuarios. Esta política explica cómo
                recopilamos, usamos y protegemos tu información personal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-3 p-4 border rounded-md">
                  <Eye className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-medium">Transparencia</h3>
                    <p className="text-sm text-muted-foreground">Información clara sobre el uso de datos</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border rounded-md">
                  <Lock className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-medium">Seguridad</h3>
                    <p className="text-sm text-muted-foreground">Protección avanzada de tu información</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border rounded-md">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="font-medium">Control</h3>
                    <p className="text-sm text-muted-foreground">Tú decides sobre tus datos</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="information-collection">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Información que Recopilamos
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Información que Proporcionas Voluntariamente</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Nombre y apellido cuando te contactas con nosotros</li>
                      <li>Dirección de correo electrónico</li>
                      <li>Número de teléfono (opcional)</li>
                      <li>Mensajes y consultas que nos envías</li>
                      <li>Preferencias de configuración de la aplicación</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Información Recopilada Automáticamente</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Dirección IP y ubicación aproximada</li>
                      <li>Tipo de navegador y dispositivo</li>
                      <li>Páginas visitadas y tiempo de permanencia</li>
                      <li>Fecha y hora de acceso</li>
                      <li>Cookies y tecnologías similares</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Datos Ambientales</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Datos de calidad del aire de fuentes públicas</li>
                      <li>Información meteorológica</li>
                      <li>Datos de estaciones de monitoreo oficiales</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="information-use">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Cómo Usamos tu Información
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Servicios Principales</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Proporcionar información actualizada sobre calidad del aire</li>
                      <li>Generar mapas y visualizaciones de datos ambientales</li>
                      <li>Crear predicciones y análisis de tendencias</li>
                      <li>Personalizar la experiencia según tu ubicación</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Comunicación</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Responder a tus consultas y solicitudes de soporte</li>
                      <li>Enviar alertas importantes sobre calidad del aire</li>
                      <li>Notificar sobre actualizaciones del servicio</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Mejora del Servicio</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Analizar el uso de la plataforma para mejoras</li>
                      <li>Detectar y prevenir problemas técnicos</li>
                      <li>Desarrollar nuevas funcionalidades</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="information-sharing">
              <AccordionTrigger>Compartir Información</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    No vendemos, alquilamos ni compartimos tu información personal con terceros para fines comerciales.
                    Podemos compartir información en las siguientes circunstancias:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Con tu consentimiento explícito</li>
                    <li>Para cumplir con obligaciones legales</li>
                    <li>Para proteger nuestros derechos y seguridad</li>
                    <li>Con proveedores de servicios que nos ayudan a operar la plataforma</li>
                    <li>En caso de fusión o adquisición empresarial</li>
                  </ul>
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Datos Públicos</h4>
                    <p className="text-sm text-muted-foreground">
                      Los datos ambientales que mostramos provienen de fuentes públicas y pueden ser compartidos para
                      fines de investigación científica y educativa, siempre de forma agregada y anónima.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cookies">
              <AccordionTrigger>Cookies y Tecnologías Similares</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestra plataforma:
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-2">Cookies Esenciales</h4>
                      <p className="text-sm text-muted-foreground">
                        Necesarias para el funcionamiento básico del sitio, como mantener tu sesión activa y recordar
                        tus preferencias de tema.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Cookies de Análisis</h4>
                      <p className="text-sm text-muted-foreground">
                        Nos ayudan a entender cómo usas la plataforma para mejorar nuestros servicios. Estos datos son
                        anónimos.
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Control de Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Puedes controlar las cookies a través de la configuración de tu navegador. Ten en cuenta que
                      deshabilitar ciertas cookies puede afectar la funcionalidad del sitio.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data-security">
              <AccordionTrigger>Seguridad de los Datos</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Implementamos medidas de seguridad técnicas y organizativas para proteger tu información:
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-2">Medidas Técnicas</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Cifrado SSL/TLS para transmisión de datos</li>
                        <li>Servidores seguros con acceso restringido</li>
                        <li>Copias de seguridad regulares</li>
                        <li>Monitoreo continuo de seguridad</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Medidas Organizativas</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Acceso limitado a datos personales</li>
                        <li>Capacitación en seguridad para el personal</li>
                        <li>Políticas internas de protección de datos</li>
                        <li>Auditorías regulares de seguridad</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="user-rights">
              <AccordionTrigger>Tus Derechos</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Tienes los siguientes derechos respecto a tu información personal:
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-2">Acceso y Portabilidad</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Solicitar una copia de tus datos personales</li>
                        <li>Obtener tus datos en formato portable</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Corrección y Eliminación</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Corregir información inexacta</li>
                        <li>Solicitar la eliminación de tus datos</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Limitación y Oposición</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Limitar el procesamiento de tus datos</li>
                        <li>Oponerte a ciertos usos de tu información</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Retirada de Consentimiento</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Retirar tu consentimiento en cualquier momento</li>
                        <li>Darte de baja de comunicaciones</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Ejercer tus Derechos</h4>
                    <p className="text-sm text-muted-foreground">
                      Para ejercer cualquiera de estos derechos, contáctanos en{" "}
                      <a href="mailto:privacidad@aircucuta.com" className="text-green-600 hover:underline">
                        privacidad@aircucuta.com
                      </a>{" "}
                      o a través de nuestro{" "}
                      <Link href="/contact" className="text-green-600 hover:underline">
                        formulario de contacto
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data-retention">
              <AccordionTrigger>Retención de Datos</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Conservamos tu información personal solo durante el tiempo necesario para los fines descritos en
                    esta política:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Datos de contacto: Hasta que solicites su eliminación</li>
                    <li>Datos de uso del sitio: 2 años desde la última actividad</li>
                    <li>Cookies: Según la configuración de tu navegador</li>
                    <li>Datos de soporte: 3 años después de resolver la consulta</li>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    Los datos ambientales públicos se conservan indefinidamente para fines de investigación histórica y
                    científica.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="international-transfers">
              <AccordionTrigger>Transferencias Internacionales</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Nuestros servidores están ubicados en Colombia. Si accedes a nuestra plataforma desde otros países,
                    tu información puede ser transferida y procesada en Colombia.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Algunos de nuestros proveedores de servicios pueden estar ubicados en otros países. En estos casos,
                    nos aseguramos de que existan las salvaguardas adecuadas para proteger tu información.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="children-privacy">
              <AccordionTrigger>Privacidad de Menores</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Nuestra plataforma está dirigida a usuarios mayores de 13 años. No recopilamos intencionalmente
                    información personal de menores de 13 años.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Si descubrimos que hemos recopilado información de un menor de 13 años, tomaremos medidas para
                    eliminar esa información lo antes posible.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Si eres padre o tutor y crees que tu hijo nos ha proporcionado información personal, contáctanos
                    inmediatamente.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="policy-changes">
              <AccordionTrigger>Cambios en esta Política</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Podemos actualizar esta Política de Privacidad ocasionalmente para reflejar cambios en nuestras
                    prácticas o por otros motivos operativos, legales o regulatorios.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Te notificaremos sobre cambios significativos mediante:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Un aviso prominente en nuestra plataforma</li>
                    <li>Correo electrónico si tienes una cuenta con nosotros</li>
                    <li>Actualización de la fecha "Última actualización" en esta página</li>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    Te recomendamos revisar esta política periódicamente para mantenerte informado sobre cómo protegemos
                    tu información.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Card>
            <CardHeader>
              <CardTitle>Contacto sobre Privacidad</CardTitle>
              <CardDescription>¿Tienes preguntas sobre esta política o tus datos personales?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-2">Oficial de Protección de Datos</h3>
                  <p className="text-sm text-muted-foreground">
                    Email:{" "}
                    <a href="mailto:privacidad@aircucuta.com" className="text-green-600 hover:underline">
                      privacidad@aircucuta.com
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Teléfonos:{" "}
                    <a href="tel:+573137298287" className="text-green-600 hover:underline">
                      +57 313 729 8287
                      <br />
                    </a>
                    <a href="tel:+573043434717" className="text-green-600 hover:underline">
                      +57 304 343 4717
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Dirección Postal</h3>
                  <p className="text-sm text-muted-foreground">
                    AirCúcuta - Protección de Datos
                    <br />
                    Barrio Centro #7-41
                    <br />
                    Centro, Villa del Rosario, Norte de Santander
                    <br />
                    Colombia
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
