import { process } from '../content/site'
import { Reveal } from './Reveal'

export function Process() {
  return (
    <section className="section anthracite on-dark" id="process" aria-labelledby="process-title" tabIndex={-1}>
      <div className="shell">
        <Reveal>
          <div className="section-head">
            <p className="label">{process.label}</p>
            <h2 id="process-title" className="h2">
              {process.title}
            </h2>
            <p className="quiet">{process.intro}</p>
          </div>
          <ol className="process-steps">
            {process.steps.map((step, index) => (
              <li key={step.title}>
                <span className="step-no label">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
