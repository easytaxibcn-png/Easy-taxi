"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone, Calendar } from "lucide-react"
import { useState, useEffect } from "react"
import CallButton from "./Buttons/Call"
import { ReserveButton } from "./Buttons/ReserveButton"
import { LanguageSelector } from "./LanguageSelector"
import { useLanguage } from "@/contexts/LanguageContext"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { t } = useLanguage()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navItems = [
        { id: "inicio", label: t.nav.inicio },
        { id: "tipos", label: t.nav.tipos },
        { id: "servicios", label: t.nav.servicios },
        { id: "precios", label: t.nav.precios },
        { id: "contacto", label: t.nav.contacto },
    ]

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled 
                ? "py-3 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl" 
                : "py-6 bg-transparent"
            }`}
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    <Link href="/" className="group flex items-center gap-2">
                        <div className="w-10 h-10 bg-taxi-yellow rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-transform group-hover:scale-110">
                            <span className="text-black font-black text-xl italic">T</span>
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">
                            Easytaxi<span className="text-taxi-yellow italic">Bcn</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navItems.map(item => (
                            <Link
                                key={item.id}
                                href={`#${item.id}`}
                                className="text-sm font-semibold text-white/70 hover:text-taxi-yellow transition-all hover:translate-y-[-2px] tracking-wide uppercase"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center gap-4">
                        <LanguageSelector/>
                        <div className="h-6 w-px bg-white/10 mx-2" />
                        <CallButton />
                        <ReserveButton
                            text={t.header.reserve}
                            className="bg-taxi-yellow text-black hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_10px_20px_rgba(251,191,36,0.2)] rounded-xl px-6 py-2.5 font-bold"
                        />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="lg:hidden fixed inset-0 h-screen bg-black z-[110] p-6 flex flex-col overflow-y-auto"
                    >
                        <div className="flex items-center justify-between mb-12">
                            <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                                <div className="w-10 h-10 bg-taxi-yellow rounded-xl flex items-center justify-center">
                                    <span className="text-black font-black text-xl italic">T</span>
                                </div>
                                <span className="text-2xl font-bold text-white tracking-tight">EasytaxiBcn</span>
                            </Link>
                            <button
                                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-2">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={`#${item.id}`}
                                        className="text-3xl font-bold text-white hover:text-taxi-yellow py-4 block border-b border-white/5"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-auto space-y-4">
                            <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
                                <span className="font-semibold text-white/50 text-sm tracking-wider uppercase">Idioma</span>
                                <LanguageSelector />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <CallButton className="w-full justify-center py-4 rounded-2xl" />
                                <ReserveButton
                                    text={t.header.reserve}
                                    className="bg-taxi-yellow text-black w-full py-4 rounded-2xl font-bold shadow-lg"
                                />
                            </div>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    )
}
