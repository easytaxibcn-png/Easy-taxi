"use client"

import { motion } from "framer-motion"
import { ShieldCheck, CreditCard, Users, UserCheck, Clock } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export function FeaturesBar() {
  const { t } = useLanguage()

  const features = [
    { icon: ShieldCheck, title: t.features.price.title, subtitle: t.features.price.subtitle },
    { icon: CreditCard, title: t.features.payment.title, subtitle: t.features.payment.subtitle },
    { icon: Users, title: t.features.seats.title, subtitle: t.features.seats.subtitle },
    { icon: UserCheck, title: t.features.drivers.title, subtitle: t.features.drivers.subtitle },
    { icon: Clock, title: t.features.availability.title, subtitle: t.features.availability.subtitle },
  ]

  return (
    <section className="py-24 w-full overflow-hidden ">
       
     
        
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="group relative flex items-center gap-5 px-8 py-5 rounded-4xl bg-white/[0.03] border border-white/5 backdrop-blur-md transition-all hover:bg-white/[0.08] hover:border-taxi-yellow/30 min-w-[240px] shadow-2xl"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-taxi-yellow blur-[15px] opacity-0 group-hover:opacity-30 transition-opacity rounded-full" />
                  <div className="relative w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-taxi-yellow group-hover:border-taxi-yellow transition-all duration-500">
                    <feature.icon className="w-6 h-6 text-taxi-yellow group-hover:text-black transition-colors" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-white font-black text-sm lg:text-base leading-tight uppercase tracking-tight">
                    {feature.title}
                  </span>
                  {feature.subtitle && (
                    <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 group-hover:text-taxi-yellow/50 transition-colors">
                      {feature.subtitle}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
    </section>
  )
}
