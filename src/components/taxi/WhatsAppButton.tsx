"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const phoneNumber = "34641230218" // Business number
  const whatsappUrl = `https://wa.me/${phoneNumber}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 left-8 z-40 flex items-center justify-center"
    >
      <div className="relative group">
        {/* Pulsing Aura */}
        <div className="absolute inset-0 bg-[#25D366] blur-[20px] opacity-40 group-hover:opacity-70 group-hover:blur-[30px] transition-all duration-500 rounded-full animate-pulse" />
        
        {/* Button Core */}
        <div className="relative w-16 h-16 bg-[#25D366] rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] border border-white/20 overflow-hidden">
          <MessageCircle className="w-8 h-8 text-white fill-white" />
          
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        {/* Floating Tooltip */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none -translate-x-2 group-hover:translate-x-0">
          <div className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-2xl relative">
            Whatsapp
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45" />
          </div>
        </div>
      </div>
    </motion.a>
  )
}
