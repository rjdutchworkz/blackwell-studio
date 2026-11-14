import wordmarkRaw from '../assets/brand/wordmark-A-ink.svg?raw'
import monogramRaw from '../assets/brand/favicon-B.svg?raw'

function prepare(raw: string, className: string, currentColor: boolean) {
  let svg = raw
    .replace(/<title>[\s\S]*?<\/title>/g, '')
    .replace(/\srole="img"/g, '')
    .replace(/\saria-label="[^"]*"/g, '')
    .replace(/\swidth="[^"]*"/g, '')
    .replace(/\sheight="[^"]*"/g, '')
  if (currentColor) {
    svg = svg.replace(/fill="#F4F1EA"/gi, 'fill="currentColor"')
  }
  return svg.replace('<svg', `<svg class="${className}" aria-hidden="true" focusable="false"`)
}

export function Wordmark() {
  return (
    <span
      className="brand-svg"
      dangerouslySetInnerHTML={{ __html: prepare(wordmarkRaw, 'wordmark-svg', true) }}
    />
  )
}

export function Monogram() {
  return (
    <span
      className="brand-svg"
      dangerouslySetInnerHTML={{ __html: prepare(monogramRaw, 'monogram-svg', false) }}
    />
  )
}
