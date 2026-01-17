"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Users, MapPin, Phone, Mail, User, Clock, Loader2, CheckCircle, Map, X } from "lucide-react"
import dynamic from "next/dynamic"

const taxiTypes = [
  { value: "estandar", label: "Taxi Estándar" },
  { value: "7-8-plazas", label: "7/8 Plazas" },
  { value: "premium", label: "Premium" },
  { value: "adaptado", label: "Adaptado PMR" },
]

const popularDestinations = [
  { value: "aeropuerto-prat", label: "Aeropuerto El Prat", coords: { lat: 41.2974, lng: 2.0833 } },
  { value: "aeropuerto-girona", label: "Aeropuerto Girona", coords: { lat: 41.9009, lng: 2.7606 } },
  { value: "lloret", label: "Lloret del Mar", coords: { lat: 41.7, lng: 2.8453 } },
  { value: "port-aventura", label: "Port Aventura", coords: { lat: 41.0869, lng: 1.1556 } },
  { value: "andorra", label: "Andorra", coords: { lat: 42.5063, lng: 1.5218 } },
  { value: "sitges", label: "Sitges", coords: { lat: 41.2371, lng: 1.8058 } },
  { value: "tarragona", label: "Tarragona", coords: { lat: 41.1189, lng: 1.2445 } },
]

// Dynamic import for map component to avoid SSR issues
const MapPicker = dynamic(() => import("./MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-neutral-100 rounded-lg flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-taxi-yellow" />
    </div>
  ),
})

export function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipoTaxi: "",
    origen: "",
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
  const [destinoInputMode, setDestinoInputMode] = useState<"text" | "select">("text")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    setFormData({ ...formData, destino: address, destinoCoords: coords })
    setShowMap(false)
  }

  const handlePopularDestinationSelect = (value: string) => {
    const destination = popularDestinations.find((d) => d.value === value)
    if (destination) {
      setFormData({
        ...formData,
        destino: destination.label,
        destinoCoords: destination.coords,
      })
    }
  }

  if (isSuccess) {
    return (
      <section id="contacto" className="py-16 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Reserva Enviada!</h2>
              <p className="text-muted-foreground mb-6">
                Hemos recibido tu solicitud. Te contactaremos en menos de 10 minutos para confirmar tu reserva.
              </p>
              <Button onClick={() => setIsSuccess(false)} className="bg-taxi-yellow text-black hover:bg-taxi-yellow/90">
                Hacer otra reserva
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contacto" className="py-16 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Reserva tu Taxi</h2>
            <p className="text-muted-foreground">Completa el formulario y te contactaremos de inmediato</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
              )}

              {/* Personal Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-taxi-yellow" />
                    Nombre completo *
                  </Label>
                  <Input
                    id="nombre"
                    required
                    placeholder="Juan Pérez"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-taxi-yellow" />
                    Teléfono *
                  </Label>
                  <Input
                    id="telefono"
                    type="tel"
                    required
                    placeholder="+34 600 000 000"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-taxi-yellow" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="correo@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isLoading}
                />
              </div>

              {/* Service Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tipoTaxi">Tipo de taxi *</Label>
                  <Select
                    value={formData.tipoTaxi}
                    onValueChange={(value) => setFormData({ ...formData, tipoTaxi: value })}
                    disabled={isLoading}
                    required
                  >
                    <SelectTrigger id="tipoTaxi">
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {taxiTypes.map((tipo) => (
                        <SelectItem key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pasajeros" className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-taxi-yellow" />
                    Número de pasajeros *
                  </Label>
                  <Input
                    id="pasajeros"
                    type="number"
                    min="1"
                    max="8"
                    required
                    placeholder="1"
                    value={formData.pasajeros}
                    onChange={(e) => setFormData({ ...formData, pasajeros: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Location Details */}
              <div className="space-y-2">
                <Label htmlFor="origen" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-taxi-yellow" />
                  Dirección de recogida *
                </Label>
                <Input
                  id="origen"
                  required
                  placeholder="Calle, número, ciudad"
                  value={formData.origen}
                  onChange={(e) => setFormData({ ...formData, origen: e.target.value })}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  Destino *
                </Label>

                {/* Tabs para cambiar modo */}
                <div className="flex gap-2 flex-wrap">
                  <Button
                    type="button"
                    variant={destinoInputMode === "text" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDestinoInputMode("text")}
                    className={destinoInputMode === "text" ? "bg-taxi-yellow text-black hover:bg-taxi-yellow/90" : ""}
                  >
                    Escribir dirección
                  </Button>
                  <Button
                    type="button"
                    variant={destinoInputMode === "select" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDestinoInputMode("select")}
                    className={destinoInputMode === "select" ? "bg-taxi-yellow text-black hover:bg-taxi-yellow/90" : ""}
                  >
                    Destinos populares
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowMap(true)}
                    className="border-taxi-yellow text-taxi-yellow hover:bg-taxi-yellow hover:text-black"
                  >
                    <Map className="w-4 h-4 mr-2" />
                    Seleccionar en mapa
                  </Button>
                </div>

                {/* Input de texto */}
                {destinoInputMode === "text" && (
                  <Input
                    id="destino"
                    required
                    placeholder="Escribe la dirección de destino"
                    value={formData.destino}
                    onChange={(e) => setFormData({ ...formData, destino: e.target.value, destinoCoords: null })}
                    disabled={isLoading}
                  />
                )}

                {/* Select de destinos populares */}
                {destinoInputMode === "select" && (
                  <Select
                    value={popularDestinations.find((d) => d.label === formData.destino)?.value || ""}
                    onValueChange={handlePopularDestinationSelect}
                    disabled={isLoading}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un destino popular" />
                    </SelectTrigger>
                    <SelectContent>
                      {popularDestinations.map((dest) => (
                        <SelectItem key={dest.value} value={dest.value}>
                          {dest.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {/* Mostrar destino seleccionado si viene del mapa */}
                {formData.destino && formData.destinoCoords && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <MapPin className="w-4 h-4 text-green-600 shrink-0" />
                    <span className="text-sm text-green-800 flex-1">{formData.destino}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFormData({ ...formData, destino: "", destinoCoords: null })}
                      className="h-6 w-6 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Date and Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fecha" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-taxi-yellow" />
                    Fecha *
                  </Label>
                  <Input
                    id="fecha"
                    type="date"
                    required
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hora" className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-taxi-yellow" />
                    Hora *
                  </Label>
                  <Input
                    id="hora"
                    type="time"
                    required
                    value={formData.hora}
                    onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-2">
                <Label htmlFor="mensaje">Información adicional</Label>
                <Textarea
                  id="mensaje"
                  placeholder="Equipaje especial, silla de bebé, etc."
                  rows={4}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-taxi-yellow text-black hover:bg-taxi-yellow/90 font-bold py-6 text-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Solicitar Reserva"
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Te contactaremos en menos de 10 minutos para confirmar tu reserva
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Modal del mapa */}
      {showMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Selecciona el destino en el mapa</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowMap(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-4">
              <MapPicker onSelect={handleMapSelect} initialCoords={{ lat: 41.3851, lng: 2.1734 }} />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
