import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const { render } = await import(resolve(root, 'dist-ssr/entry-server.js'))
const app = render()
const file = resolve(root, 'dist/index.html')
const html = readFileSync(file, 'utf8')
const withRoot = html.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
const withFallback = withRoot.replace(
  /<noscript>[\s\S]*?<\/noscript>/,
  `<noscript><style>#root{display:none}</style>${app}</noscript>`,
)
if (!withFallback.includes('id="root"') || !withFallback.includes('<noscript>')) {
  throw new Error('Prerender could not find #root or noscript in dist/index.html')
}
writeFileSync(file, withFallback)
console.log('Prerendered dist/index.html', app.length, 'chars')
