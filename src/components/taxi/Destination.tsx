"use client"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Plane, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

export function Destinations() {
  const { t } = useLanguage()
  const popularDestinations = [
    { name: t.destinations.items["Lloret del mar"], image: "https://res.cloudinary.com/dbys9ezjr/image/upload/v1769777960/spain-2464619_1280_ofqdcd.jpg", type: "city" },
    { name: t.destinations.items["Port aventura"], image: "https://res.cloudinary.com/dbys9ezjr/image/upload/v1769778180/Port_aventura_Roller_coasters_bnqtvt.jpg", type: "attraction" },
    { name: t.destinations.items["Andorra"], image: "https://res.cloudinary.com/dbys9ezjr/image/upload/v1769778235/11_Very_Best_Things_to_Do_in_Andorra_From_Ski_Slopes_To_Scenic_Trails_-_Hand_Luggage_Only_-_Travel_Food_And_Photography_Blog_slplxl.jpg", type: "city" },
    { name: t.destinations.items["Aeropuerto el prat"], image: "https://res.cloudinary.com/dbys9ezjr/image/upload/v1769778197/Transavia_737_at_Barcelona_El_Prat_kcc66z.jpg", type: "airport" },
    { name: t.destinations.items["Sitges"], image: "https://res.cloudinary.com/dbys9ezjr/image/upload/v1769778310/SITGES_COSTA_DORADA_SPAIN_ATENEA_PARK_SUITES_AND_APARTMENTS____7_NIGHTS_FROM_391PP____Standard_Studio_2_People_Bed_and_Breakfast__7th_December_2025__%EF%B8%8F_Flying_from_London_Southend__Small_under_seat_bag___Ju_d1btmm.jpg", type: "city" },
    { name: t.destinations.items["Tarragona"], image: "https://res.cloudinary.com/dbys9ezjr/image/upload/v1769778351/Los_pueblos_m%C3%A1s_bonitos_de_Tarragona_para_descubrir_uno_a_uno_znryyq.jpg", type: "city" },
    { name: t.destinations.items["Aeropuerto Girona"], image: "https://res.cloudinary.com/dbys9ezjr/image/upload/v1769778404/Girona_Airport_%EF%B8%8F_djjjf5.jpg", type: "airport" },
    { name: t.destinations.items["Costa Brava"], image: "https://res.cloudinary.com/dbys9ezjr/image/upload/v1769778438/Summer_ywlejd.jpg", type: "city" },
  ]

  const [[page, direction], setPage] = useState([0, 0])
  const [isHovered, setIsHovered] = useState(false)

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  const wrapIndex = (i: number) => {
    return ((i % popularDestinations.length) + popularDestinations.length) % popularDestinations.length
  }

  // Auto-play effect
  useEffect(() => {
    if (isHovered) return

    const timer = setInterval(() => {
      paginate(1)
    }, 4000)

    return () => clearInterval(timer)
  }, [page, isHovered])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    })
  }

  const handleCardClick = () => {
    const element = document.getElementById("contacto")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      window.history.pushState(null, "", "#contacto")
    }
  }

  return (
    <section id="destinos" className="py-32 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tighter">
              {t.destinations.title}
            </h2>
            <p className="text-gray-400 font-medium italic">{t.destinations.subtitle}</p>
          </div>
          
          <div className="flex gap-4">
            <Button
              onClick={() => paginate(-1)}
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-2xl bg-white/5 border-white/10 text-white hover:bg-taxi-yellow hover:text-black hover:border-taxi-yellow transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              onClick={() => paginate(1)}
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-2xl bg-white/5 border-white/10 text-white hover:bg-taxi-yellow hover:text-black hover:border-taxi-yellow transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </motion.div>

        <div 
          className="relative h-[450px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex gap-6 h-full">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              {[0, 1, 2, 3].map((offset) => {
                const index = wrapIndex(page + offset)
                const dest = popularDestinations[index]
                return (
                  <motion.div
                    key={`${page}-${offset}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 100, damping: 20 },
                      opacity: { duration: 0.4 },
                      scale: { duration: 0.4 }
                    }}
                    onClick={handleCardClick}
                    className={`shrink-0 relative rounded-[2.5rem] overflow-hidden group/card bg-white/5 border border-white/10 cursor-pointer ${
                      offset === 0 ? "w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]" : 
                      offset === 1 ? "hidden md:flex md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]" :
                      "hidden lg:flex lg:w-[calc(25%-18px)]"
                    }`}
                  >
                    {/* Destination Type */}
                    <div className="absolute top-6 right-6 z-20 bg-taxi-yellow text-black rounded-2xl p-3 shadow-2xl transition-transform group-hover/card:scale-110">
                      {dest.type === "airport" ? (
                        <Plane className="w-5 h-5 shrink-0" />
                      ) : (
                        <MapPin className="w-5 h-5 shrink-0" />
                      )}
                    </div>

                    {/* Image */}
                    <div className="absolute inset-0 z-0">
                       <img
                         src={dest.image || "/placeholder.svg"}
                         alt={dest.name}
                         className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700 opacity-60 group-hover/card:opacity-90"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-10 left-10 right-10 z-10">
                      <div className="w-10 h-1 bg-taxi-yellow mb-4 rounded-full group-hover/card:w-16 transition-all duration-500" />
                      <h3 className="text-white font-bold text-2xl leading-tight group-hover/card:text-taxi-yellow transition-colors italic">
                        {dest.name}
                      </h3>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
