import { hero } from '../content/site'
import { ParticleField } from '../hero/ParticleField'
import { ButtonLink } from './ButtonLink'

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title" tabIndex={-1}>
      <ParticleField />
      <div className="shell hero-layout">
        <p className="eyebrow label">{hero.eyebrow}</p>
        <h1 id="hero-title" className="display">
          {hero.titleLead.split(' ').map((word, index) => (
            <span key={word}>
              {index > 0 ? ' ' : null}
              <span className="word" style={{ animationDelay: `${index * 110}ms` }}>
                {word}
              </span>
            </span>
          ))}
          <br />
          <span className="word" style={{ animationDelay: '220ms' }}>
            <em className="accent">{hero.titleAccent}</em>
          </span>{' '}
          <span className="word" style={{ animationDelay: '330ms' }}>
            {hero.titleEnd}
          </span>
        </h1>
        <div className="hero-copy">
          <p className="lead">{hero.subhead}</p>
          <div className="cta-row">
            <ButtonLink
              href={hero.primary.href}
              label={hero.primary.label}
              variant="primary"
              ariaLabel={hero.primary.ariaLabel}
            />
            <ButtonLink href={hero.secondary.href} label={hero.secondary.label} variant="ghost" />
          </div>
        </div>
      </div>
    </section>
  )
}
