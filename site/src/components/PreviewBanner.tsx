import { banner } from '../content/site'

export function PreviewBanner({ inert = false }: { inert?: boolean }) {
  return (
    <div className="preview-banner" role="note" {...(inert ? { inert: true } : {})}>
      {banner}
    </div>
  )
}
