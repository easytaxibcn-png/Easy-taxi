"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Plane, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const popularDestinations = [
  { name: "Lloret del mar", image: "/lloret-de-mar-beach-spain-coast.jpg", type: "city" },
  { name: "Port aventura", image: "/port-aventura-theme-park-spain.jpg", type: "attraction" },
  { name: "Andorra", image: "/andorra-mountains-snow-ski-resort.jpg", type: "city" },
  { name: "Aeropuerto el prat", image: "/barcelona-el-prat-airport.jpg", type: "airport" },
  { name: "Sitges", image: "/sitges-beach-town-spain.jpg", type: "city" },
  { name: "Tarragona", image: "/tarragona-roman-ruins-spain.jpg", type: "city" },
  { name: "Aeropuerto Girona", image: "/girona-airport-spain.jpg", type: "airport" },
  { name: "Costa Brava", image: "/costa-brava-spain-beach.jpg", type: "city" },
]

export function Destinations() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleCards = 4

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 2000)

    return () => clearInterval(interval)
  }, [currentIndex])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + visibleCards >= popularDestinations.length ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? popularDestinations.length - visibleCards : prev - 1))
  }

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-2">
          TE LLEVAMOS A CUALQUIER LUGAR
        </h2>
        <p className="text-center text-muted-foreground mb-10">Destinos populares y aeropuertos</p>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <div className="overflow-hidden mx-12">
            <div
              className="flex gap-4 transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
            >
              {popularDestinations.map((dest, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-1/2 md:w-1/4 relative rounded-xl overflow-hidden cursor-pointer group"
                >
                  <div className="absolute top-3 right-3 z-10 bg-taxi-yellow/90 rounded-full p-2">
                    {dest.type === "airport" ? (
                      <Plane className="w-4 h-4 text-background" />
                    ) : (
                      <MapPin className="w-4 h-4 text-background" />
                    )}
                  </div>
                  <img
                    src={dest.image || "/placeholder.svg"}
                    alt={dest.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-bold text-lg">{dest.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(popularDestinations.length / visibleCards) }).map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.floor(currentIndex / visibleCards) === i ? "bg-taxi-yellow" : "bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(i * visibleCards)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
