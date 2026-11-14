import { contact } from '../content/site'
import { Reveal } from './Reveal'

export function Contact() {
  return (
    <section className="contact on-dark" id="contact" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="shell">
        <Reveal>
          <div className="contact-grid">
            <h2 id="contact-title" className="h2">
              {contact.titleBefore} <em className="accent">{contact.titleAccent}</em> {contact.titleAfter}
            </h2>
            <p className="quiet">{contact.line}</p>
            <div className="mail-grid">
              <div className="mail-block">
                <p className="label">{contact.general.label}</p>
                <a className="mail-link" href={contact.general.href} aria-label={contact.general.ariaLabel}>
                  {contact.general.email}
                </a>
              </div>
              <div className="mail-block">
                <p className="label">{contact.quote.label}</p>
                <a className="mail-link" href={contact.quote.href} aria-label={contact.quote.ariaLabel}>
                  {contact.quote.email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
