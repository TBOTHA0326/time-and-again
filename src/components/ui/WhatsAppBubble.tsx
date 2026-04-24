'use client'

import { motion } from 'framer-motion'
import { WhatsappLogo } from '@phosphor-icons/react'
import { BRAND } from '@/lib/constants'

export function WhatsAppBubble() {
  return (
    <motion.a
      href={BRAND.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Time & Again on WhatsApp"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 1.1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-40 group"
    >
      <span className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-charcoal px-3 py-1.5 text-xs font-medium text-cream opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-soft">
        Chat with us
      </span>

      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping"
        style={{ animationDuration: '2.6s' }}
      />
      <span className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_-8px_rgba(37,211,102,0.55)] ring-1 ring-white/20">
        <WhatsappLogo size={26} weight="fill" />
      </span>
    </motion.a>
  )
}
