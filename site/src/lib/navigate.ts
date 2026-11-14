export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function goTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })
  if (location.hash !== `#${id}`) {
    history.pushState(null, '', `#${id}`)
  }
  el.focus({ preventScroll: true })
}
