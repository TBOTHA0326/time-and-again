import { Hero } from '@/components/sections/Hero'
import { RestorationScroll } from '@/components/sections/RestorationScroll'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { GalleryPreview } from '@/components/sections/GalleryPreview'
import { ProcessStack } from '@/components/sections/ProcessStack'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTABanner } from '@/components/sections/CTABanner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <RestorationScroll />
      <About />
      <Services />
      <GalleryPreview />
      <ProcessStack />
      <Testimonials />
      <CTABanner />
    </>
  )
}
