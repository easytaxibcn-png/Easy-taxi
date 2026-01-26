"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { Language } from "@/i18n/translations"
import { ChevronDown, Globe } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function LanguageSelector({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage()

  return (
    <div className={className}>
      <Select
        value={language}
        onValueChange={(value) => setLanguage(value as Language)}
      >
        <SelectTrigger className="w-[145px] bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all rounded-full h-9">
          <Globe className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent className="bg-black/90 border-white/20 text-white backdrop-blur-xl">
          <SelectItem value="es" className="focus:bg-taxi-yellow focus:text-black">
            Español
          </SelectItem>
          <SelectItem value="en" className="focus:bg-taxi-yellow focus:text-black">
            English
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
