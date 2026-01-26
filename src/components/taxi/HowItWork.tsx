"use client"

import { motion } from "framer-motion"
import { FileText, Car, Clock, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export function HowItWorks() {
  const { t, language } = useLanguage()

  const steps = [
    {
      icon: FileText,
      step: language === "es" ? "Paso 1" : "Step 1",
      title: t.howItWorks.step1.title,
      subtitle: t.howItWorks.step1.subtitle,
    },
    {
      icon: Car,
      step: language === "es" ? "Paso 2" : "Step 2",
      title: t.howItWorks.step2.title,
      subtitle: t.howItWorks.step2.subtitle,
    },
    {
      icon: Clock,
      step: language === "es" ? "Paso 3" : "Step 3",
      title: t.howItWorks.step3.title,
      subtitle: t.howItWorks.step3.subtitle,
    },
  ]

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t.howItWorks.title}
          </h2>
          <div className="w-20 h-1.5 bg-taxi-yellow mx-auto rounded-full" />
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="h-full bg-white/3 border border-white/10 backdrop-blur-md rounded-4xl p-10 text-center transition-all duration-500 hover:bg-white/8 hover:border-taxi-yellow/30 hover:-translate-y-2">
                <span className="inline-block text-xs font-black text-taxi-yellow uppercase tracking-[0.2em] mb-6">
                  {step.step}
                </span>

                <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 bg-taxi-yellow/20 blur-2xl group-hover:bg-taxi-yellow/40 transition-colors rounded-full" />
                  <div className="relative w-full h-full bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center group-hover:bg-taxi-yellow group-hover:scale-110 transition-all duration-500">
                    <step.icon className="w-10 h-10 text-taxi-yellow group-hover:text-black transition-colors" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed italic">
                  {step.subtitle}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-20">
                  <ArrowRight className="w-8 h-8 text-white/10" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Trust message */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-4xl bg-taxi-yellow p-8 md:p-10 shadow-2xl relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700" />
          <p className="relative z-10 text-lg md:text-xl text-black font-bold italic text-center leading-relaxed">
            {t.howItWorks.trust}
            <span className="text-black underline decoration-2 underline-offset-4">
              {t.howItWorks.trustHighlight}
            </span>
            {language === "es" ? ", garantizando un servicio seguro, puntual y de máxima calidad." : ", guaranteeing a safe, punctual and high quality service."}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
