import { ShieldCheck, CreditCard, Users, UserCheck, Clock } from "lucide-react"

const features = [
    {
        icon: ShieldCheck,
        title: "Precio cerrado",
        subtitle: "garantizado",
    },
    {
        icon: CreditCard,
        title: "Pago después",
        subtitle: "del servicio",
    },
    {
        icon: Users,
        title: "Coches hasta 8",
        subtitle: "plazas",
    },
    {
        icon: UserCheck,
        title: "Conductores",
        subtitle: "profesionales",
    },
    {
        icon: Clock,
        title: "Taxi 24/7",
        subtitle: "",
    },
]

export function FeaturesBar() {
    return (
        <section className="bg-white py-8 shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg min-w-[160px]"
                        >
                            <feature.icon className="w-8 h-8 text-taxi-yellow flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-sm text-foreground">{feature.title}</p>
                                {feature.subtitle && <p className="text-xs text-muted-foreground">{feature.subtitle}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
