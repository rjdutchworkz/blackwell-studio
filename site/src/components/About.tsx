import { about } from '../content/site'
import { Reveal } from './Reveal'

export function About() {
  return (
    <section className="section on-ivory" id="about" aria-labelledby="about-title" tabIndex={-1}>
      <div className="shell">
        <Reveal>
          <div className="section-head">
            <p className="label">{about.label}</p>
            <h2 id="about-title" className="h2">
              {about.title}
            </h2>
            <p className="quiet">{about.line}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
