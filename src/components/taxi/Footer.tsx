import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">taxiBcn</h3>
                        <nav className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-2">
                            <Link href="#inicio" className="hover:text-foreground transition-colors">
                                Inicio
                            </Link>
                            <Link href="#tipos" className="hover:text-foreground transition-colors">
                                Tipos de taxi
                            </Link>
                            <Link href="#servicios" className="hover:text-foreground transition-colors">
                                Servicios
                            </Link>
                            <Link href="#precios" className="hover:text-foreground transition-colors">
                                Precios
                            </Link>
                            <Link href="#contacto" className="hover:text-foreground transition-colors">
                                Contacto
                            </Link>
                        </nav>
                        <p className="text-sm text-muted-foreground">© 2025 taxiBcn. Todos los derechos reservados</p>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        <p>
                            <Link href="tel:+34868838373" className="hover:text-foreground transition-colors underline">
                                tel: +34 8686 838 373
                            </Link>
                        </p>
                        <p>
                            <Link href="mailto:taxibcn@taxi.com" className="hover:text-foreground transition-colors underline">
                                email: taxibcn@taxi.com
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
