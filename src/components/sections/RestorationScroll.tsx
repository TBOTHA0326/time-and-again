'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

const STEPS = [
  {
    t: 'Arrives worn',
    d: 'Cracked finish, tired fabric, the weight of years.',
  },
  {
    t: 'Taken apart',
    d: 'Sanded by hand, repaired at the joints, cleaned back to bare wood.',
  },
  {
    t: 'Colour returns',
    d: 'A palette is chosen. Paint, stain, and linen layered with care.',
  },
  {
    t: 'Adored again',
    d: 'Hand-polished, delivered home — waiting for its next chapter.',
  },
] as const

export function RestorationScroll() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const afterClip = useTransform(
    scrollYProgress,
    [0.05, 0.92],
    ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'],
  )

  const beforeFilter = useTransform(
    scrollYProgress,
    [0, 1],
    [
      'grayscale(1) sepia(0.45) contrast(0.88) brightness(0.9)',
      'grayscale(0.15) sepia(0.05) contrast(0.98) brightness(0.98)',
    ],
  )

  const dust1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-70%'])
  const dust1Opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.65, 0.88],
    [0, 0.9, 0.4, 0],
  )
  const dust2Y = useTransform(scrollYProgress, [0, 1], ['15%', '-90%'])
  const dust2Opacity = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.75, 1],
    [0, 0.75, 0.3, 0],
  )
  const brushX = useTransform(scrollYProgress, [0.05, 0.92], ['-10%', '105%'])
  const brushOpacity = useTransform(
    scrollYProgress,
    [0.02, 0.1, 0.85, 0.95],
    [0, 1, 1, 0],
  )

  const progressH = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const s1 = useStepOpacity(scrollYProgress, 0)
  const s2 = useStepOpacity(scrollYProgress, 1)
  const s3 = useStepOpacity(scrollYProgress, 2)
  const s4 = useStepOpacity(scrollYProgress, 3)
  const stepOpacities = [s1, s2, s3, s4]

  return (
    <>
      <section
        ref={sectionRef}
        id="restoration"
        className="relative bg-cream-deep hidden md:block"
        style={{ height: '380vh' }}
        aria-label="The restoration process, revealed as you scroll"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
          <div className="absolute left-8 xl:left-12 top-0 bottom-0 w-px bg-slate-brand/10">
            <motion.div
              aria-hidden
              className="absolute top-0 left-0 w-px bg-sage"
              style={{ height: progressH }}
            />
          </div>

          <div className="container-outer relative w-full">
            <div className="grid grid-cols-12 gap-10 items-center">
              <div className="col-span-5 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-10 bg-slate-brand/40" />
                  <span className="eyebrow">The Transformation</span>
                </div>
                <h2 className="font-display text-5xl xl:text-6xl text-slate-brand leading-[1.02] tracking-tight">
                  From forgotten
                  <br />
                  <span className="italic text-sage">to adored</span>
                  <span className="text-sand">.</span>
                </h2>
                <p className="mt-6 max-w-md text-base text-charcoal/70 leading-relaxed">
                  Scroll slowly. Every piece that arrives at the workshop begins tired
                  and ends loved — this is the shape of that journey.
                </p>

                <div className="mt-10 space-y-5">
                  {STEPS.map((s, i) => (
                    <motion.div
                      key={s.t}
                      style={{ opacity: stepOpacities[i] }}
                      className="flex gap-4"
                    >
                      <span className="font-mono text-xs text-sage tabular-nums pt-1">
                        0{i + 1}
                      </span>
                      <div>
                        <div className="font-display text-2xl text-slate-brand leading-tight">
                          {s.t}
                        </div>
                        <div className="text-sm text-charcoal/65 mt-1 max-w-sm">
                          {s.d}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="col-span-7 relative">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px]">
                  <div
                    aria-hidden
                    className="absolute -inset-10 rounded-[48px] bg-gradient-to-br from-sage/30 via-transparent to-sand/30 blur-2xl"
                  />

                  <div className="relative h-full w-full rounded-[36px] overflow-hidden ring-1 ring-slate-brand/10 shadow-card">
                    <motion.div
                      className="absolute inset-0"
                      style={{ filter: beforeFilter }}
                    >
                      <ChairIllustration variant="before" />
                    </motion.div>

                    <motion.div
                      className="absolute inset-0"
                      style={{ clipPath: afterClip }}
                    >
                      <ChairIllustration variant="after" />
                    </motion.div>

                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 w-32 -skew-x-12"
                      style={{
                        left: brushX,
                        opacity: brushOpacity,
                        background:
                          'linear-gradient(90deg, rgba(245,242,236,0) 0%, rgba(143,175,159,0.45) 50%, rgba(245,242,236,0) 100%)',
                        filter: 'blur(8px)',
                      }}
                    />

                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{ y: dust1Y, opacity: dust1Opacity }}
                    >
                      <DustField seed={1} />
                    </motion.div>
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{ y: dust2Y, opacity: dust2Opacity }}
                    >
                      <DustField seed={2} />
                    </motion.div>

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-brand/25 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <span className="absolute top-5 left-5 bg-cream/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.25em] text-slate-brand font-semibold">
                    Before &rarr; After
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="md:hidden relative bg-cream-deep py-20">
        <div className="container-outer">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-slate-brand/40" />
            <span className="eyebrow">The Transformation</span>
          </div>
          <h2 className="font-display text-4xl text-slate-brand leading-tight">
            From forgotten <span className="italic text-sage">to adored</span>
            <span className="text-sand">.</span>
          </h2>
          <div className="relative aspect-[4/5] w-full mt-8 rounded-[28px] overflow-hidden ring-1 ring-slate-brand/10 shadow-card">
            <div className="absolute inset-0 animate-restore-mobile">
              <ChairIllustration variant="after" />
            </div>
          </div>
          <p className="mt-6 text-base text-charcoal/70 max-w-md">
            Every piece that arrives at the workshop begins tired and ends loved —
            the shape of that journey, one slow step at a time.
          </p>
        </div>
      </section>
    </>
  )
}

function useStepOpacity(progress: MotionValue<number>, index: number) {
  const span = 0.25
  const start = index * span
  const end = (index + 1) * span
  const fade = 0.06
  return useTransform(
    progress,
    [
      Math.max(0, start - fade),
      start + fade,
      Math.max(0, end - fade),
      Math.min(1, end + fade),
    ],
    [0.25, 1, 1, index === STEPS.length - 1 ? 1 : 0.25],
  )
}

function ChairIllustration({ variant }: { variant: 'before' | 'after' }) {
  const isBefore = variant === 'before'
  const bg = isBefore ? '#D6CAB1' : '#E6EEE8'
  const chair = isBefore ? '#8C7D5F' : '#8FAF9F'
  const chairShade = isBefore ? '#6E6142' : '#6E9584'
  const legs = isBefore ? '#4A3A25' : '#3D4F5C'

  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full"
      aria-hidden
    >
      <defs>
        <linearGradient id={`bg-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={bg} stopOpacity="0.85" />
          <stop offset="100%" stopColor={bg} />
        </linearGradient>
        <linearGradient id={`shade-${variant}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={chairShade} stopOpacity="0.4" />
          <stop offset="50%" stopColor={chairShade} stopOpacity="0" />
          <stop offset="100%" stopColor={chairShade} stopOpacity="0.45" />
        </linearGradient>
      </defs>

      <rect width="400" height="500" fill={`url(#bg-${variant})`} />

      <ellipse cx="200" cy="432" rx="150" ry="10" fill="black" opacity="0.08" />

      <path
        d="M 110 140 Q 110 100 150 100 L 250 100 Q 290 100 290 140 L 290 260 L 110 260 Z"
        fill={chair}
      />
      <path
        d="M 110 140 Q 110 100 150 100 L 250 100 Q 290 100 290 140 L 290 260 L 110 260 Z"
        fill={`url(#shade-${variant})`}
      />

      <path
        d="M 55 210 Q 45 210 45 225 L 45 360 L 95 360 L 95 225 Q 95 215 85 215 Z"
        fill={chair}
      />
      <path d="M 45 225 L 55 225 L 55 360 L 45 360 Z" fill={chairShade} opacity="0.25" />

      <path
        d="M 305 210 Q 305 215 315 215 L 345 215 Q 355 215 355 225 L 355 360 L 305 360 Z"
        fill={chair}
      />
      <path d="M 345 225 L 355 225 L 355 360 L 345 360 Z" fill={chairShade} opacity="0.3" />

      <path
        d="M 85 245 L 315 245 Q 330 245 330 260 L 330 328 Q 330 342 315 342 L 85 342 Q 70 342 70 328 L 70 260 Q 70 245 85 245 Z"
        fill={chair}
      />
      <path
        d="M 85 256 Q 200 250 315 256"
        fill="none"
        stroke={chairShade}
        strokeWidth="1.5"
        opacity="0.4"
      />
      <path
        d="M 85 342 Q 200 336 315 342"
        fill="none"
        stroke={chairShade}
        strokeWidth="1.5"
        opacity="0.3"
      />

      <rect x="70" y="342" width="14" height="75" rx="2" fill={legs} />
      <rect x="316" y="342" width="14" height="75" rx="2" fill={legs} />
      <rect x="52" y="360" width="12" height="58" rx="2" fill={legs} />
      <rect x="336" y="360" width="12" height="58" rx="2" fill={legs} />

      {isBefore && (
        <g stroke="#5A4830" strokeWidth="1.3" fill="none" opacity="0.55">
          <path d="M 145 130 Q 158 160 148 200 L 152 248" />
          <path d="M 220 108 L 224 170 L 216 235" />
          <path d="M 260 150 Q 272 180 258 222" />
          <path d="M 100 288 L 135 305 L 128 330" />
          <path d="M 278 282 Q 300 305 286 330" />
          <path d="M 170 274 L 182 300 L 166 322" />
          <circle cx="180" cy="180" r="3.5" fill="#5A4830" opacity="0.35" stroke="none" />
          <circle cx="240" cy="200" r="2.8" fill="#5A4830" opacity="0.3" stroke="none" />
          <circle cx="155" cy="215" r="2" fill="#5A4830" opacity="0.3" stroke="none" />
          <circle cx="265" cy="310" r="2.5" fill="#5A4830" opacity="0.3" stroke="none" />
        </g>
      )}

      {!isBefore && (
        <g fill="white" opacity="0.14">
          <path d="M 130 120 Q 140 105 165 105 L 180 105 Q 155 118 145 140 L 138 175 Z" />
          <path d="M 85 250 Q 100 245 130 250 L 130 260 L 95 262 Z" />
          <path d="M 55 230 L 63 230 L 63 345 L 55 345 Z" opacity="0.5" />
        </g>
      )}
    </svg>
  )
}

function DustField({ seed }: { seed: number }) {
  const motes = Array.from({ length: 16 }).map((_, i) => {
    const r = (i * 97 + seed * 31) % 100
    const s = (i * 53 + seed * 17) % 100
    const size = ((i + seed) % 3) + 2
    return { left: `${r}%`, top: `${s}%`, size }
  })
  return (
    <>
      {motes.map((m, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-sand/70 blur-[1px]"
          style={{
            left: m.left,
            top: m.top,
            width: m.size,
            height: m.size,
          }}
        />
      ))}
    </>
  )
}
