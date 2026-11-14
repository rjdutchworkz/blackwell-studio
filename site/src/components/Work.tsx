import { WORK_WIDTHS, workConcepts, workSection, type WorkConcept } from '../content/work'
import { Reveal } from './Reveal'

function srcSet(id: string, ratio: '4x5' | '16x10', widths: readonly number[], ext: 'avif' | 'webp') {
  const base = import.meta.env.BASE_URL
  return widths.map((width) => `${base}work/${id}-${ratio}-${width}.${ext} ${width}w`).join(', ')
}

function WorkFigure({ concept }: { concept: WorkConcept }) {
  const portraitSizes = concept.featured
    ? '(min-width: 1100px) 420px, (min-width: 768px) 46vw, calc(100vw - 40px)'
    : '(min-width: 1100px) 460px, (min-width: 768px) 46vw, calc(100vw - 40px)'
  const wideSizes = '(min-width: 1100px) 740px, calc(100vw - 48px)'
  const fallback = `${import.meta.env.BASE_URL}work/${concept.id}-4x5-720.webp`

  return (
    <div className="work-figure">
      <picture>
        {concept.featured ? (
          <>
            <source
              media="(min-width: 768px)"
              type="image/avif"
              srcSet={srcSet(concept.id, '16x10', WORK_WIDTHS.wide, 'avif')}
              sizes={wideSizes}
            />
            <source
              media="(min-width: 768px)"
              type="image/webp"
              srcSet={srcSet(concept.id, '16x10', WORK_WIDTHS.wide, 'webp')}
              sizes={wideSizes}
            />
          </>
        ) : null}
        <source type="image/avif" srcSet={srcSet(concept.id, '4x5', WORK_WIDTHS.portrait, 'avif')} sizes={portraitSizes} />
        <source type="image/webp" srcSet={srcSet(concept.id, '4x5', WORK_WIDTHS.portrait, 'webp')} sizes={portraitSizes} />
        <img src={fallback} alt={concept.alt} width={1080} height={1350} loading="lazy" decoding="async" />
      </picture>
    </div>
  )
}

export function Work() {
  return (
    <section className="section on-dark" id="work" aria-labelledby="work-title" tabIndex={-1}>
      <div className="shell">
        <Reveal>
          <div className="section-head">
            <p className="label">{workSection.label}</p>
            <h2 id="work-title" className="h2">
              {workSection.title}
            </h2>
          </div>
          <div className="work-grid">
            {workConcepts.map((concept) => (
              <article className={concept.featured ? 'work-card is-feature' : 'work-card'} key={concept.id}>
                <WorkFigure concept={concept} />
                <div className="work-meta">
                  <p className="label">{workSection.disclaimer}</p>
                  <p className="work-kicker">
                    <span className="label">{concept.index}</span>
                    <span>{concept.category}</span>
                  </p>
                  <h3 className="card-title">{concept.title}</h3>
                  <p className="quiet">{concept.line}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="work-note">{workSection.note}</p>
        </Reveal>
      </div>
    </section>
  )
}
