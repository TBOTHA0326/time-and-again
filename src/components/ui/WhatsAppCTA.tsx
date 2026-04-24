'use client'

import { motion } from 'framer-motion'
import { WhatsappLogo } from '@phosphor-icons/react'
import { BRAND } from '@/lib/constants'

interface WhatsAppCTAProps {
  title: string
  pieceType: string
  slug: string
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://timeandagain.co.za'

export function WhatsAppCTA({ title, pieceType, slug }: WhatsAppCTAProps) {
  const message = encodeURIComponent(
    `Hi Katinka, I'm interested in ${title} (${pieceType}) — ${SITE_URL}/shop/${slug}`
  )
  const href = `${BRAND.whatsappHref}?text=${message}`

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-7 py-4 text-white shadow-[0_12px_28px_-8px_rgba(37,211,102,0.45)] ring-1 ring-white/20 transition-shadow duration-300 hover:shadow-[0_16px_36px_-8px_rgba(37,211,102,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-cream active:scale-[0.97]"
      aria-label={`Inquire about ${title} via WhatsApp`}
    >
      <WhatsappLogo
        size={22}
        weight="fill"
        className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        aria-hidden
      />
      <span className="font-sans text-sm font-semibold uppercase tracking-[0.18em]">
        Inquire via WhatsApp
      </span>
    </motion.a>
  )
}
