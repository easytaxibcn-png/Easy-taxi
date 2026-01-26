"use client"

import { motion } from "framer-motion"
import { Check, ShieldCheck, Star, BadgeCheck } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export function DriversSection() {
  const { t } = useLanguage()

  return (
    <section
      id="servicios"
      className="py-32 bg-[#050505] relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.15),transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t.drivers.title}
          </h2>
          <p className="text-taxi-yellow font-black italic tracking-widest uppercase text-sm">
            {t.drivers.subtitle}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/3 border border-white/10 rounded-3xl p-8 mb-12 shadow-2xl relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-taxi-yellow/10 blur-[80px] rounded-full -mr-32 -mt-32 transition-colors group-hover:bg-taxi-yellow/20" />
            
            {/* Header badge */}
            <div className="flex justify-center mb-16">
              <div className="inline-flex items-center gap-3 bg-taxi-yellow text-black px-6 py-3 rounded-2xl shadow-[0_10px_30px_rgba(251,191,36,0.3)]">
                <ShieldCheck className="w-6 h-6" />
                <span className="font-black italic text-sm uppercase">
                  {t.drivers.verified}
                </span>
              </div>
            </div>

            {/* Features */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {t.drivers.list.map((feature: string, index: number) => (
                <motion.li 
                  key={index} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 bg-taxi-yellow/10 border border-taxi-yellow/30 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-4 h-4 text-taxi-yellow" />
                  </div>
                  <span className="text-gray-300 text-lg font-medium leading-relaxed">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 gap-8 mt-16 pt-12 border-t border-white/10">
              <div className="text-center group/indicator">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center gap-2 mb-2"
                >
                  <Star className="w-8 h-8 text-taxi-yellow fill-taxi-yellow drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                  <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter italic">4.9</span>
                </motion.div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">
                  {t.drivers.rating}
                </p>
              </div>

              <div className="text-center group/indicator">
                <motion.div 
                   initial={{ scale: 0.5, opacity: 0 }}
                   whileInView={{ scale: 1, opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.2 }}
                   className="flex items-center justify-center gap-2 mb-2"
                >
                  <BadgeCheck className="w-8 h-8 text-taxi-yellow drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                  <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter italic">
                    100%
                  </span>
                </motion.div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">
                  {t.drivers.regulated}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
