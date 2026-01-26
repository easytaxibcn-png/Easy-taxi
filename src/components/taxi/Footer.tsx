"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

export function Footer() {
    const { t } = useLanguage()

    return (
        <footer className="bg-black border-t border-white/5 py-24 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-taxi-yellow/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-16">
                    <div className="max-w-md">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-taxi-yellow rounded-xl flex items-center justify-center font-black italic shadow-[0_10px_20px_rgba(251,191,36,0.2)]">T</div>
                            <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">
                                {t.footer.brand}
                            </h3>
                        </div>
                        <nav className="flex flex-wrap gap-x-8 gap-y-6 text-[10px] font-black uppercase tracking-[0.2em] mb-12">
                            <Link href="#inicio" className="text-white/30 hover:text-taxi-yellow transition-all hover:tracking-[0.3em]">
                                {t.nav.inicio}
                            </Link>
                            <Link href="#tipos" className="text-white/30 hover:text-taxi-yellow transition-all hover:tracking-[0.3em]">
                                {t.nav.tipos}
                            </Link>
                            <Link href="#servicios" className="text-white/30 hover:text-taxi-yellow transition-all hover:tracking-[0.3em]">
                                {t.nav.servicios}
                            </Link>
                            <Link href="#precios" className="text-white/30 hover:text-taxi-yellow transition-all hover:tracking-[0.3em]">
                                {t.nav.precios}
                            </Link>
                            <Link href="#contacto" className="text-white/30 hover:text-taxi-yellow transition-all hover:tracking-[0.3em]">
                                {t.nav.contacto}
                            </Link>
                        </nav>
                        <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.4em]">{t.footer.rights}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row md:flex-col gap-10">
                        <div className="group">
                          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-taxi-yellow/40 mb-3">Direct Contact</p>
                          <Link href="tel:+34641230218" className="text-2xl font-black text-white hover:text-taxi-yellow transition-all italic tracking-tighter block group-hover:translate-x-2">
                              +34 641 230 218
                          </Link>
                        </div>
                        <div className="group border-t border-white/5 pt-10 sm:border-t-0 sm:pt-0 md:border-t md:pt-10">
                          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-taxi-yellow/40 mb-3">Email Support</p>
                          <Link href="mailto:info@easytaxibcn.com" className="text-2xl font-black text-white hover:text-taxi-yellow transition-all italic tracking-tighter block group-hover:translate-x-2">
                              info@easytaxibcn.com
                          </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
