"use client"

import { ReserveButton } from "./Buttons/ReserveButton"
import { useLanguage } from "@/contexts/LanguageContext"
import { motion } from "framer-motion"

export function HeroSection() {
    const { t } = useLanguage()

    return (
        <section id="inicio" className="relative overflow-hidden min-h-[90vh] md:min-h-[80vh] flex items-center">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
               
                <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `radial-gradient(var(--taxi-yellow) 0.5px, transparent 0.5px)`,
                        backgroundSize: '30px 30px'
                    }}
                />
                <motion.div 
                    animate={{ 
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-taxi-yellow/10 blur-[120px] rounded-full"
                />
            </div>

            <div className="container mx-auto px-6 lg:px-20 relative z-10">
                <div className="flex flex-col items-center text-center">
                    {/* 24/7 Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-taxi-yellow opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-taxi-yellow"></span>
                            </span>
                            <span className="text-white font-medium tracking-wide uppercase text-sm">
                                {t.hero.badge || "Disponible 24/7"}
                            </span>
                        </div>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-6 tracking-tight"
                        >
                            {t.hero.title}
                            <div className="mt-2 text-taxi-yellow italic relative inline-block">
                                {t.hero.highlight}
                                <motion.div 
                                    className="absolute -bottom-2 left-0 w-full h-1 bg-taxi-yellow/30 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 0.8, delay: 0.8 }}
                                />
                            </div>
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-gray-400 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed"
                        >
                            {t.hero.description}
                            <span className="text-white font-semibold block mt-2">
                                {t.hero.secondary}
                            </span>
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="flex flex-wrap justify-center gap-6"
                        >
                            <ReserveButton 
                                text={t.hero.cta} 
                                className="bg-taxi-yellow text-black hover:bg-white hover:scale-105 transition-all duration-300 font-bold text-xl px-12 py-8 rounded-2xl shadow-[0_20px_40px_rgba(251,191,36,0.2)]"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(45deg,transparent_45%,#fff_50%,transparent_55%)] bg-size-[200%_200%] animate-pulse" />
            </div>

            {/* Smooth bottom transition */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
        </section>
    )
}
