import { why } from '../content/site'
import { Reveal } from './Reveal'

export function Why() {
  return (
    <section className="section on-ivory" id="why" aria-labelledby="why-title" tabIndex={-1}>
      <div className="shell">
        <Reveal>
          <div className="section-head">
            <p className="label">{why.label}</p>
            <h2 id="why-title" className="h2">
              {why.title}
            </h2>
            <p className="quiet">{why.line}</p>
          </div>
          <div className="why-grid">
            {why.cards.map((card) => (
              <article className="why-card" key={card.index}>
                <p className="label">{card.index}</p>
                <h3 className="card-title">{card.title}</h3>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
