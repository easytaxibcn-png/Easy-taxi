"use client"

import { memo } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, MapPin, Ship, Train, Navigation, ArrowRight } from "lucide-react"

// Tipos
export type TaxiType = {
  id: string
  name: string
  image: string
  tag?: string
}

export type Destination = {
  icon: React.ComponentType<{ className?: string }>
  label: string
}

const taxiTypes: TaxiType[] = [
  { id: "van", name: "7/8 plazas", image: "/large-black-minivan-taxi-8-seats.jpg", tag: "Grupos" },
  { id: "standard", name: "Estándar", image: "/standard-yellow-taxi-sedan-barcelona.jpg" },
  { id: "premium", name: "Premium", image: "/premium-black-mercedes-taxi-luxury.jpg", tag: "Confort" },
  { id: "pmr", name: "Adaptado PMR", image: "/wheelchair-accessible-taxi-van.jpg", tag: "Accesible" },
]

const destinations: Destination[] = [
  { icon: Plane, label: "Aeropuertos" },
  { icon: MapPin, label: "Recogidas" },
  { icon: Ship, label: "Cruceros" },
  { icon: Train, label: "Estaciones" },
  { icon: Navigation, label: "Largas distancias" },
]

const cardMotion = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut" },
}

function TaxiTypesComponent() {
  return (
    <section id="tipos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Nuestros taxis</h2>
          <p className="mt-2 text-taxi-yellow">Elige el vehículo que mejor se adapte a tu viaje</p>
        </header>

        {/* Grid de taxis */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {taxiTypes.map((taxi) => (
            <motion.div key={taxi.id} {...cardMotion}>
              <Card className="group relative overflow-hidden border-0 shadow-lg rounded-2xl">
                <CardContent className="p-0">
                  <div className="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/40 transition-colors" />

                  <div className="absolute top-3 right-3 z-20 flex gap-2">
                    {taxi.tag && <Badge className="bg-black/70 text-white">{taxi.tag}</Badge>}
                    <Button
                      size="sm"
                      className="bg-taxi-yellow text-black hover:bg-taxi-yellow/90 text-xs"
                      aria-label={`Solicitar taxi ${taxi.name}`}
                    >
                      Solicitar
                    </Button>
                  </div>

                  <Image
                    src={taxi.image}
                    alt={`Taxi ${taxi.name}`}
                    width={640}
                    height={360}
                    className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-semibold">{taxi.name}</h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Destinos */}
        <motion.h3
          className="text-xl md:text-2xl font-bold text-center text-foreground mb-10"
          {...cardMotion}
        >
          Te llevamos a cualquier lugar
        </motion.h3>

        <div className="flex flex-wrap justify-center gap-10 mb-12">
          {destinations.map((dest, index) => (
            <motion.div key={index} className="flex flex-col items-center gap-3" {...cardMotion}>
              <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center shadow">
                <dest.icon className="w-6 h-6 text-background" aria-hidden />
              </div>
              <span className="text-sm font-medium text-foreground">{dest.label}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className="rounded-2xl bg-foreground text-background hover:opacity-90"
          >
            Consigue tu taxi ahora
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export const TaxiTypes = memo(TaxiTypesComponent)
