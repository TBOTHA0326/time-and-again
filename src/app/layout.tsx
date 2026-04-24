import type { Metadata } from 'next'
import { cormorant, outfit } from '@/lib/fonts'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppBubble } from '@/components/ui/WhatsAppBubble'
import './globals.css'

export const metadata: Metadata = {
  title: 'Time & Again — We Restore What You Adore',
  description:
    'Furniture restoration in Vanderbijlpark. Hand-finished repainting, wood repair, upholstery, and custom commissions — giving your furniture a second chance.',
  keywords: [
    'furniture restoration',
    'upcycled furniture',
    'Vanderbijlpark',
    'furniture repainting',
    'upholstery',
    'Time and Again',
  ],
  openGraph: {
    title: 'Time & Again — We Restore What You Adore',
    description:
      'Handcrafted furniture restoration from Vanderbijlpark. We revive tired pieces with fresh colour, character, and craftsmanship.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="bg-cream text-charcoal antialiased grain">
        <Nav />
        <main>{children}</main>
        <Footer />
        <WhatsAppBubble />
      </body>
    </html>
  )
}
