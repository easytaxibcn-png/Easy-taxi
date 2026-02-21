import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EasyTaxiBcn - Taxi Barcelona 24/7 | Precio Cerrado Garantizado",
  description:
    "Servicio de taxi en Barcelona con precio cerrado garantizado. Taxis hasta 8 plazas, premium y adaptados PMR. Reserva ahora y paga al finalizar.",
  icons: {
    icon: [
          {
          url: "/32x32b.png",
          media: "(prefers-color-scheme: light)",
        },
        {
          url: "/32x32b.png",
          media: "(prefers-color-scheme: dark)",
        },
        {
          url: "/32x32b.png",
          type: "image/svg+xml",
        }, 
    ],
  },
}

import { LanguageProvider } from "@/contexts/LanguageContext"
import Script from "next/script"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        {/* Google Ads Tag */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-17960671536"
        />
        <Script
          id="google-ads"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              gtag('config', 'AW-17960671536');
              
              // Conversion snippet
              gtag('event', 'conversion', {'send_to': 'AW-17960671536/Zz1cCIKZZPsbELCyqPRC'});
            `,
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
