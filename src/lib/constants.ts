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
      'https://images.unsplash.com/photo-1763702280990-912ca41b93e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEwfHx1cG9sc3RlcnklMjBjb2xvcnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    number: '02',
    title: 'Wood Restoration',
    body:
      'Cracks filled, veneer re-laid, joints re-glued. We keep the timber honest — grain forward, repair invisible.',
    image:
      'https://images.unsplash.com/photo-1572726133865-fe9d8314fa96?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHJlc3RvcmF0aW9ufGVufDB8fDB8fHww',
  },
  {
    number: '03',
    title: 'Upholstery Refresh',
    body:
      'New fabric, restored frames, hand-tied springs where it matters. Linens, bouclés, and velvets sourced for longevity.',
    image:
      'https://images.unsplash.com/photo-1631700679418-c731f23320fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM0fHx1cGhvbHN0ZXJ5JTIwcmVmcmVzaHxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    number: '04',
    title: 'Custom Commissions',
    body:
      'A flea market find reimagined, an heirloom re-cast. We collaborate from sketch to delivery — one piece at a time.',
    image:
      'https://images.unsplash.com/photo-1600078307129-97e9d51d19cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmxlYSUyMG1hcmtldHxlbnwwfHwwfHx8MA%3D%3D',
  },
] as const

export const GALLERY = [
  {
    title: 'Pre-Loved Couches',
    piece: 'Couches that needed TLC',
    category: 'colour',
    year: '2025',
    before: 'https://scontent.fjnb2-1.fna.fbcdn.net/v/t39.30808-6/629499793_1283338317149868_8222257126170319966_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=n2BVpVA_O4EQ7kNvwE4fp_3&_nc_oc=AdoipL7y1Cg3tltC0KF5sNYsqlc6S4_jcyqjI62j-IIuFyqglMrE6ZpSSGuJlI81fRM&_nc_zt=23&_nc_ht=scontent.fjnb2-1.fna&_nc_gid=yz8I-znowvLscUwNk3dHag&oh=00_Af2NCgn2WLX61PFAwCGkI2LVCgeJGZH3ax92ehB_Ejahjg&oe=69F0D8E5',
    after: 'https://scontent.fjnb2-1.fna.fbcdn.net/v/t39.30808-6/633026149_1283338373816529_735440184938174177_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_ohc=vCK6S-1OIz8Q7kNvwEwNGP1&_nc_oc=Ado1IjTXpQpOWRE7gJck727JoiJ1ZcpG_IrYHdLYBowDzJ75jzhdC2wc3_sTL-Z2gO4&_nc_zt=23&_nc_ht=scontent.fjnb2-1.fna&_nc_gid=yZx7efi8ivyMkoyHNJ719Q&oh=00_Af305hQjnoTmJhhhtNAOuBa4s_T0QktcT2p5O1EgI4YpFw&oe=69F0F908',
    aspect: 'tall',
  },
  {
    title: 'Vintage Chest',
    piece: 'Refreshing a vintage chest',
    category: 'upholstery',
    year: '2025',
    before: 'https://scontent.fjnb2-1.fna.fbcdn.net/v/t39.30808-6/529674225_1135861751897526_7536480110586074756_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_ohc=i1OLtSAubYoQ7kNvwECHxvx&_nc_oc=Adp13moytq4bVmiMS0-8e7cI3RH9BXnCD6KJteLZsOYBJZluJij_zMBiIZnIbfs-1VQ&_nc_zt=23&_nc_ht=scontent.fjnb2-1.fna&_nc_gid=QhYve_FIWz4SI6RVMwEfmQ&oh=00_Af1k4Nc9NKC3WqUtW50B3Z4ZbjQTjMq5AuXMu3wIQdOuQQ&oe=69F0E126',
    after: 'https://scontent.fjnb2-1.fna.fbcdn.net/v/t39.30808-6/541337211_1156860313131003_3645154490405950225_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=q7a5cvq-jkAQ7kNvwE6MaxY&_nc_oc=AdrEWmQHEFjpdrDJDp7Yx0K6uGQapRNADut3fDgyll65CmRy2rRkinPtzahj6oPeAhk&_nc_zt=23&_nc_ht=scontent.fjnb2-1.fna&_nc_gid=D3CnTcHP_XSNJVI5PxNeGQ&oh=00_Af3ZpUQJRLso7nL8cXRnAGiHVynkI5irv_fDC9csx0tW9g&oe=69F0EA8F',
    aspect: 'wide',
  },
  {
    title: 'Luxury Oak Drawer',
    piece: 'Restored oak drawer',
    category: 'wood',
    year: '2024',
    before: 'https://scontent.fjnb2-1.fna.fbcdn.net/v/t39.30808-6/581111179_1213025784181122_743321404803755598_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=8o_MYByuZ1kQ7kNvwHqX7Bk&_nc_oc=AdqL_BMbJkj9r1_rnD4kKpAKZuVkoyVWH2Ze6RYZAlSfRhIoKfwSzTL-86C-WeKqj0Y&_nc_zt=23&_nc_ht=scontent.fjnb2-1.fna&_nc_gid=MgoEJkI_Ilms0tNA1kzS3A&oh=00_Af2R4_z_J1W9QmyQpZxNldv9kU2e-OaGbEMRjiTMX6hLsg&oe=69F0E098',
    after: 'https://scontent.fjnb2-1.fna.fbcdn.net/v/t39.30808-6/579892279_1213026004181100_558632132069328753_n.jpg?stp=cp6_dst-jpegr_tt6&_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=NondHhGGEu0Q7kNvwF-mapJ&_nc_oc=Adqr9w6QkqpGiVB5_fE-3gYuBIHoGaxfHFYve2s-IE4MjQZwAtuQ75igYgRZrzBwuZ8&_nc_zt=23&se=-1&_nc_ht=scontent.fjnb2-1.fna&_nc_gid=At9VotCFzgV0zt8flC8DQA&oh=00_Af2ORQ4ve9JgTSQ4ZDlOrucZUxxwOUiFC9dcLYApPLKVPA&oe=69F0E135',
    aspect: 'tall',
  },
  {
    title: 'Modernised Wooden Desk',
    piece: 'Blue with gold handles',
    category: 'colour',
    year: '2025',
    before: null,
    after: 'https://scontent.fjnb2-1.fna.fbcdn.net/v/t39.30808-6/547204467_1165119665638401_1935984091842476610_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_ohc=t3EhhOZqXqQQ7kNvwHNUlOX&_nc_oc=Adq2dw1qR4OJL0eThDdb_-WK2pFeyhZbZhaBQ3UeprkkETfVOtaim-UuAC3Fb3WFRbY&_nc_zt=23&_nc_ht=scontent.fjnb2-1.fna&_nc_gid=4l1kRusP6n5Mb4Ofhz60_g&oh=00_Af0NTCAZYzNjs0RJiQCVVo1lURsHkMzDA-7H_Vu3rl4e6g&oe=69F108ED',
    aspect: 'tall',
  },
  {
    title: 'Small Woven Black Drawer',
    piece: 'Woven storage piece',
    category: 'upholstery',
    year: '2025',
    before: null,
    after: 'https://scontent.fjnb2-1.fna.fbcdn.net/v/t39.30808-6/547795065_1165119715638396_7265346944083040848_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=dWfaifnfbvQQ7kNvwGctLTY&_nc_oc=Adr14CDHgrZkTYYZTL3UXnB_0ytygQQ-S8eMmITsjKNmKFd6N3iG6OFjCaO_Ik-usPA&_nc_zt=23&_nc_ht=scontent.fjnb2-1.fna&_nc_gid=astjPsn4k_wK3ZIhN_vUWg&oh=00_Af25oZaofjVBErGH3AfhDsdJCDxBWhOJfPW5vn8pga6f5g&oe=69F1062E',
    aspect: 'tall',
  },
  {
    title: 'Patio Furniture Set',
    piece: 'Benches and chairs, wood and white',
    category: 'wood',
    year: '2025',
    before: null,
    after: 'https://scontent.fjnb2-1.fna.fbcdn.net/v/t39.30808-6/487951933_1040002021483500_548251879391856963_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=-9nr2RpT0ygQ7kNvwGXwbyQ&_nc_oc=Adp-l8jQtu8JG0VbmNYY6isX8fZDJkpvG0Rp1mLAf9b3njg8mraEin693naRhr5-M_M&_nc_zt=23&_nc_ht=scontent.fjnb2-1.fna&_nc_gid=JHFgDn5U1AeCcF5X4X_m1g&oh=00_Af12MFwED8psWqfptTTGi59U3xMQmxKWGsTrMd8Y2hnfJw&oe=69F10589',
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
