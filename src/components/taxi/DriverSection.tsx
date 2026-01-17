import { Check, ShieldCheck, Award, Star } from "lucide-react"

const driverFeatures = [
  "Conductores con licencia oficial del AMB",
  "Examen oficial del Institut Metropolità del Taxi",
  "Vehículos limpios y revisados",
  "No subcontratados",
  "No conductores Temporales",
]

export function DriversSection() {
  return (
    <section id="servicios" className="py-16 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-2">Quien te llevara?</h2>
        <p className="text-center text-taxi-yellow font-semibold mb-10">
          Solo taxis oficiales y conductores profesionales
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left side - Features */}
              <div className="p-8 md:p-10 bg-gradient-to-br from-neutral-50 to-white">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 bg-taxi-yellow/10 text-taxi-yellow px-4 py-2 rounded-full mb-4">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="font-bold text-sm">100% Certificados</span>
                  </div>
                </div>

                <ul className="space-y-4">
                  {driverFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 group">
                      <div className="flex-shrink-0 w-6 h-6 bg-taxi-yellow rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Check className="w-4 h-4 text-black" />
                      </div>
                      <span className="text-foreground leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-neutral-200">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="w-5 h-5 text-taxi-yellow fill-taxi-yellow" />
                      <span className="text-2xl font-bold text-foreground">4.9</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Valoración</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Award className="w-5 h-5 text-taxi-yellow" />
                      <span className="text-2xl font-bold text-foreground">+10</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Años exp.</p>
                  </div>
                </div>
              </div>

              {/* Right side - Image */}
              <div className="relative bg-gradient-to-br from-taxi-yellow to-amber-400 p-8 md:p-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
                <img
                  src="/professional-taxi-driver-cartoon-illustration-badg.jpg"
                  alt="Conductor profesional"
                  className="w-64 h-64 object-contain drop-shadow-2xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
