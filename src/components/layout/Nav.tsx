'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import { BRAND, NAV_LINKS } from '@/lib/constants'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.2 }}
        className={[
          'fixed top-4 md:top-6 left-0 right-0 z-40 transition-colors duration-500',
        ].join(' ')}
      >
        <div className="container-outer">
          <div
            className={[
              'flex items-center justify-between rounded-full px-5 md:px-7 py-3 md:py-3.5',
              'border transition-all duration-500',
              scrolled
                ? 'bg-cream/80 backdrop-blur-md border-slate-brand/10 shadow-soft'
                : 'bg-cream/30 backdrop-blur-sm border-transparent',
            ].join(' ')}
          >
            <a
              href="/"
              className="flex items-baseline gap-2 font-display text-xl md:text-2xl text-slate-brand leading-none"
              aria-label={BRAND.name}
            >
              <span className="font-light tracking-tight">Time</span>
              <span className="text-sage font-light italic">&</span>
              <span className="font-light tracking-tight">Again</span>
            </a>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-brand/85 hover:text-slate-brand transition-colors rounded-full hover:bg-slate-brand/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/#contact"
                className="ml-2 px-5 py-2.5 text-sm font-medium text-cream bg-slate-brand rounded-full hover:bg-charcoal transition-colors active:scale-[0.98]"
              >
                Start a project
              </a>
            </nav>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-slate-brand/5 text-slate-brand"
              aria-label="Open menu"
            >
              <List size={22} weight="regular" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', stiffness: 120, damping: 22 }}
              className="absolute inset-0 bg-cream flex flex-col"
            >
              <div className="container-outer flex items-center justify-between pt-6">
                <span className="font-display text-2xl text-slate-brand">
                  Time <span className="text-sage italic">&</span> Again
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-brand/5 text-slate-brand"
                  aria-label="Close menu"
                >
                  <X size={22} weight="regular" />
                </button>
              </div>
              <nav className="flex-1 container-outer flex flex-col justify-center gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    className="font-display text-5xl text-slate-brand py-3 border-b border-slate-brand/10"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 inline-flex items-center justify-center px-6 py-4 rounded-full bg-slate-brand text-cream font-medium"
                >
                  Start a project
                </motion.a>
              </nav>
              <div className="container-outer pb-8 text-sm text-slate-brand/60">
                {BRAND.location} &middot; {BRAND.phoneDisplay}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
