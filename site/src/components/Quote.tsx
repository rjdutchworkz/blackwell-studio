import { quote } from '../content/site'
import { ButtonLink } from './ButtonLink'
import { Reveal } from './Reveal'

export function Quote() {
  return (
    <section className="section on-ivory" id="quote" aria-labelledby="quote-title" tabIndex={-1}>
      <div className="shell">
        <Reveal>
          <div className="section-head">
            <p className="label">{quote.label}</p>
            <h2 id="quote-title" className="h2">
              {quote.title}
            </h2>
            <p className="quiet">{quote.line}</p>
          </div>
          <div className="quote-body">
            <div className="quote-included">
              <p className="label quote-label">{quote.includedLabel}</p>
              <dl className="line-list">
                {quote.included.map((item) => (
                  <div className="line-item" key={item.title}>
                    <dt>{item.title}</dt>
                    <dd>{item.detail}</dd>
                  </div>
                ))}
              </dl>
              <div className="quote-cta">
                <ButtonLink
                  href={quote.cta.href}
                  label={quote.cta.label}
                  variant="primary"
                  ariaLabel={quote.cta.ariaLabel}
                />
              </div>
            </div>
            <div className="quote-excluded">
              <p className="label quote-label">{quote.excludedLabel}</p>
              <dl className="line-list">
                {quote.excluded.map((item) => (
                  <div className="line-item" key={item.title}>
                    <dt>{item.title}</dt>
                    <dd>{item.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
