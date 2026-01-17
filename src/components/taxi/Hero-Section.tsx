import { Button } from "@/components/ui/button"

export function HeroSection() {
    return (
        <section id="inicio" className="relative bg-black rounded-b-4xl overflow-visible">
            <div className="container mx-auto px-20">
                <div className="grid lg:grid-cols-2 items-center">
                    {/* Left content */}
                    <div className="pt-32 pb-10 relative z-10">
                        <div className="flex flex-wrap items-start gap-4 mb-6">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                                Taxi Barcelona -<br />
                                Precio Cerrado y taxi en menos de 10 minutos
                            </h1>
                            <span className="text-taxi-yellow text-6xl md:text-6xl lg:text-6xl font-black italic drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]">
                                24/7
                            </span>
                        </div>

                        <p className="text-gray-300 text-lg mb-8 max-w-md">
                            Taxis hasta 8 plazas, taxis premium y adaptados PMR. Reserva ahora y paga al finalizar el servicio
                        </p>

                        <Button className="bg-taxi-yellow text-black hover:bg-taxi-yellow/90 font-bold text-lg px-8 py-6 shadow-[0_0_30px_rgba(251,191,36,0.4)]">
                            Reservar Ahora
                        </Button>
                    </div>
                    {/* Mobile background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 rounded-b-4xl"
                        style={{
                            backgroundImage: `url('/taxi/background.jpg')`,
                        }}
                    />
                    {/* Right side - Car image overflowing */}
                    <div className="relative hidden lg:block h-[500px] rounded-2xl mt-17 ">
                        <div className="absolute in -right-32 top-1/2 -translate-y-1/2 ">
                            <img
                                src="/taxi/taxi-2.png"
                                alt="Taxi Barcelona"
                                className="w-full h-full object-contain drop-shadow-2xl"
                            />
                        </div>
                        <div className="absolute in -right-32 top-1/2 -translate-y-1/3 translate-x-1/5 ]">
                            <img
                                src="/taxi/taxi-1.png"
                                alt="Taxi Barcelona"
                                className="w-full h-full object-contain drop-shadow-2xl"
                            />
                        </div>

                    </div>
                </div>
            </div>


        </section>
    )
}
