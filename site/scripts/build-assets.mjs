import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { Resvg } from '@resvg/resvg-js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const handoff = '/cursor/stores/bot/website-handoff'
const workOut = path.join(root, 'public/work')
const publicDir = path.join(root, 'public')

await mkdir(workOut, { recursive: true })

const brands = ['halvard', 'marlow', 'ottervale']
if (process.env.OG_ONLY === '1') {
  brands.length = 0
}
const jobs = [
  { ratio: '4x5', widths: [480, 720, 1080] },
  { ratio: '16x10', widths: [640, 960, 1280, 1600] },
]

for (const brand of brands) {
  for (const job of jobs) {
    const input = path.join(handoff, 'work', `${brand}-${job.ratio}.png`)
    for (const width of job.widths) {
      const pipeline = sharp(input).resize({ width, withoutEnlargement: true })
      const avifPath = path.join(workOut, `${brand}-${job.ratio}-${width}.avif`)
      const webpPath = path.join(workOut, `${brand}-${job.ratio}-${width}.webp`)
      await pipeline.clone().avif({ quality: 50, effort: 4 }).toFile(avifPath)
      await pipeline.clone().webp({ quality: 76, effort: 5 }).toFile(webpPath)
      const meta = await sharp(webpPath).metadata()
      if (meta.width !== width) {
        throw new Error(`${webpPath} is ${meta.width}px, expected ${width}`)
      }
      console.log(path.basename(avifPath), path.basename(webpPath))
    }
  }
}

const faviconSvg = await readFile(path.join(handoff, 'brand/favicon-B.svg'))
for (const size of [32, 180]) {
  const name = size === 32 ? 'favicon-32.png' : 'apple-touch-180.png'
  const png = new Resvg(faviconSvg, { fitTo: { mode: 'width', value: size } }).render().asPng()
  await writeFile(path.join(publicDir, name), png)
  console.log(name, png.length)
}

const wordmark = await readFile(path.join(handoff, 'brand/wordmark-A-ink.svg'), 'utf8')
const inner = wordmark.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
const ogSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0B0B0C"/>
  <g transform="translate(80 168) scale(0.72)" fill="#F4F1EA">${inner}</g>
  <text x="80" y="400" fill="#F4F1EA" font-family="Cormorant Garamond" font-size="78" font-weight="400">Your brand</text>
  <text x="80" y="486" fill="#F4F1EA" font-family="Cormorant Garamond" font-size="78" font-weight="400"><tspan font-style="italic" fill="#B9BDC3">comes</tspan> first.</text>
  <text x="80" y="560" fill="#8E939A" font-family="IBM Plex Mono" font-size="18" letter-spacing="3.2">DESIGN PREVIEW</text>
</svg>`

const fontDir = '/tmp/bw-og-fonts'
await mkdir(fontDir, { recursive: true })
const fonts = [
  ['https://github.com/google/fonts/raw/main/ofl/cormorantgaramond/CormorantGaramond%5Bwght%5D.ttf', 'CormorantGaramond.ttf'],
  ['https://github.com/google/fonts/raw/main/ofl/cormorantgaramond/CormorantGaramond-Italic%5Bwght%5D.ttf', 'CormorantGaramond-Italic.ttf'],
  ['https://github.com/IBM/plex/raw/master/packages/plex-mono/fonts/complete/ttf/IBMPlexMono-Medium.ttf', 'IBMPlexMono-Medium.ttf'],
]
for (const [url, name] of fonts) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`font download failed ${res.status} ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(path.join(fontDir, name), buf)
  console.log('font', name, buf.length)
}

const og = new Resvg(ogSvg, {
  fitTo: { mode: 'width', value: 1200 },
  font: {
    fontFiles: fonts.map(([, name]) => path.join(fontDir, name)),
    loadSystemFonts: false,
    defaultFontFamily: 'Cormorant Garamond',
  },
  background: '#0B0B0C',
}).render().asPng()
await writeFile(path.join(publicDir, 'og.png'), og)
console.log('og.png', og.length)
