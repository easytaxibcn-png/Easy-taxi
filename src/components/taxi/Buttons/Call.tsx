"use client"

import { Button } from "../../ui/button"
import { Phone } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

const CallButton = ({ className }: { className?: string }) => {
  const { t } = useLanguage()

  return (
    <a href="tel:+34614473393">
      <Button
        variant="secondary"
        className={className || "border-white text-foreground hover:bg-white  bg-white"}
      >
        <Phone className="w-4 h-4 mr-2" />
        {t.header.call}
      </Button>
    </a>
  )
}

export default CallButton
