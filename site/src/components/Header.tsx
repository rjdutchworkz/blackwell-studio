import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { navCta, primaryNav } from '../content/navigation'
import { SHOW_WORK } from '../content/work'
import { goTo } from '../lib/navigate'
import { ButtonLink } from './ButtonLink'
import { useMenu } from './MenuContext'
import { StaggerLabel } from './StaggerLabel'
import { Monogram, Wordmark } from './Wordmark'

const items = primaryNav.filter((item) => (item.requiresWork ? SHOW_WORK : true))

export function Header() {
  const { open, setOpen } = useMenu()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const returnFocus = useRef(true)
  const titleId = useId()
  const condensed = useCondensed()

  useLayoutEffect(() => {
    if (!open) return
    returnFocus.current = true
    const button = toggleRef.current
    const panel = panelRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusables = () =>
      [...(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])]
    focusables()[0]?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }
      if (event.key !== 'Tab') return
      const list = focusables()
      if (list.length === 0) return
      const first = list[0]
      const last = list[list.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      if (returnFocus.current) button?.focus()
    }
  }, [open, setOpen])

  const closeAndGo = (id: string) => {
    returnFocus.current = false
    setOpen(false)
    goTo(id)
  }

  return (
    <>
      <header className={condensed ? 'site-header is-condensed' : 'site-header'} inert={open ? true : undefined}>
        <div className="shell nav-bar">
          <a
            className="brand-link"
            href="#top"
            aria-label="Blackwell Studio, home"
            onClick={(event) => {
              event.preventDefault()
              goTo('top')
            }}
          >
            <span className="brand-word">
              <Wordmark />
            </span>
            <span className="brand-mark">
              <Monogram />
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Primary">
            <ul className="nav-links">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    className="nav-link"
                    href={item.href}
                    data-flip=""
                    onClick={(event) => {
                      event.preventDefault()
                      goTo(item.id)
                    }}
                  >
                    <StaggerLabel text={item.label} />
                  </a>
                </li>
              ))}
            </ul>
            <ButtonLink href={navCta.href} label={navCta.label} variant="primary" />
          </nav>
          <button
            ref={toggleRef}
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>
      {open
        ? createPortal(
            <div
              ref={panelRef}
              id="site-menu"
              className="menu"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
            >
              <div className="menu-top">
                <p id={titleId} className="label">
                  Menu
                </p>
                <button className="menu-close" type="button" onClick={() => setOpen(false)}>
                  Close
                </button>
              </div>
              <nav aria-label="Primary">
                <ul className="menu-list">
                  {items.map((item, index) => (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        data-flip=""
                        onClick={(event) => {
                          event.preventDefault()
                          closeAndGo(item.id)
                        }}
                      >
                        <StaggerLabel text={item.label} />
                        <span className="menu-index">{String(index + 1).padStart(2, '0')}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="menu-cta">
                <ButtonLink
                  href={navCta.href}
                  label={navCta.label}
                  variant="primary"
                  onNavigate={() => {
                    returnFocus.current = false
                    setOpen(false)
                  }}
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}

function useCondensed() {
  const [condensed, setCondensed] = useState(false)
  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        setCondensed(window.scrollY > 12)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return condensed
}
