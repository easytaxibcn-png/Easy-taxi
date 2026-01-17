"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Cookie, X } from "lucide-react"

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setShowBanner(false)
  }

  const rejectCookies = () => {
    localStorage.setItem("cookieConsent", "rejected")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-neutral-200 p-6 md:p-8">
          <button
            onClick={rejectCookies}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-taxi-yellow/10 rounded-full flex items-center justify-center">
                <Cookie className="w-8 h-8 text-taxi-yellow" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-2">Política de Cookies</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Utilizamos cookies propias y de terceros para mejorar nuestros servicios, analizar el tráfico y mostrar
                publicidad relacionada con tus preferencias. Al hacer clic en "Aceptar", consientes el uso de estas
                tecnologías. Puedes obtener más información en nuestra{" "}
                <a href="/politica-privacidad" className="text-taxi-yellow hover:underline font-medium">
                  Política de Privacidad
                </a>
                .
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={acceptCookies} className="bg-taxi-yellow text-black hover:bg-taxi-yellow/90 font-bold">
                  Aceptar todas
                </Button>
                <Button onClick={rejectCookies} variant="outline" className="font-medium bg-transparent">
                  Solo necesarias
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
