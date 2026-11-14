# Blackwell Studio site

Editorial preview of the Blackwell Studio homepage. It is a design preview, not a live site. The page sends `noindex, nofollow` until publication is approved.

The older static reference stays in `../preview/index.html`. Do not replace it.

## Run

From this directory:

```bash
npm install
npm run dev
```

`npm run dev` starts Vite. The app is served at the local URL Vite prints.

## Build and preview

```bash
npm install
npm run build
npm run preview
```

`npm run build` typechecks and writes `dist/`. `npm run preview` serves that build. Neither command deploys anything.

## GitHub Pages (documentation only)

Do not enable Pages, change repository settings, or touch DNS from this preview. When a deploy is approved later, a project site for this repository would use the base path `/blackwell-studio/`:

```bash
VITE_BASE=/blackwell-studio/ npm run build
```

Publish the contents of `site/dist/` (not the repository root) as the Pages artifact. `VITE_BASE` is read in `vite.config.ts`. Leave it unset for local `/`.

Before that deploy, remove the `noindex, nofollow` robots meta in `index.html` and replace `public/robots.txt`, which currently disallows all crawlers. An absolute `og:image` URL should be set once a public origin exists. This repository does not include a canonical URL.

## Work section

`src/content/work.ts` exports `SHOW_WORK`. It is `true` for this preview. Set it to `false` to remove the section and its navigation links.

Portfolio images are fictional spec concepts. Optimised AVIF and WebP files live in `public/work/` as `{id}-4x5-{width}` and `{id}-16x10-{width}`. Replace those files to swap the art. `scripts/build-assets.mjs` regenerates them from the handoff PNGs, plus the favicon PNGs and `public/og.png`.

## Hero

The hero is an original WebGL point field (about 1,200 points on desktop, 700 on tablet, device pixel ratio capped at 1.5). It pauses off screen and when the tab is hidden. Phones, `prefers-reduced-motion`, save-data, and low-power devices get a static Canvas 2D poster. If WebGL cannot start, the poster is used. If Canvas also fails, a static SVG is shown. The headline and buttons render without waiting for the canvas.

## Fonts

Self-hosted. Cormorant Garamond and Inter come from Fontsource. IBM Plex Mono 400 and 500 are the official complete (unsubsetted) WOFF2 files, because “Plex” is a Reserved Font Name. Licences are in `src/fonts/licenses/` and `public/licenses/`. See `THIRD_PARTY_NOTICES.md` in the repository root.

## Brand

The wordmark is Direction A, outlined, from the supplied SVG. `public/brand/wordmark-A-ink.svg` is the ivory mark for ink backgrounds. `public/brand/wordmark-A-ivory.svg` is the ink mark for ivory backgrounds. On screen the React wordmark uses `currentColor`. The header uses that wordmark from 1121px up (never below 176px wide). At tablet and mobile widths the header uses the B monogram. The production build prerenders the page into `dist/index.html`, and the `<noscript>` block repeats that markup so the page still reads with JavaScript off. MIT copyright and permission notices ship in `dist/licenses/THIRD-PARTY-NOTICES.txt`.
