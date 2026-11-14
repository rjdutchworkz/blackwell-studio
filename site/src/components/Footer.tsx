import { footerNav } from '../content/navigation'
import { footer } from '../content/site'
import { SHOW_WORK } from '../content/work'
import { goTo } from '../lib/navigate'
import { useMenu } from './MenuContext'
import { Wordmark } from './Wordmark'

const items = footerNav.filter((item) => (item.requiresWork ? SHOW_WORK : true))

export function Footer({ inert = false }: { inert?: boolean }) {
  const { setOpen } = useMenu()
  return (
    <footer className="site-footer" {...(inert ? { inert: true } : {})}>
      <div className="shell footer-grid">
        <a
          className="footer-brand"
          href="#top"
          aria-label="Blackwell Studio, back to top"
          onClick={(event) => {
            event.preventDefault()
            setOpen(false)
            goTo('top')
          }}
        >
          <span className="brand-word">
            <Wordmark />
          </span>
        </a>
        <div className="footer-meta">
          <a href={footer.emailHref} aria-label={footer.emailAria}>
            {footer.email}
          </a>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <ul>
            {items.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault()
                    goTo(item.id)
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="legal">
          <span>{footer.copyright}</span>
          <span className="pending">{footer.pending}</span>
        </div>
      </div>
    </footer>
  )
}
