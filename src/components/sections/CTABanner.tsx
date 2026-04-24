import { ArrowRight, WhatsappLogo, EnvelopeSimple, MapPin } from '@phosphor-icons/react/dist/ssr'
import { BRAND } from '@/lib/constants'

export function CTABanner() {
  return (
    <section id="contact" className="relative py-28 md:py-40 bg-cream">
      <div className="container-outer">
        <div className="relative overflow-hidden rounded-[32px] md:rounded-[44px] bg-sage text-slate-brand shadow-card">
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              background:
                'radial-gradient(ellipse at 10% 0%, rgba(245,242,236,0.45) 0%, rgba(245,242,236,0) 55%),' +
                'radial-gradient(ellipse at 90% 110%, rgba(184,169,138,0.5) 0%, rgba(184,169,138,0) 55%)',
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 p-8 md:p-14 lg:p-20 items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow text-slate-brand/80">Start a restoration</span>
              <h2 className="mt-4 font-display text-5xl md:text-6xl lg:text-7xl text-slate-brand leading-[0.98] tracking-tight">
                Got a piece
                <br />
                <span className="italic">worth saving?</span>
              </h2>
              <p className="mt-6 max-w-lg text-base md:text-lg text-slate-brand/80 leading-relaxed">
                Send us a few photographs and the story behind it. We will come back
                with direction, a rough cost, and a timeline — usually within
                forty-eight hours.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={BRAND.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-slate-brand text-cream pl-6 pr-5 py-3.5 text-sm font-medium transition-all hover:bg-charcoal active:translate-y-[1px]"
                >
                  <WhatsappLogo size={16} weight="fill" />
                  Message on WhatsApp
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-cream/10 group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={13} weight="bold" />
                  </span>
                </a>
                <a
                  href={BRAND.mailHref}
                  className="inline-flex items-center gap-2 rounded-full bg-cream/70 text-slate-brand px-5 py-3.5 text-sm font-medium ring-1 ring-slate-brand/10 hover:bg-cream transition-colors"
                >
                  <EnvelopeSimple size={16} weight="regular" />
                  Email instead
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 lg:pl-8 space-y-5">
              <ContactRow
                icon={<WhatsappLogo size={18} weight="fill" />}
                label="WhatsApp / Phone"
                value={BRAND.phoneDisplay}
                href={BRAND.whatsappHref}
              />
              <ContactRow
                icon={<EnvelopeSimple size={18} weight="regular" />}
                label="Email"
                value={BRAND.email}
                href={BRAND.mailHref}
              />
              <ContactRow
                icon={<MapPin size={18} weight="regular" />}
                label="Workshop"
                value={`${BRAND.location}, South Africa`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const content = (
    <div className="flex items-start gap-4 py-4 border-t border-slate-brand/15 first:border-t-0">
      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-cream text-slate-brand ring-1 ring-slate-brand/10 flex-shrink-0">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="eyebrow text-slate-brand/70">{label}</div>
        <div className="mt-1 font-medium text-slate-brand truncate">{value}</div>
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="block rounded-xl hover:bg-cream/40 transition-colors px-2"
      >
        {content}
      </a>
    )
  }
  return <div className="px-2">{content}</div>
}
