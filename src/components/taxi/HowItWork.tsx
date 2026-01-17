import { FileText, Car, Clock, ArrowRight } from "lucide-react"

const steps = [
    {
        icon: FileText,
        step: "Paso 1",
        title: "Solicita",
        subtitle: "tu taxi",
    },
    {
        icon: Car,
        step: "Paso 2",
        title: "Asignamos el",
        subtitle: "conductor más cercano",
    },
    {
        icon: Clock,
        step: "Paso 3",
        title: "En menos de 10",
        subtitle: "minutos estás en marcha",
    },
]

export function HowItWorks() {
    return (
        <section className="bg-taxi-yellow py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-black mb-12">
                    ¿Cómo funciona nuestro servicio de taxi?
                </h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 mb-8">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <div className="flex flex-col items-center">
                                <p className="text-sm font-semibold text-black mb-2">{step.step}</p>
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-3">
                                    <step.icon className="w-8 h-8 text-black" />
                                </div>
                                <p className="text-sm font-semibold text-black text-center">{step.title}</p>
                                <p className="text-sm text-black text-center">{step.subtitle}</p>
                            </div>
                            {index < steps.length - 1 && <ArrowRight className="hidden md:block w-8 h-8 text-black mx-4" />}
                        </div>
                    ))}
                </div>

                <div className="max-w-2xl mx-auto bg-black/10 rounded-lg p-4 text-center">
                    <p className="text-sm text-black">
                        Trabajamos únicamente con conductores profesionales, autorizados y con amplia experiencia, para garantizar
                        un servicio seguro, puntual y de calidad.
                    </p>
                </div>
            </div>
        </section>
    )
}
