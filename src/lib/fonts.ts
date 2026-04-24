import { Cormorant_Garamond, Outfit } from 'next/font/google'

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500'],
  variable: '--font-cormorant',
})

export const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
})
