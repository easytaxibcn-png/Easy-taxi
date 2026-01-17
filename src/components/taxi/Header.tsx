"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-white">
                        UmarTaxi
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="#inicio" className="text-white hover:text-taxi-yellow transition-colors">
                            Inicio
                        </Link>
                        <Link href="#tipos" className="text-white hover:text-taxi-yellow transition-colors">
                            Tipos de taxi
                        </Link>
                        <Link href="#servicios" className="text-white hover:text-taxi-yellow transition-colors">
                            Servicios
                        </Link>
                        <Link href="#precios" className="text-white hover:text-taxi-yellow transition-colors">
                            Precios
                        </Link>
                        <Link href="#contacto" className="text-white hover:text-taxi-yellow transition-colors">
                            Contacto
                        </Link>
                    </nav>

                    <div className="hidden md:flex items-center gap-3">
                        <Button
                            variant="outline"
                            className="border-white text-foreground "
                        >
                            <Phone className="w-4 h-4 mr-2" />
                            Llamar
                        </Button>
                        <Button className="bg-taxi-yellow text-black hover:bg-taxi-yellow/90">Reservar</Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="md:hidden bg-white fixed p-10 top-0 left-0 right-0 z-50 flex flex-col gap-4">
                        <Link href="#inicio" className="text-black hover:text-taxi-yellow transition-colors">
                            Inicio
                        </Link>
                        <Link href="#tipos" className="text-black hover:text-taxi-yellow transition-colors">
                            Tipos de taxi
                        </Link>
                        <Link href="#servicios" className="text-black hover:text-taxi-yellow transition-colors">
                            Servicios
                        </Link>
                        <Link href="#precios" className="text-black hover:text-taxi-yellow transition-colors">
                            Precios
                        </Link>
                        <Link href="#contacto" className="text-black hover:text-taxi-yellow transition-colors">
                            Contacto
                        </Link>
                        <div className="flex gap-3 mt-2">
                            <Button
                                variant="outline"
                                className="border-white text-foreground hover:bg-white hover:text-black bg-transparent"
                            >
                                <Phone className="w-4 h-4 mr-2" />
                                Llamar
                            </Button>
                            <Button className="bg-taxi-yellow text-black hover:bg-taxi-yellow/90">Reservar</Button>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    )
}
