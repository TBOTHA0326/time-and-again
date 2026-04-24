import Image from 'next/image'

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-40 bg-cream">
      <div className="container-outer">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 lg:col-start-1 relative">
            <div className="relative aspect-[4/5] max-w-[420px] mx-auto lg:mx-0">
              <div
                aria-hidden
                className="absolute -top-5 -left-5 right-8 bottom-12 rounded-[24px] border border-sand"
              />
              <div className="relative h-full w-full overflow-hidden rounded-[20px] shadow-soft ring-1 ring-slate-brand/10">
                <Image
                  src="https://picsum.photos/seed/katinka-workshop-portrait/900/1100"
                  alt="Katinka at work in the Vanderbijlpark workshop"
                  fill
                  sizes="(max-width: 1024px) 80vw, 420px"
                  className="object-cover"
                />
              </div>

              <div className="absolute -bottom-8 -right-4 md:-right-10 bg-sage text-cream rounded-2xl px-5 py-4 shadow-soft">
                <div className="font-display text-3xl leading-none italic">8+</div>
                <div className="text-[10px] uppercase tracking-[0.25em] mt-1 opacity-90">
                  Years of
                  <br />
                  restorations
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-slate-brand/40" />
              <span className="eyebrow">About Katinka</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-slate-brand leading-[1.03] tracking-tight">
              Every piece has a second chapter —
              <span className="italic text-sage"> we help it find the words.</span>
            </h2>

            <div className="mt-8 space-y-5 max-w-xl text-base md:text-lg text-charcoal/75 leading-relaxed">
              <p>
                Time &amp; Again is a small Vanderbijlpark workshop led by Katinka
                Pollac. What began as a love for heirlooms and flea-market finds grew
                into a careful restoration practice — one piece at a time, by hand.
              </p>
              <p>
                We work carefully. We choose gentle materials. And we listen to what the
                piece is asking for, rather than forcing a look onto it. The result is
                furniture that feels considered, warm, and uniquely yours.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-6 max-w-xl">
              {[
                { k: 'Workshop', v: 'Vanderbijlpark' },
                { k: 'Approach', v: 'Hand-finished' },
                { k: 'Commissions', v: 'By appointment' },
              ].map((item) => (
                <div key={item.k} className="border-t border-slate-brand/15 pt-3">
                  <div className="eyebrow">{item.k}</div>
                  <div className="mt-1 text-slate-brand font-medium">{item.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
