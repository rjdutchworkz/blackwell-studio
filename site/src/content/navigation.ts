export interface NavItem {
  href: string
  label: string
  id: string
  requiresWork?: boolean
}

export const primaryNav: NavItem[] = [
  { href: '#why', id: 'why', label: 'Why Blackwell' },
  { href: '#work', id: 'work', label: 'Work', requiresWork: true },
  { href: '#quote', id: 'quote', label: 'Quote' },
  { href: '#process', id: 'process', label: 'Process' },
  { href: '#about', id: 'about', label: 'About' },
  { href: '#contact', id: 'contact', label: 'Contact' },
]

export const footerNav: NavItem[] = [
  { href: '#why', id: 'why', label: 'Why Blackwell' },
  { href: '#work', id: 'work', label: 'Selected concepts', requiresWork: true },
  { href: '#quote', id: 'quote', label: 'Request a quote' },
  { href: '#process', id: 'process', label: 'How we work' },
  { href: '#about', id: 'about', label: 'About' },
  { href: '#contact', id: 'contact', label: 'Contact' },
]

export const navCta = {
  label: 'Request a quote',
  href: '#quote',
  id: 'quote',
}
