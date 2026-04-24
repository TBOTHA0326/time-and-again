export const BRAND = {
  name: 'Time & Again',
  tagline: 'We Restore What You Adore',
  location: 'Vanderbijlpark',
  email: 'katinkapollac@gmail.com',
  phoneDisplay: '076 040 7277',
  whatsappNumber: '27760407277',
  whatsappHref: 'https://wa.me/27760407277',
  mailHref: 'mailto:katinkapollac@gmail.com',
} as const

export const NAV_LINKS = [
  { label: 'Work', href: '/#gallery' },
  { label: 'Shop', href: '/shop' },
  { label: 'Process', href: '/#process' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
] as const

export const GALLERY_CATEGORIES = [
  { key: 'all', label: 'All Work' },
  { key: 'colour', label: 'Colour' },
  { key: 'wood', label: 'Wood' },
  { key: 'upholstery', label: 'Upholstery' },
  { key: 'custom', label: 'Custom' },
] as const

export type GalleryCategory = Exclude<
  (typeof GALLERY_CATEGORIES)[number]['key'],
  'all'
>

export const SERVICES = [
  {
    number: '01',
    title: 'Colour Refresh',
    body:
      'A considered palette, sanded-back surfaces, hand-finished paint. We match tone to light, room, and the story of the piece.',
    image:
      'https://picsum.photos/seed/service-paint-dresser/900/1100',
  },
  {
    number: '02',
    title: 'Wood Restoration',
    body:
      'Cracks filled, veneer re-laid, joints re-glued. We keep the timber honest — grain forward, repair invisible.',
    image:
      'https://picsum.photos/seed/service-wood-grain/900/1100',
  },
  {
    number: '03',
    title: 'Upholstery Refresh',
    body:
      'New fabric, restored frames, hand-tied springs where it matters. Linens, bouclés, and velvets sourced for longevity.',
    image:
      'https://picsum.photos/seed/service-upholstery-velvet/900/1100',
  },
  {
    number: '04',
    title: 'Custom Commissions',
    body:
      'A flea market find reimagined, an heirloom re-cast. We collaborate from sketch to delivery — one piece at a time.',
    image:
      'https://picsum.photos/seed/service-custom-commission/900/1100',
  },
] as const

export const GALLERY = [
  {
    title: 'Sage Dresser',
    piece: 'Mid-century dresser',
    category: 'colour',
    year: '2025',
    before: 'https://picsum.photos/seed/before-dresser/800/1000',
    after: 'https://picsum.photos/seed/after-dresser/800/1000',
    aspect: 'tall',
  },
  {
    title: 'Linen Wingback',
    piece: 'Reupholstered wingback chair',
    category: 'upholstery',
    year: '2025',
    before: 'https://picsum.photos/seed/before-wingback/900/700',
    after: 'https://picsum.photos/seed/after-wingback/900/700',
    aspect: 'wide',
  },
  {
    title: 'Oak Writing Desk',
    piece: 'Restored oak desk',
    category: 'wood',
    year: '2024',
    before: 'https://picsum.photos/seed/before-desk/800/900',
    after: 'https://picsum.photos/seed/after-desk/800/900',
    aspect: 'tall',
  },
  {
    title: 'Sunday Sideboard',
    piece: 'Refinished sideboard',
    category: 'colour',
    year: '2024',
    before: 'https://picsum.photos/seed/before-sideboard/900/700',
    after: 'https://picsum.photos/seed/after-sideboard/900/700',
    aspect: 'wide',
  },
  {
    title: 'Reading Nook',
    piece: 'Reworked armchair',
    category: 'upholstery',
    year: '2024',
    before: 'https://picsum.photos/seed/before-armchair/800/1000',
    after: 'https://picsum.photos/seed/after-armchair/800/1000',
    aspect: 'tall',
  },
  {
    title: 'Old School Bench',
    piece: 'School bench revived',
    category: 'wood',
    year: '2023',
    before: 'https://picsum.photos/seed/before-bench/900/700',
    after: 'https://images.unsplash.com/photo-1538219476613-077c2b432da7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJlbmNofGVufDB8fDB8fHww',
    aspect: 'wide',
  },
  {
    title: 'Harvest Cabinet',
    piece: 'Bespoke hand-built cabinet',
    category: 'custom',
    year: '2025',
    before: 'https://picsum.photos/seed/before-cabinet/800/1000',
    after: 'https://picsum.photos/seed/after-cabinet/800/1000',
    aspect: 'tall',
  },
  {
    title: 'Morning Buffet',
    piece: 'Farmhouse buffet restored',
    category: 'wood',
    year: '2024',
    before: 'https://picsum.photos/seed/before-buffet/900/700',
    after: 'https://picsum.photos/seed/after-buffet/900/700',
    aspect: 'wide',
  },
  {
    title: 'Velvet Ottoman',
    piece: 'Reupholstered ottoman',
    category: 'upholstery',
    year: '2023',
    before: 'https://picsum.photos/seed/before-ottoman/800/1000',
    after: 'https://picsum.photos/seed/after-ottoman/800/1000',
    aspect: 'tall',
  },
] as const

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Consult',
    body:
      'Send a few photos and tell us the story. We reply with direction, rough cost, and a timeline — no hidden fees.',
  },
  {
    number: '02',
    title: 'Assess',
    body:
      'The piece comes to the workshop. We open it up, understand its bones, and finalise materials and finish.',
  },
  {
    number: '03',
    title: 'Restore',
    body:
      'Hand sanding, repair, paint, and upholstery happen slowly and by daylight. You get photos along the way.',
  },
  {
    number: '04',
    title: 'Deliver',
    body:
      'Wrapped, delivered, and placed. We stay close in case anything wants a tweak once it is home.',
  },
] as const

export const TESTIMONIALS = [
  {
    quote:
      'Katinka brought my grandmother’s dresser back to life. It looks like the piece I remember from her home, only softer.',
    name: 'Marli van Zyl',
    role: 'Vereeniging',
  },
  {
    quote:
      'We found a tired old sideboard at a flea market. What came back felt like it had always belonged in our dining room.',
    name: 'Dewald Pretorius',
    role: 'Vaalpark',
  },
  {
    quote:
      'Honest advice, gentle hands, and a finish I could not find anywhere else. Worth every rand.',
    name: 'Elsabé Nel',
    role: 'Sasolburg',
  },
  {
    quote:
      'My reading chair came home in linen the colour of morning light. I sit there every afternoon now.',
    name: 'Gerhard Oosthuizen',
    role: 'Vanderbijlpark',
  },
] as const
