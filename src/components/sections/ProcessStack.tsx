'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { PROCESS_STEPS } from '@/lib/constants'

export function ProcessStack() {
  return (
    <section id="process" className="relative bg-slate-brand text-cream py-28 md:py-40 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 20% 0%, rgba(143,175,159,0.35) 0%, rgba(143,175,159,0) 50%),' +
            'radial-gradient(ellipse at 80% 100%, rgba(184,169,138,0.25) 0%, rgba(184,169,138,0) 55%)',
        }}
      />

      <div className="container-outer relative">
        <div className="max-w-2xl mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-sage/60" />
            <span className="eyebrow text-sage">How we work</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.98] tracking-tight">
            A careful, honest
            <br />
            <span className="italic text-sage">four-step</span> process.
          </h2>
          <p className="mt-6 text-base md:text-lg text-cream/75 max-w-lg leading-relaxed">
            No surprises. Every restoration follows the same deliberate rhythm,
            from the first message to the day it comes home.
          </p>
        </div>

        <div className="relative">
          {PROCESS_STEPS.map((step, i) => (
            <StackCard key={step.number} step={step} index={i} total={PROCESS_STEPS.length} />
          ))}
          <div className="h-[40vh]" aria-hidden />
        </div>
      </div>
    </section>
  )
}

function StackCard({
  step,
  index,
  total,
}: {
  step: (typeof PROCESS_STEPS)[number]
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0.3, 0.6], [1, 0.95])
  const opacity = useTransform(scrollYProgress, [0.45, 0.7], [1, 0.55])

  const topOffset = 80 + index * 28

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: topOffset }}
    >
      <motion.div
        style={{ scale, opacity }}
        className="relative mb-6 md:mb-8 rounded-[28px] md:rounded-[36px] bg-cream text-slate-brand ring-1 ring-slate-brand/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 p-8 md:p-12 gap-6 md:gap-10">
          <div className="md:col-span-3 flex md:flex-col gap-4 md:gap-0 items-start md:items-start">
            <span className="font-display text-6xl md:text-8xl italic text-sage leading-none">
              {step.number}
            </span>
            <span className="eyebrow text-slate-brand/60 mt-auto md:mt-8">
              Step {index + 1} of {total}
            </span>
          </div>
          <div className="md:col-span-9 md:pl-6 md:border-l border-slate-brand/10">
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-slate-brand leading-[1.02] tracking-tight">
              {step.title}
            </h3>
            <p className="mt-5 text-base md:text-lg text-charcoal/75 leading-relaxed max-w-xl">
              {step.body}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
