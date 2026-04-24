import { InstagramLogo, WhatsappLogo, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'
import { BRAND, NAV_LINKS } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="relative bg-slate-brand text-cream">
      <div className="container-outer py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-5">
            <div className="font-display text-4xl md:text-5xl leading-tight">
              Time <span className="text-sage italic">&</span> Again
            </div>
            <p className="mt-4 font-display italic text-2xl text-sage/90">
              {BRAND.tagline}.
            </p>
            <p className="mt-6 text-sm text-cream/70 max-w-sm leading-relaxed">
              A small restoration workshop in {BRAND.location}, led by Katinka.
              We revive tired pieces with fresh colour, character, and craftsmanship —
              one at a time.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <div className="eyebrow text-cream/50 mb-5">Explore</div>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-base text-cream/85 hover:text-sage transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow text-cream/50 mb-5">Contact</div>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={BRAND.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cream/85 hover:text-sage transition-colors"
                >
                  <WhatsappLogo size={16} weight="fill" />
                  {BRAND.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={BRAND.mailHref}
                  className="flex items-center gap-2 text-cream/85 hover:text-sage transition-colors break-all"
                >
                  <EnvelopeSimple size={16} weight="regular" />
                  {BRAND.email}
                </a>
              </li>
              <li className="text-cream/70 pt-2">{BRAND.location}, South Africa</li>
            </ul>

            <div className="mt-8 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-cream/10 hover:bg-sage hover:text-slate-brand transition-colors"
              >
                <InstagramLogo size={18} weight="regular" />
              </a>
              <a
                href={BRAND.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-cream/10 hover:bg-sage hover:text-slate-brand transition-colors"
              >
                <WhatsappLogo size={18} weight="fill" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs text-cream/50">
          <span>&copy; {new Date().getFullYear()} Time &amp; Again. All rights reserved.</span>
          <span>Handcrafted in Vanderbijlpark.</span>
        </div>
      </div>
    </footer>
  )
}
