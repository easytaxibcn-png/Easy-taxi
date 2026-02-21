"use client"

import { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"

// Fix for default marker icon in Leaflet with Next.js
const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
})

interface MapPickerProps {
    onSelect: (address: string, coords: { lat: number; lng: number }) => void
    initialCoords?: { lat: number; lng: number }
    confirmText?: string
}

function LocationMarker({
    position,
    setPosition,
}: {
    position: { lat: number; lng: number } | null
    setPosition: (pos: { lat: number; lng: number }) => void
}) {
    useMapEvents({
        click(e) {
            setPosition({ lat: e.latlng.lat, lng: e.latlng.lng })
        },
    })

    return position ? <Marker position={[position.lat, position.lng]} icon={customIcon} /> : null
}

export default function MapPicker({ onSelect, initialCoords = { lat: 41.3851, lng: 2.1734 }, confirmText = "Confirmar destino" }: MapPickerProps) {
    const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null)
    const [address, setAddress] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const [isLoadingAddress, setIsLoadingAddress] = useState(false)
    const mapRef = useRef<L.Map | null>(null)

    // Reverse geocoding when position changes
    useEffect(() => {
        if (position) {
            setIsLoadingAddress(true)
            fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}&addressdetails=1`,
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data.display_name) {
                        setAddress(data.display_name)
                    }
                })
                .catch(() => {
                    setAddress(`${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`)
                })
                .finally(() => {
                    setIsLoadingAddress(false)
                })
        }
    }, [position])

    // Search location by address
    const handleSearch = async () => {
        if (!searchQuery.trim()) return

        setIsSearching(true)
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`,
            )
            const data = await response.json()

            if (data && data.length > 0) {
                const { lat, lon, display_name } = data[0]
                const newPos = { lat: Number.parseFloat(lat), lng: Number.parseFloat(lon) }
                setPosition(newPos)
                setAddress(display_name)

                // Center map on result
                if (mapRef.current) {
                    mapRef.current.setView([newPos.lat, newPos.lng], 15)
                }
            }
        } catch (error) {
            console.error("Error searching location:", error)
        } finally {
            setIsSearching(false)
        }
    }

    const handleConfirm = () => {
        if (position && address) {
            onSelect(address, position)
        }
    }

    return (
        <div className="space-y-4">
            {/* Search bar */}
            <div className="flex gap-2">
                <Input
                    placeholder="Buscar dirección..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="flex-1 text-black placeholder:text-gray-500 bg-white"
                />
                <Button
                    type="button"
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="bg-taxi-yellow text-black hover:bg-taxi-yellow/90"
                >
                    {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                </Button>
            </div>

            {/* Map */}
            <div className="h-[350px] rounded-lg overflow-hidden border">
                <MapContainer center={[initialCoords.lat, initialCoords.lng]} zoom={12} className="h-full w-full" ref={mapRef}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker position={position} setPosition={setPosition} />
                </MapContainer>
            </div>

            {/* Selected address */}
            {position && (
                <div className="p-3 bg-neutral-50 rounded-lg border">
                    <p className="text-sm text-neutral-600 mb-1">Ubicación seleccionada:</p>
                    {isLoadingAddress ? (
                        <div className="flex items-center gap-2 text-black">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">Obteniendo dirección...</span>
                        </div>
                    ) : (
                        <p className="text-sm font-medium text-black">{address}</p>
                    )}
                </div>
            )}

            {/* Confirm button */}
            <Button
                type="button"
                onClick={handleConfirm}
                disabled={!position || !address || isLoadingAddress}
                className="w-full bg-taxi-yellow text-black hover:bg-taxi-yellow/90 font-semibold"
            >
                {confirmText}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
                Haz clic en el mapa para seleccionar la ubicación o usa el buscador
            </p>
        </div>
    )
}
