import { Application, filters, Container, Graphics, RenderTexture, Sprite } from 'pixi.js'
import Hex from './Hex'

const COLORS = [0xC9BFBF, 0xBDB4F0, 0xFF9999, 0xFF6B6B, 0xfbcb00, 0x7a7a78]
const HEX_TIME = [0.05, 0.1, 0.2, 0.6]
const MAX_ALIVE = 100
const PI2 = Math.PI * 2

const hexPaticles = []
const center = {
  x: window.innerWidth >> 1,
  y: window.innerHeight >> 1
}

let useColors = false
let frameCounter = 0
let currentColor = 0
let numFramesPerParticle = 2
let hexTimeIndex = 2
let maxDistance = center.x < center.y ? center.x : center.y

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xffffff,
  antialias: false,
  resolution: 1
})

app.view.className = 'home-canvas'

const container = new Container()
const blurFilter = new filters.BlurFilter(2, 2, 1)
const renderTex = RenderTexture.create({ width: app.renderer.width, height: app.renderer.height })
const sprite = new Sprite(renderTex)

// white background will fade out the drawing behind.
const bg = new Graphics()
bg.beginFill(0xffffff, 1)
bg.alpha = 0.01
bg.drawRect(0, 0, app.renderer.width, app.renderer.height)
bg.endFill()
app.renderer.render(bg, renderTex, true)

app.stage.filters = [blurFilter]
app.stage.addChild(sprite)
app.stage.addChild(container)
app.stage.interactive = true

function render () {
  frameCounter++

  if (frameCounter >= numFramesPerParticle) {
    addParticle()
    frameCounter = 0
  }

  // update trail
  app.renderer.render(bg, renderTex, false)
  app.renderer.render(container, renderTex, false)
}

function addParticle () {
  const hex = new Hex(
    window.innerWidth / 2,
    window.innerHeight / 2,
    useColors ? COLORS[currentColor] : 0x000000,
    HEX_TIME[hexTimeIndex]
  )
  container.addChild(hex)
  hex.run()

  if (hexPaticles.length === MAX_ALIVE) {
    container.removeChild(hexPaticles[0])
    hexPaticles.shift().kill()
  }

  hexPaticles.push(hex)
}

function getAngle (p1, p2) {
  const a = p2.x - p1.x
  const b = p2.y - p1.y
  let angle = Math.atan2(b, a)
  if (angle < 0) {
    angle += 2 * Math.PI
  }
  return angle
}

function getDistance (p1, p2) {
  const a = p2.x - p1.x
  const b = p2.y - p1.y
  return Math.sqrt((a * a) + (b * b)) >> 0
}

function onWindowPointerMove (e) {
  const pt = { x: e.clientX, y: e.clientY }
  const distance = Math.min(getDistance(center, pt), maxDistance) >> 0
  const angle = getAngle(center, pt)

  // change hexTime based on distance, the closer the faster
  hexTimeIndex = Math.round((distance / maxDistance) * (HEX_TIME.length - 1))

  // change current color based on mouse angle to center of screen
  currentColor = Math.round((angle / PI2) * (COLORS.length - 1))

  // based on hexTimeIndex, so the closed to the center , the faster to add particles
  numFramesPerParticle = (hexTimeIndex * 0.5) + 1
}

function onWindowPointerUp () {
  useColors = !useColors
}

function onWindowResize () {
  const w = window.innerWidth
  const h = window.innerHeight

  center.x = w >> 1
  center.y = h >> 1

  maxDistance = center.x < center.y ? center.x : center.y

  // resize renderTexture and baseRenderTexture
  renderTex.resize(w, h, true)
  // resize bg
  bg.width = w
  bg.height = h
  // resize renderer
  app.renderer.resize(w, h)

  // render again and clear buffer
  // app.renderer.render(bg, renderTex, true)
  app.renderer.render(container, renderTex, true)
}

window.addEventListener('load', () => {
  window.addEventListener('resize', onWindowResize)
  window.addEventListener('pointermove', onWindowPointerMove)
  window.addEventListener('pointerup', onWindowPointerUp)
  render()
  app.ticker.add(render)
  // add canvas to body after render to avoid black flick
  document.body.appendChild(app.view)
})
