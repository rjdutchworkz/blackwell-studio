import { Component, useLayoutEffect, useState, type ReactNode } from 'react'
import { mountHeroField, type HeroVisual } from './field'

function lowPower() {
  const nav = navigator as Navigator & {
    deviceMemory?: number
    connection?: { saveData?: boolean }
  }
  if (nav.connection?.saveData) return true
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) return true
  if (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 2) return true
  return false
}

function desiredMode() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'poster' as const
  if (window.matchMedia('(max-width: 700px)').matches) return 'poster' as const
  if (lowPower()) return 'poster' as const
  return 'live' as const
}

function HeroSvgFallback() {
  return (
    <svg className="hero-fallback" viewBox="0 0 800 900" preserveAspectRatio="xMaxYMid meet" aria-hidden="true">
      <g fill="none" stroke="#B9BDC3" strokeWidth="1.2">
        <ellipse cx="560" cy="400" rx="210" ry="270" opacity="0.45" />
        <ellipse cx="560" cy="400" rx="150" ry="200" opacity="0.3" />
      </g>
      <g fill="none" stroke="#F4F1EA" strokeWidth="1.4" opacity="0.85">
        <path d="M430 230 V610" />
        <path d="M430 230 H500 C630 230 650 340 505 400 H430" />
        <path d="M430 400 H530 C670 400 680 610 515 610 H430" />
      </g>
    </svg>
  )
}

class FieldBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) return <HeroSvgFallback />
    return this.props.children
  }
}

function FieldCanvas() {
  const [node, setNode] = useState<HTMLCanvasElement | null>(null)
  const [mode, setMode] = useState<'live' | 'poster'>(desiredMode)
  const [visual, setVisual] = useState<HeroVisual>(mode)

  useLayoutEffect(() => {
    const queries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(max-width: 700px)'),
    ]
    const update = () => setMode(desiredMode())
    queries.forEach((query) => query.addEventListener('change', update))
    return () => queries.forEach((query) => query.removeEventListener('change', update))
  }, [])

  useLayoutEffect(() => {
    if (!node) return
    const handle = mountHeroField(node, mode)
    setVisual(handle.mode)
    return () => handle.destroy()
  }, [node, mode])

  if (visual === 'fallback') return <HeroSvgFallback />

  return <canvas ref={setNode} data-hero-visual={visual} />
}

export function ParticleField() {
  return (
    <div className="hero-field" aria-hidden="true">
      <FieldBoundary>
        <FieldCanvas />
      </FieldBoundary>
      <div className="hero-scrim" />
    </div>
  )
}
