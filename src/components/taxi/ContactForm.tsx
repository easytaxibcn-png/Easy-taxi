"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar,
  Users,
  MapPin,
  Phone,
  Mail,
  User,
  Clock,
  Loader2,
  CheckCircle,
  Map,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import dynamic from "next/dynamic"
import { useLanguage } from "@/contexts/LanguageContext"
import { motion, AnimatePresence } from "framer-motion"

export function ContactForm() {
  const { t, language } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)

  const taxiTypes = [
    { value: "estandar", label: t.taxiTypes.categories.estandar },
    { value: "7-8-plazas", label: t.taxiTypes.categories.plazas },
    { value: "premium", label: t.taxiTypes.categories.premium },
    { value: "adaptado", label: t.taxiTypes.categories.adaptado },
  ]

  const popularDestinations = [
    { value: "aeropuerto-prat", label: t.destinations.items["Aeropuerto el prat"], coords: { lat: 41.2974, lng: 2.0833 } },
    { value: "aeropuerto-girona", label: t.destinations.items["Aeropuerto Girona"], coords: { lat: 41.9009, lng: 2.7606 } },
    { value: "lloret", label: t.destinations.items["Lloret del mar"], coords: { lat: 41.7, lng: 2.8453 } },
    { value: "port-aventura", label: t.destinations.items["Port aventura"], coords: { lat: 41.0869, lng: 1.1556 } },
    { value: "andorra", label: t.destinations.items["Andorra"], coords: { lat: 42.5063, lng: 1.5218 } },
    { value: "tarragona", label: t.destinations.items["Tarragona"], coords: { lat: 41.1189, lng: 1.2445 } },
  ]

  const MapPicker = dynamic(() => import("./MapPicker"), {
    ssr: false,
    loading: () => (
      <div className="w-full h-[300px] bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
        <Loader2 className="w-8 h-8 animate-spin text-taxi-yellow" />
      </div>
    ),
  })

  const STEPS = [
    { id: 1, title: t.contact.steps.step1.title, description: t.contact.steps.step1.description },
    { id: 2, title: t.contact.steps.step2.title, description: t.contact.steps.step2.description },
    { id: 3, title: t.contact.steps.step3.title, description: t.contact.steps.step3.description },
  ]
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipoTaxi: "",
    origen: "",
    origenCoords: null as { lat: number; lng: number } | null,
    destino: "",
    destinoCoords: null as { lat: number; lng: number } | null,
    fecha: "",
    hora: "",
    pasajeros: "",
    mensaje: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [showMap, setShowMap] = useState(false)
  const [mapTarget, setMapTarget] = useState<"origen" | "destino">("origen")
  const [origenInputMode, setOrigenInputMode] = useState<"text" | "select">("text")
  const [destinoInputMode, setDestinoInputMode] = useState<"text" | "select">("text")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Error al enviar la reserva")
      }

      setIsSuccess(true)
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        tipoTaxi: "",
        origen: "",
        origenCoords: null,
        destino: "",
        destinoCoords: null,
        fecha: "",
        hora: "",
        pasajeros: "",
        mensaje: "",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar la reserva")
    } finally {
      setIsLoading(false)
    }
  }

  const handleMapSelect = (address: string, coords: { lat: number; lng: number }) => {
    if (mapTarget === "origen") {
      setFormData({ ...formData, origen: address, origenCoords: coords })
    } else {
      setFormData({ ...formData, destino: address, destinoCoords: coords })
    }
    setShowMap(false)
  }

  const openMap = (target: "origen" | "destino") => {
    setMapTarget(target)
    setShowMap(true)
  }

  const handlePopularDestinationSelect = (value: string) => {
    const destination = popularDestinations.find((d) => d.value === value)
    if (destination) {
      setFormData({ ...formData, destino: destination.label, destinoCoords: destination.coords })
    }
  }

  const canProceedStep1 = formData.nombre && formData.email && formData.telefono
  const canProceedStep2 = formData.tipoTaxi && formData.origen && formData.destino && formData.pasajeros
  const canProceedStep3 = formData.fecha && formData.hora

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  if (isSuccess) {
    return (
      <section id="contacto" className="py-32 bg-[#050505] relative overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(251,191,36,0.1),transparent_70%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-4xl p-10 md:p-16 text-center shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative overflow-hidden group">
              {/* Animated Glow */}
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-taxi-yellow/10 blur-[100px] rounded-full group-hover:bg-taxi-yellow/20 transition-all duration-1000" />
              
              <div className="relative z-10">
                <motion.div 
                  initial={{ rotate: -10, scale: 0.5 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-24 h-24 bg-taxi-yellow text-black rounded-4xl flex items-center justify-center mx-auto mb-10 shadow-[0_20px_50px_rgba(251,191,36,0.4)]"
                >
                  <CheckCircle className="w-12 h-12" />
                </motion.div>
                
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter italic">
                  {t.contact.success.title}
                </h2>
                
                <p className="text-gray-400 mb-12 text-lg md:text-xl font-medium leading-relaxed italic max-w-lg mx-auto">
                  {t.contact.success.message}
                </p>

                {/* Mini Receipt Style Summary */}
                <div className="bg-white/3 border border-white/10 rounded-3xl p-8 mb-12 text-left space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-1 h-full bg-taxi-yellow/20" />
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20">{t.contact.form.summaryTitle}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-taxi-yellow px-2 py-1 bg-taxi-yellow/10 rounded-md">Confirmada</span>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Pasajero</p>
                      <p className="text-white font-bold truncate">{formData.nombre}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Servicio</p>
                      <p className="text-taxi-yellow font-black italic">
                        {taxiTypes.find(t => t.value === formData.tipoTaxi)?.label || 
                         (formData.tipoTaxi === "7-8-plazas" ? t.taxiTypes.categories.plazas : t.taxiTypes.categories.estandar)}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setIsSuccess(false)
                    setCurrentStep(1)
                  }}
                  className="group relative bg-taxi-yellow text-black hover:bg-white font-black italic text-xl px-12 py-8 rounded-2xl transition-all shadow-[0_20px_40px_rgba(251,191,36,0.2)] overflow-hidden"
                >
                  <span className="relative z-10">{t.contact.success.cta}</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="contacto" className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-taxi-yellow/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-6xl font-bold text-white mb-4 uppercase tracking-tighter">{t.contact.title}</h2>
            <p className="text-gray-400 font-medium italic">{t.contact.subtitle}</p>
          </motion.div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-16 px-4">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center group relative">
                  <motion.div
                    animate={{ 
                      scale: currentStep === step.id ? 1.2 : 1,
                    }}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black italic text-lg transition-all duration-500 z-10 ${
                      currentStep >= step.id 
                      ? "bg-taxi-yellow text-black shadow-[0_0_20px_rgba(251,191,36,0.4)]" 
                      : "bg-white/5 text-white/30 border border-white/10"
                    }`}
                  >
                    {currentStep > step.id ? <CheckCircle className="w-6 h-6" /> : step.id}
                  </motion.div>
                  <span
                    className={`absolute -bottom-8 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-500 ${
                      currentStep >= step.id ? "text-taxi-yellow opacity-100" : "text-white/20 opacity-0"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className="relative w-12 sm:w-24 h-1 mx-3 overflow-hidden rounded-full bg-white/5">
                    <motion.div 
                      className="absolute inset-0 bg-taxi-yellow"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: currentStep > step.id ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="relative">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center gap-4 bg-red-500/5 border border-red-500/20 text-red-400 px-6 py-5 rounded-4xl mb-10 font-bold text-sm backdrop-blur-md"
                  >
                    <div className="w-8 h-8 bg-red-500/20 rounded-xl flex items-center justify-center shrink-0">
                      <X className="w-4 h-4" />
                    </div>
                    <p className="flex-1">{error}</p>
                    <button onClick={() => setError("")} className="hover:text-white transition-colors">
                      <X className="w-4 h-4 opacity-50" />
                    </button>
                  </motion.div>
                )}

                {/* Step 1: Personal Info */}
                {currentStep === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">{STEPS[0].title}</h3>
                      <p className="text-gray-400 italic text-sm">{STEPS[0].description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="nombre" className="text-white/50 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                          <User className="w-3 h-3 text-taxi-yellow" />
                          {t.contact.form.name}
                        </Label>
                        <Input
                          id="nombre"
                          required
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-14 rounded-2xl focus:border-taxi-yellow/50 transition-all font-medium"
                          placeholder={t.contact.form.namePlaceholder}
                          value={formData.nombre}
                          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="telefono" className="text-white/50 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                          <Phone className="w-3 h-3 text-taxi-yellow" />
                          {t.contact.form.phone}
                        </Label>
                        <Input
                          id="telefono"
                          type="tel"
                          required
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-14 rounded-2xl focus:border-taxi-yellow/50 transition-all font-medium"
                          placeholder={t.contact.form.phonePlaceholder}
                          value={formData.telefono}
                          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-3 px-1">
                      <Label htmlFor="email" className="text-white/50 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                        <Mail className="w-3 h-3 text-taxi-yellow" />
                        {t.contact.form.email}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-14 rounded-2xl focus:border-taxi-yellow/50 transition-all font-medium"
                        placeholder={t.contact.form.emailPlaceholder}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Trip Details */}
                {currentStep === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">{STEPS[1].title}</h3>
                      <p className="text-gray-400 italic text-sm">{STEPS[1].description}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="tipoTaxi" className="text-white/50 text-xs font-black uppercase tracking-widest">{t.contact.form.taxiType}</Label>
                        <Select
                          value={formData.tipoTaxi}
                          onValueChange={(value) => setFormData({ ...formData, tipoTaxi: value })}
                        >
                          <SelectTrigger id="tipoTaxi" className="bg-white/5 border-white/10 text-white h-14 rounded-2xl focus:ring-taxi-yellow/50">
                            <SelectValue placeholder={t.contact.form.taxiTypePlaceholder} />
                          </SelectTrigger>
                          <SelectContent className="bg-black/90 border-white/10 backdrop-blur-xl text-white">
                            {taxiTypes.map((tipo) => (
                              <SelectItem key={tipo.value} value={tipo.value} className="focus:bg-taxi-yellow focus:text-black font-medium">
                                {tipo.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="pasajeros" className="text-white/50 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                          <Users className="w-3 h-3 text-taxi-yellow" />
                          {t.contact.form.passengers}
                        </Label>
                        <Input
                          id="pasajeros"
                          type="number"
                          min="1"
                          max="8"
                          required
                          className="bg-white/5 border-white/10 text-white h-14 rounded-2xl focus:border-taxi-yellow/50 font-medium"
                          placeholder={t.contact.form.passengersPlaceholder}
                          value={formData.pasajeros}
                          onChange={(e) => setFormData({ ...formData, pasajeros: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="origen" className="text-white/50 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-taxi-yellow" />
                        {t.contact.form.origin}
                      </Label>

                      <div className="flex gap-3 flex-wrap">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setOrigenInputMode("text")}
                          className={`rounded-xl px-4 h-10 font-bold transition-all ${
                            origenInputMode === "text" ? "bg-taxi-yellow text-black" : "text-white/40 hover:text-white"
                          }`}
                        >
                          {t.contact.form.write}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setOrigenInputMode("select")}
                          className={`rounded-xl px-4 h-10 font-bold transition-all ${
                            origenInputMode === "select" ? "bg-taxi-yellow text-black" : "text-white/40 hover:text-white"
                          }`}
                        >
                          {t.contact.form.popular}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => openMap("origen")}
                          className="rounded-xl px-4 h-10 border border-white/10 text-white hover:bg-white hover:text-black font-bold transition-all"
                        >
                          <Map className="w-3 h-3 mr-2" />
                          {t.contact.form.map}
                        </Button>
                      </div>

                      {origenInputMode === "text" && (
                        <Input
                          id="origen"
                          required
                          className="bg-white/5 border-white/10 text-white h-14 rounded-2xl focus:border-taxi-yellow/50 font-medium"
                          placeholder={t.contact.form.originPlaceholder}
                          value={formData.origen}
                          onChange={(e) => setFormData({ ...formData, origen: e.target.value, origenCoords: null })}
                        />
                      )}

                      {origenInputMode === "select" && (
                        <Select
                          value={popularDestinations.find((d) => d.label === formData.origen)?.value || ""}
                          onValueChange={(value) => {
                            const dest = popularDestinations.find(d => d.value === value)
                            if (dest) setFormData({ ...formData, origen: dest.label, origenCoords: dest.coords })
                          }}
                        >
                          <SelectTrigger className="bg-white/5 border-white/10 text-white h-14 rounded-2xl">
                            <SelectValue placeholder={t.contact.form.originPlaceholder} />
                          </SelectTrigger>
                          <SelectContent className="bg-black/90 border-white/10 backdrop-blur-xl text-white">
                            {popularDestinations.map((dest) => (
                              <SelectItem key={dest.value} value={dest.value} className="focus:bg-taxi-yellow focus:text-black font-medium">
                                {dest.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}

                      {formData.origen && formData.origenCoords && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }} 
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 p-4 bg-taxi-yellow/10 border border-taxi-yellow/20 rounded-2xl"
                        >
                          <MapPin className="w-5 h-5 text-taxi-yellow shrink-0" />
                          <span className="text-sm text-yellow-400 font-bold flex-1">{formData.origen}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setFormData({ ...formData, origen: "", origenCoords: null })}
                            className="h-8 w-8 p-0 rounded-full hover:bg-taxi-yellow/20"
                          >
                            <X className="w-4 h-4 text-taxi-yellow" />
                          </Button>
                        </motion.div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <Label className="text-white/50 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-red-400" />
                        {t.contact.form.destination}
                      </Label>

                      <div className="flex gap-3 flex-wrap">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setDestinoInputMode("text")}
                          className={`rounded-xl px-4 h-10 font-bold transition-all ${
                            destinoInputMode === "text" ? "bg-taxi-yellow text-black" : "text-white/40 hover:text-white"
                          }`}
                        >
                          {t.contact.form.write}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setDestinoInputMode("select")}
                          className={`rounded-xl px-4 h-10 font-bold transition-all ${
                            destinoInputMode === "select" ? "bg-taxi-yellow text-black" : "text-white/40 hover:text-white"
                          }`}
                        >
                          {t.contact.form.popular}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => openMap("destino")}
                          className="rounded-xl px-4 h-10 border border-white/10 text-white hover:bg-white hover:text-black font-bold transition-all"
                        >
                          <Map className="w-3 h-3 mr-2" />
                          {t.contact.form.map}
                        </Button>
                      </div>

                      {destinoInputMode === "text" && (
                        <Input
                          id="destino"
                          required
                          className="bg-white/5 border-white/10 text-white h-14 rounded-2xl focus:border-taxi-yellow/50 font-medium"
                          placeholder={t.contact.form.destinationPlaceholder}
                          value={formData.destino}
                          onChange={(e) => setFormData({ ...formData, destino: e.target.value, destinoCoords: null })}
                        />
                      )}

                      {destinoInputMode === "select" && (
                        <Select
                          value={popularDestinations.find((d) => d.label === formData.destino)?.value || ""}
                          onValueChange={handlePopularDestinationSelect}
                        >
                          <SelectTrigger className="bg-white/5 border-white/10 text-white h-14 rounded-2xl">
                            <SelectValue placeholder={t.contact.form.taxiTypePlaceholder} />
                          </SelectTrigger>
                          <SelectContent className="bg-black/90 border-white/10 backdrop-blur-xl text-white">
                            {popularDestinations.map((dest) => (
                              <SelectItem key={dest.value} value={dest.value} className="focus:bg-taxi-yellow focus:text-black font-medium">
                                {dest.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}

                      {formData.destino && formData.destinoCoords && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }} 
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl"
                        >
                          <MapPin className="w-5 h-5 text-green-500 shrink-0" />
                          <span className="text-sm text-green-400 font-bold flex-1">{formData.destino}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setFormData({ ...formData, destino: "", destinoCoords: null })}
                            className="h-8 w-8 p-0 rounded-full hover:bg-green-500/20"
                          >
                            <X className="w-4 h-4 text-green-500" />
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Date, Time & Message */}
                {currentStep === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">{STEPS[2].title}</h3>
                      <p className="text-gray-400 italic text-sm">{STEPS[2].description}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="fecha" className="text-white/50 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-taxi-yellow" />
                          {t.contact.form.date}
                        </Label>
                        <Input
                          id="fecha"
                          type="date"
                          required
                          className="bg-white/5 border-white/10 text-white h-14 rounded-2xl focus:border-taxi-yellow/50 font-medium color-scheme-dark"
                          value={formData.fecha}
                          onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="hora" className="text-white/50 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                          <Clock className="w-3 h-3 text-taxi-yellow" />
                          {t.contact.form.time}
                        </Label>
                        <Input
                          id="hora"
                          type="time"
                          required
                          className="bg-white/5 border-white/10 text-white h-14 rounded-2xl focus:border-taxi-yellow/50 font-medium color-scheme-dark"
                          value={formData.hora}
                          onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="mensaje" className="text-white/50 text-xs font-black uppercase tracking-widest">{t.contact.form.additionalInfo}</Label>
                      <Textarea
                        id="mensaje"
                        className="bg-white/5 border-white/10 text-white rounded-2xl min-h-[120px] focus:border-taxi-yellow/50 p-4 font-medium"
                        placeholder={t.contact.form.additionalInfoPlaceholder}
                        value={formData.mensaje}
                        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      />
                    </div>

                    {/* Reassurance Message */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-3xl"
                    >
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0">
                        <Phone className="w-6 h-6 text-taxi-yellow" />
                      </div>
                      <p className="text-sm text-gray-300 font-medium italic">
                        {language === "es" 
                          ? "Para su tranquilidad, el conductor le llamará unos minutos antes de la recogida."
                          : "For your peace of mind, the driver will call you a few minutes before pick-up."}
                      </p>
                    </motion.div>

                    {/* Summary */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative p-10 rounded-[3rem] bg-white/3 border border-white/10 overflow-hidden group shadow-inner"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-taxi-yellow/5 blur-3xl rounded-full -mr-12 -mt-12" />
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-taxi-yellow/10 rounded-xl flex items-center justify-center border border-taxi-yellow/20">
                          <CheckCircle className="w-5 h-5 text-taxi-yellow" />
                        </div>
                        <h4 className="font-black italic text-white uppercase tracking-[0.2em] text-sm">{t.contact.form.summaryTitle}</h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm">
                        <div className="space-y-6">
                          <div className="flex flex-col group/item transition-all">
                            <span className="text-white/20 font-black uppercase tracking-[0.2em] text-[9px] mb-2 group-hover/item:text-taxi-yellow/40">{t.contact.form.summaryName}</span>
                            <span className="text-white font-bold text-base tracking-tight">{formData.nombre}</span>
                          </div>
                          <div className="flex flex-col group/item transition-all">
                            <span className="text-white/20 font-black uppercase tracking-[0.2em] text-[9px] mb-2 group-hover/item:text-taxi-yellow/40">{t.contact.form.summaryTaxi}</span>
                            <span className="text-taxi-yellow font-black italic text-lg uppercase tracking-tighter">
                               {taxiTypes.find((t) => t.value === formData.tipoTaxi)?.label || 
                                (formData.tipoTaxi === "7-8-plazas" ? t.taxiTypes.categories.plazas : t.taxiTypes.categories.estandar)}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div className="flex flex-col group/item transition-all">
                            <span className="text-white/20 font-black uppercase tracking-[0.2em] text-[9px] mb-2 group-hover/item:text-taxi-yellow/40">{t.contact.form.summaryFrom}</span>
                            <span className="text-white font-medium truncate italic border-l-2 border-white/5 pl-4">{formData.origen}</span>
                          </div>
                          <div className="flex flex-col group/item transition-all">
                            <span className="text-white/20 font-black uppercase tracking-[0.2em] text-[9px] mb-2 group-hover/item:text-taxi-yellow/40">{t.contact.form.summaryTo}</span>
                            <span className="text-white font-medium truncate italic border-l-2 border-taxi-yellow/20 pl-4">{formData.destino}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12 pt-10 border-t border-white/10">
                {currentStep > 1 ? (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={prevStep}
                    className="h-14 rounded-2xl px-8 font-bold text-white/50 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    {t.contact.form.prev}
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={currentStep === 1 ? !canProceedStep1 : !canProceedStep2}
                    className="bg-taxi-yellow text-black hover:bg-white h-14 rounded-2xl px-12 font-black italic shadow-[0_10px_30px_rgba(251,191,36,0.3)] transition-all disabled:opacity-30"
                  >
                    {t.contact.form.next}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!canProceedStep3 || isLoading}
                    className="bg-taxi-yellow text-black hover:bg-white h-14 rounded-2xl px-12 font-black italic shadow-[0_10px_30px_rgba(251,191,36,0.3)] transition-all disabled:opacity-30"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                        {t.contact.form.sending}
                      </>
                    ) : (
                      t.contact.form.confirm
                    )}
                  </Button>
                )}
              </div>
            </form>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center text-xs font-bold text-white/20 uppercase tracking-[0.2em] mt-10"
          >
            {t.contact.form.footer}
          </motion.p>
        </div>
      </div>

      {/* Map Modal */}
      <AnimatePresence>
        {showMap && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-black border border-white/10 rounded-[3rem] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl pb-4"
            >
              <div className="flex items-center justify-between p-8 border-b border-white/10">
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  {language === "es" 
                    ? (mapTarget === "origen" ? "Selecciona la recogida" : "Selecciona el destino")
                    : (mapTarget === "origen" ? "Select pick-up location" : "Select destination")}
                </h3>
                <Button variant="ghost" size="icon" onClick={() => setShowMap(false)} className="text-white/50 hover:text-white rounded-xl">
                  <X className="w-6 h-6" />
                </Button>
              </div>
              <div className="p-4 bg-black">
                <MapPicker onSelect={handleMapSelect} initialCoords={{ lat: 41.3851, lng: 2.1734 }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
