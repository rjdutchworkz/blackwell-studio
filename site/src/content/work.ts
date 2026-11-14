/**
 * Selected concepts. Spec work for fictional brands, not commissioned clients.
 * Set SHOW_WORK to false to hide the section and its navigation before launch.
 *
 * Images are optimised AVIF and WebP files in public/work/, named
 * `{id}-4x5-{width}` and `{id}-16x10-{width}`. Replace those files to swap art.
 * The 4:5 set is the card. The 16:10 set is the wide crop used on the first card
 * from tablet width up.
 */
export const SHOW_WORK = true

export const workSection = {
  label: '02 / Work',
  title: 'Selected concepts.',
  note: 'Spec concepts for illustration. Not published client work.',
  disclaimer: 'SPEC CONCEPT — NOT COMMISSIONED CLIENT WORK',
}

export const WORK_WIDTHS = {
  portrait: [480, 720, 1080],
  wide: [640, 960, 1280, 1600],
} as const

export interface WorkConcept {
  id: string
  index: string
  title: string
  category: string
  line: string
  alt: string
  featured: boolean
}

export const workConcepts: WorkConcept[] = [
  {
    id: 'halvard',
    index: '01',
    title: 'Halvard Bakehouse',
    category: 'Sourdough bakery',
    line: 'Made while the city sleeps.',
    alt: 'Spec concept for the fictional sourdough bakery Halvard Bakehouse: a stone bakehouse at night with bread in a lit window, and the line “Made while the city sleeps.” Not commissioned client work.',
    featured: true,
  },
  {
    id: 'marlow',
    index: '02',
    title: 'Marlow & Pitch',
    category: 'Piano tuning',
    line: 'Your piano has been patient.',
    alt: 'Spec concept for the fictional piano-tuning practice Marlow & Pitch: a close view of piano strings, and the line “Your piano has been patient.” Not commissioned client work.',
    featured: false,
  },
  {
    id: 'ottervale',
    index: '03',
    title: 'Ottervale',
    category: 'Merino throws',
    line: 'Winter, on our terms.',
    alt: 'Spec concept for the fictional merino-throw brand Ottervale: a folded charcoal throw on a stone plinth, and the line “Winter, on our terms.” Not commissioned client work.',
    featured: false,
  },
]
