"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Cookie, X } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export function CookieBanner() {
  const { t, language } = useLanguage()
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
    <div className="fixed bottom-0 left-0 right-0 z-100 p-6 animate-in slide-in-from-bottom duration-700">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-black/80 backdrop-blur-2xl rounded-4xl border border-white/10 p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-taxi-yellow/10 blur-3xl rounded-full -mr-16 -mt-16" />
          
          <button
            onClick={rejectCookies}
            className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"
            aria-label={language === "es" ? "Cerrar" : "Close"}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-taxi-yellow text-black rounded-3xl flex items-center justify-center shadow-[0_10px_30px_rgba(251,191,36,0.3)] rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <Cookie className="w-10 h-10" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{t.cookies.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium italic">
                {t.cookies.description}
                <a href="/politica-privacidad" className="text-taxi-yellow hover:text-white transition-colors ml-1 font-bold">
                  {t.cookies.link}
                </a>
                .
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button onClick={acceptCookies} className="bg-taxi-yellow text-black hover:bg-white font-black italic rounded-2xl px-10 h-14 shadow-xl transition-all">
                  {t.cookies.accept}
                </Button>
                <Button onClick={rejectCookies} variant="ghost" className="text-white/40 hover:text-white hover:bg-white/5 font-bold rounded-2xl px-8 h-14 transition-all">
                  {t.cookies.necessary}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
