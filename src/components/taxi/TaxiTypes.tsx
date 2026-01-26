"use client"

import type React from "react"
import { memo, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plane, MapPin, Ship, Train, Route } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

type TaxiType = {
  title: string
  image: string
  alt: string
}

type Destination = {
  icon: React.ComponentType<{ className?: string }>
  label: string
  description: string
  details: string
}

import { motion } from "framer-motion"

function TaxiTypesComponent() {
  const { t, language } = useLanguage()
  const [selectedDestination, setSelectedDestination] =
    useState<any | null>(null)

  const taxiTypes: TaxiType[] = [
   {
      title: t.taxiTypes.categories.estandar,
      image: "/taxi/types/estandar.png",
      alt: `Taxi ${t.taxiTypes.categories.estandar}`,
    }, {
      title: t.taxiTypes.categories.plazas,
      image: "/taxi/types/7-8plazas.png",
      alt: `Taxi ${t.taxiTypes.categories.plazas}`,
    },
    
    {
      title: t.taxiTypes.categories.adaptado,
      image: "/taxi/types/adaptado.png",
      alt: `Taxi ${t.taxiTypes.categories.adaptado}`,
    },
    {
      title: t.taxiTypes.categories.premium,
      image: "/taxi/types/premium.png",
      alt: `Taxi ${t.taxiTypes.categories.premium}`,
    },
  ]

  const destinations = [
    {
      icon: Plane,
      id: "aeropuertos",
      ...t.taxiTypes.destinations.aeropuertos,
    },
    {
      icon: MapPin,
      id: "recogidas",
      ...t.taxiTypes.destinations.recogidas,
    },
    {
      icon: Ship,
      id: "cruceros",
      ...t.taxiTypes.destinations.cruceros,
    },
    {
      icon: Train,
      id: "estaciones",
      ...t.taxiTypes.destinations.estaciones,
    },
    {
      icon: Route,
      id: "largasDistancias",
      ...t.taxiTypes.destinations.largasDistancias,
    },
  ]

  return (
    <section id="tipos" className="w-full relative overflow-hidden">
      {/* Dynamic Background */}
  

      {/* Header Section */}
      <div className="relative pt-24 pb-48 lg:pt-32 lg:pb-56">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 uppercase tracking-tighter"
          >
            {t.taxiTypes.header}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto"
          >
            {t.taxiTypes.subHeader}
          </motion.p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="relative -mt-32 lg:-mt-44 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {taxiTypes.map((taxi, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative flex flex-col pt-12"
              >
                <div className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-xl rounded-[3rem] p-10 pt-60 h-full transition-all duration-500 group-hover:bg-white/10 group-hover:border-taxi-yellow/30 shadow-2xl">
                  {/* Taxi Type Badge */}
                  <div className="absolute -top-6 left-10 px-6 py-3 bg-taxi-yellow text-black rounded-2xl font-black italic text-sm uppercase shadow-2xl tracking-tighter">
                    {taxi.title}
                  </div>

                  <div className="mb-6">
                    <div className="h-1.5 w-12 bg-taxi-yellow rounded-full group-hover:w-24 transition-all duration-500" />
                  </div>
                  
                  <div className="space-y-4">
                   
                    <div className="flex flex-wrap gap-2">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 border border-white/10 px-3 py-1.5 rounded-xl group-hover:border-taxi-yellow/30 group-hover:text-taxi-yellow/50 transition-colors">{taxi.title}</span>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 border border-white/10 px-3 py-1.5 rounded-xl group-hover:border-taxi-yellow/30 group-hover:text-taxi-yellow/50 transition-colors">24/7</span>
                    </div>
                  </div>
                </div>

                <motion.div 
                  className="absolute -top-10 left-1/2 -translate-x-1/2 w-[120%] z-20 pointer-events-none px-4"
                  whileHover={{ scale: 1.1, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Image
                    src={taxi.image || "/placeholder.svg"}
                    alt={taxi.alt}
                    width={500}
                    height={250}
                    className="object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:drop-shadow-[0_40px_70px_rgba(251,191,36,0.4)]"
                    loading="lazy"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Destinations Section */}
        <div className="container mx-auto px-6 mt-48 lg:mt-56">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold text-taxi-yellow uppercase tracking-[0.3em] text-center mb-12"
          >
            {t.taxiTypes.servicesHeader}
          </motion.h3>
          
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8 mb-20">
            {destinations.map((dest, index) => {
              const IconComponent = dest.icon
              return (
                <motion.button
                  key={index}
                  onClick={() => setSelectedDestination(dest)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center gap-4 p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md transition-all hover:bg-taxi-yellow group min-w-[140px]"
                >
                  <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-black/10 transition-colors">
                    <IconComponent
                      className="w-10 h-10 text-taxi-yellow group-hover:text-black transition-colors"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-xs font-bold text-white/60 group-hover:text-black uppercase tracking-widest transition-colors">
                    {dest.label}
                  </span>
                </motion.button>
              )
            })}
          </div>

          <div className="flex justify-center">
            <Link href="#contacto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-taxi-yellow text-black font-black text-xl italic px-12 py-8 rounded-2xl shadow-[0_20px_40px_rgba(251,191,36,0.2)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">{t.taxiTypes.cta}</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* Dialog for Destination Details */}
      <Dialog
        open={!!selectedDestination}
        onOpenChange={() => setSelectedDestination(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              {selectedDestination && (
                <>
                  <div className="p-3 bg-taxi-yellow rounded-xl">
                    <selectedDestination.icon
                      className="w-6 h-6 text-taxi-dark"
                      strokeWidth={2}
                    />
                  </div>
                  {selectedDestination.label}
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              {selectedDestination?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="pt-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {selectedDestination?.details}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export const TaxiTypes = memo(TaxiTypesComponent)
