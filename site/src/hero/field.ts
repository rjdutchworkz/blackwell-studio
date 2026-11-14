/**
 * Original hero field. Silver and ivory points drift into a B and a slow orbit.
 * Not derived from any third-party particle demo.
 */

export type HeroVisual = 'live' | 'poster' | 'fallback'

const MAX_PARTICLES = 2000
const IVORY = [244, 241, 234]
const WHITE = [255, 255, 255]
const SILVER = [185, 189, 195]

interface Field {
  n: number
  x: Float32Array
  y: Float32Array
  homeX: Float32Array
  homeY: Float32Array
  phase: Float32Array
  speed: Float32Array
  drift: Float32Array
  size: Float32Array
  color: Float32Array
  kind: Uint8Array
  orbitCx: number
  orbitCy: number
  orbitRx: number
  orbitRy: number
}

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function countFor(width: number) {
  const count = width < 1100 ? 700 : 1200
  return Math.min(MAX_PARTICLES, count)
}

function pushArc(
  points: Array<{ x: number; y: number }>,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  a0: number,
  a1: number,
  n: number,
  rand: () => number,
) {
  for (let i = 0; i < n; i += 1) {
    const t = n === 1 ? 0 : i / (n - 1)
    const a = a0 + (a1 - a0) * t
    points.push({
      x: cx + Math.cos(a) * rx + (rand() - 0.5) * 0.01,
      y: cy + Math.sin(a) * ry + (rand() - 0.5) * 0.01,
    })
  }
}

function letterPoints(budget: number, rand: () => number) {
  const stem = Math.round(budget * 0.18)
  const upper = Math.round(budget * 0.22)
  const lower = Math.round(budget * 0.26)
  const innerUpper = Math.round(budget * 0.14)
  const innerLower = Math.round(budget * 0.14)
  const waist = Math.max(8, budget - stem - upper - lower - innerUpper - innerLower)
  const points: Array<{ x: number; y: number }> = []
  const stemX = 0.18
  for (let i = 0; i < stem; i += 1) {
    const t = stem === 1 ? 0 : i / (stem - 1)
    points.push({ x: stemX + (rand() - 0.5) * 0.006, y: 0.05 + t * 0.9 })
  }
  pushArc(points, stemX, 0.28, 0.4, 0.2, -Math.PI / 2, Math.PI / 2, upper, rand)
  pushArc(points, stemX, 0.71, 0.48, 0.24, -Math.PI / 2, Math.PI / 2, lower, rand)
  pushArc(points, 0.38, 0.28, 0.15, 0.085, 0, Math.PI * 2, innerUpper, rand)
  pushArc(points, 0.42, 0.71, 0.19, 0.105, 0, Math.PI * 2, innerLower, rand)
  for (let i = 0; i < waist; i += 1) {
    const t = waist === 1 ? 0 : i / (waist - 1)
    points.push({ x: stemX + t * 0.16, y: 0.49 + (rand() - 0.5) * 0.01 })
  }
  return points
}

function buildField(cssW: number, cssH: number): Field {
  const n = countFor(cssW)
  const rand = mulberry32(0xb1a11)
  const letterBudget = Math.round(n * 0.72)
  const orbitBudget = Math.round(n * 0.18)
  const letters = letterPoints(letterBudget, rand)
  const dustBudget = n - letters.length - orbitBudget

  let boxH = Math.min(cssH * 0.7, 580)
  let boxW = boxH * 0.8
  let ox = cssW - boxW - Math.max(56, cssW * 0.045)
  let oy = (cssH - boxH) * 0.42
  if (cssW < 1100) {
    boxH = Math.min(cssH * 0.48, cssW * 0.7)
    boxW = boxH * 0.8
    ox = Math.max(20, cssW - boxW - 24)
    oy = cssH * 0.05
  }
  if (cssW < 700) {
    const headerH = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 64
    boxH = Math.min(cssH * 0.3, Math.max(120, cssH - headerH - 240))
    boxW = Math.min(boxH * 0.8, cssW * 0.58)
    ox = (cssW - boxW) / 2
    oy = headerH + 16
  }

  const field: Field = {
    n: letters.length + orbitBudget + Math.max(0, dustBudget),
    x: new Float32Array(n),
    y: new Float32Array(n),
    homeX: new Float32Array(n),
    homeY: new Float32Array(n),
    phase: new Float32Array(n),
    speed: new Float32Array(n),
    drift: new Float32Array(n),
    size: new Float32Array(n),
    color: new Float32Array(n * 4),
    kind: new Uint8Array(n),
    orbitCx: ox + boxW * 0.46,
    orbitCy: oy + boxH * 0.5,
    orbitRx: boxW * 0.62,
    orbitRy: boxH * 0.5,
  }

  const paint = (i: number, tone: number[], alpha: number) => {
    field.color[i * 4] = tone[0] / 255
    field.color[i * 4 + 1] = tone[1] / 255
    field.color[i * 4 + 2] = tone[2] / 255
    field.color[i * 4 + 3] = alpha
  }

  let i = 0
  for (const point of letters) {
    const x = ox + point.x * boxW
    const y = oy + point.y * boxH
    field.homeX[i] = x
    field.homeY[i] = y
    field.x[i] = x
    field.y[i] = y
    field.phase[i] = rand() * Math.PI * 2
    field.speed[i] = 0.25 + rand() * 0.2
    field.drift[i] = 1.4 + rand() * 1.8
    field.size[i] = 1.35 + rand() * 1.15
    field.kind[i] = 0
    const tone = rand() > 0.72 ? WHITE : rand() > 0.38 ? IVORY : SILVER
    paint(i, tone, 0.72 + rand() * 0.28)
    i += 1
  }

  for (let o = 0; o < orbitBudget; o += 1) {
    const phase = (o / orbitBudget) * Math.PI * 2
    field.phase[i] = phase
    field.speed[i] = 0.055 + rand() * 0.02
    field.drift[i] = 0
    field.size[i] = 1.05 + rand() * 0.7
    field.kind[i] = 1
    field.x[i] = field.orbitCx + Math.cos(phase) * field.orbitRx
    field.y[i] = field.orbitCy + Math.sin(phase) * field.orbitRy
    field.homeX[i] = field.x[i]
    field.homeY[i] = field.y[i]
    paint(i, rand() > 0.8 ? IVORY : SILVER, 0.28 + rand() * 0.32)
    i += 1
  }

  const dustCount = Math.max(0, field.n - i)
  for (let d = 0; d < dustCount; d += 1) {
    const x = cssW * (0.38 + rand() * 0.66)
    const y = cssH * (0.04 + rand() * 0.9)
    field.homeX[i] = x
    field.homeY[i] = y
    field.x[i] = x
    field.y[i] = y
    field.phase[i] = rand() * Math.PI * 2
    field.speed[i] = 0.08 + rand() * 0.12
    field.drift[i] = 8 + rand() * 14
    field.size[i] = 0.8 + rand() * 0.7
    field.kind[i] = 2
    paint(i, rand() > 0.5 ? SILVER : IVORY, 0.12 + rand() * 0.22)
    i += 1
  }
  field.n = i
  return field
}

const VERT = `
attribute vec2 a_pos;
attribute vec4 a_color;
attribute float a_size;
uniform vec2 u_resolution;
uniform float u_dpr;
varying vec4 v_color;
void main() {
  vec2 clip = (a_pos / u_resolution) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = a_size * u_dpr;
  v_color = a_color;
}
`

const FRAG = `
precision mediump float;
varying vec4 v_color;
void main() {
  vec2 p = gl_PointCoord - vec2(0.5);
  float d = length(p);
  if (d > 0.5) discard;
  float alpha = smoothstep(0.5, 0.28, d) * v_color.a;
  gl_FragColor = vec4(v_color.rgb, alpha);
}
`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export function mountHeroField(
  canvas: HTMLCanvasElement,
  mode: 'live' | 'poster',
  onLost?: () => void,
): { mode: HeroVisual; destroy: () => void } {
  let running = true
  let disposed = false
  let raf = 0
  let visible = !document.hidden
  let onscreen = true
  let pointer = false
  let pointerX = 0
  let pointerY = 0
  let elapsed = 0
  let last = performance.now()
  let field: Field | null = null
  let cssW = 0
  let cssH = 0
  let dpr = 1
  const listeners: Array<() => void> = []

  const context2d = () => canvas.getContext('2d', { alpha: true })

  const draw2d = () => {
    if (!field) return
    const ctx = context2d()
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, cssW, cssH)
    for (let i = 0; i < field.n; i += 1) {
      const o = i * 4
      ctx.fillStyle = `rgba(${Math.round(field.color[o] * 255)}, ${Math.round(field.color[o + 1] * 255)}, ${Math.round(field.color[o + 2] * 255)}, ${field.color[o + 3]})`
      ctx.beginPath()
      ctx.arc(field.x[i], field.y[i], field.size[i] * 0.5, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const gl = mode === 'live' ? canvas.getContext('webgl', { alpha: true, antialias: false, depth: false, stencil: false, premultipliedAlpha: false }) : null

  if (mode === 'live' && !gl) {
    const ctx = context2d()
    if (!ctx) return { mode: 'fallback', destroy() {} }
  }

  let program: WebGLProgram | null = null
  let posBuf: WebGLBuffer | null = null
  let colorBuf: WebGLBuffer | null = null
  let sizeBuf: WebGLBuffer | null = null
  let uResolution: WebGLUniformLocation | null = null
  let uDpr: WebGLUniformLocation | null = null

  const setupGl = () => {
    if (!gl) return false
    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return false
    const next = gl.createProgram()
    if (!next) return false
    gl.attachShader(next, vs)
    gl.attachShader(next, fs)
    gl.bindAttribLocation(next, 0, 'a_pos')
    gl.bindAttribLocation(next, 1, 'a_color')
    gl.bindAttribLocation(next, 2, 'a_size')
    gl.linkProgram(next)
    gl.deleteShader(vs)
    gl.deleteShader(fs)
    if (!gl.getProgramParameter(next, gl.LINK_STATUS)) return false
    program = next
    posBuf = gl.createBuffer()
    colorBuf = gl.createBuffer()
    sizeBuf = gl.createBuffer()
    uResolution = gl.getUniformLocation(next, 'u_resolution')
    uDpr = gl.getUniformLocation(next, 'u_dpr')
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.clearColor(0, 0, 0, 0)
    return Boolean(posBuf && colorBuf && sizeBuf)
  }

  const live = mode === 'live' && gl !== null && setupGl()
  const visual: HeroVisual = live ? 'live' : context2d() ? 'poster' : 'fallback'
  if (visual === 'fallback') {
    return { mode: 'fallback', destroy() {} }
  }

  const upload = () => {
    if (!gl || !field || !program || !posBuf || !colorBuf || !sizeBuf) return
    gl.useProgram(program)
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(uResolution, cssW, cssH)
    gl.uniform1f(uDpr, dpr)
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
    gl.bufferData(gl.ARRAY_BUFFER, field.x.length * 2 * 4, gl.DYNAMIC_DRAW)
    const packed = new Float32Array(field.n * 2)
    for (let i = 0; i < field.n; i += 1) {
      packed[i * 2] = field.x[i]
      packed[i * 2 + 1] = field.y[i]
    }
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, packed.subarray(0, field.n * 2))
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuf)
    gl.bufferData(gl.ARRAY_BUFFER, field.color.subarray(0, field.n * 4), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(1)
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 0, 0)

    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuf)
    gl.bufferData(gl.ARRAY_BUFFER, field.size.subarray(0, field.n), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(2)
    gl.vertexAttribPointer(2, 1, gl.FLOAT, false, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.POINTS, 0, field.n)
  }

  const draw = () => {
    if (live) upload()
    else draw2d()
  }

  const step = (dt: number) => {
    if (!field || !live) return
    elapsed += dt
    const t = elapsed * 0.001
    const ease = 1 - Math.exp(-dt / 160)
    const radius = 120
    const radius2 = radius * radius
    for (let i = 0; i < field.n; i += 1) {
      let tx = field.homeX[i]
      let ty = field.homeY[i]
      const kind = field.kind[i]
      if (kind === 0) {
        const a = field.phase[i] + t * field.speed[i]
        tx = field.homeX[i] + Math.cos(a) * field.drift[i]
        ty = field.homeY[i] + Math.sin(a) * field.drift[i]
      } else if (kind === 1) {
        const a = field.phase[i] + t * field.speed[i]
        tx = field.orbitCx + Math.cos(a) * field.orbitRx
        ty = field.orbitCy + Math.sin(a) * field.orbitRy
      } else {
        const a = field.phase[i] + t * field.speed[i]
        tx = field.homeX[i] + Math.sin(a) * field.drift[i]
        ty = field.homeY[i] + Math.cos(a * 0.8) * field.drift[i] * 0.65
      }
      if (pointer) {
        const dx = tx - pointerX
        const dy = ty - pointerY
        const d2 = dx * dx + dy * dy
        if (d2 < radius2 && d2 > 0.25) {
          const d = Math.sqrt(d2)
          const force = (1 - d / radius) * 26
          tx += (dx / d) * force
          ty += (dy / d) * force
        }
      }
      field.x[i] += (tx - field.x[i]) * ease
      field.y[i] += (ty - field.y[i]) * ease
    }
  }

  const resize = () => {
    const rect = canvas.getBoundingClientRect()
    cssW = rect.width
    cssH = rect.height
    if (cssW < 2 || cssH < 2) return
    dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const bw = Math.max(1, Math.round(cssW * dpr))
    const bh = Math.max(1, Math.round(cssH * dpr))
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width = bw
      canvas.height = bh
      if (gl && live) {
        gl.enable(gl.BLEND)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
        gl.clearColor(0, 0, 0, 0)
      }
    }
    field = buildField(cssW, cssH)
    draw()
  }

  const kick = () => {
    if (!running || !live || !visible || !onscreen || raf !== 0) return
    last = performance.now()
    raf = requestAnimationFrame(loop)
  }

  const loop = (now: number) => {
    if (!running) return
    raf = 0
    if (!visible || !onscreen) return
    const dt = Math.min(34, now - last)
    last = now
    step(dt)
    draw()
    raf = requestAnimationFrame(loop)
  }

  const onPointer = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    pointer = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height
    pointerX = x
    pointerY = y
  }
  const onLeave = () => {
    pointer = false
  }
  const onVisibility = () => {
    visible = !document.hidden
    if (visible) kick()
    else if (raf) {
      cancelAnimationFrame(raf)
      raf = 0
    }
  }

  resize()
  const observer = new ResizeObserver(() => resize())
  observer.observe(canvas)
  const onscreenObserver = new IntersectionObserver(
    ([entry]) => {
      onscreen = Boolean(entry?.isIntersecting)
      if (onscreen) kick()
      else if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    },
    { threshold: 0 },
  )
  onscreenObserver.observe(canvas)

  if (live) {
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('blur', onLeave)
    document.addEventListener('visibilitychange', onVisibility)
    listeners.push(() => window.removeEventListener('pointermove', onPointer))
    listeners.push(() => window.removeEventListener('blur', onLeave))
    listeners.push(() => document.removeEventListener('visibilitychange', onVisibility))
    canvas.addEventListener('webglcontextlost', (event) => {
      event.preventDefault()
      running = false
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      if (!disposed) onLost?.()
    })
    kick()
  }

  return {
    mode: visual,
    destroy() {
      disposed = true
      running = false
      if (raf) cancelAnimationFrame(raf)
      observer.disconnect()
      onscreenObserver.disconnect()
      listeners.forEach((off) => off())
      if (gl) gl.getExtension('WEBGL_lose_context')?.loseContext()
    },
  }
}
