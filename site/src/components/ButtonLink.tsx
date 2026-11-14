import { goTo } from '../lib/navigate'
import { StaggerLabel } from './StaggerLabel'

interface ButtonLinkProps {
  href: string
  label: string
  variant: 'primary' | 'ghost'
  ariaLabel?: string
  onNavigate?: () => void
}

export function ButtonLink({ href, label, variant, ariaLabel, onNavigate }: ButtonLinkProps) {
  const internal = href.startsWith('#')
  return (
    <a
      className={`btn btn-${variant}`}
      href={href}
      aria-label={ariaLabel}
      data-flip=""
      onClick={(event) => {
        if (!internal) {
          onNavigate?.()
          return
        }
        event.preventDefault()
        onNavigate?.()
        goTo(href.slice(1))
      }}
    >
      <StaggerLabel text={label} />
      <span className="btn-arrow" aria-hidden="true">
        →
      </span>
    </a>
  )
}
