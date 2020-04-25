import { Application, filters, Container, Graphics, RenderTexture, Sprite } from 'pixi.js'
import Hex from './Hex'

const MAX_ALIVE = 200
const COLOR_CHANGE_TIME = 2000
const ADD_PARTICLE_TIME = 1000 / 20

const COLORS = [
  0xC9BFBF,
  0xBDB4F0,
  0xFF9999,
  0xFF6B6B,
  0xfbcb00,
  0x7a7a78
]

let currentColor = 0;
const hexPaticles = [];
console.log(window.innerWidth, window.innerHeight)
const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xffffff,
  antialias: true,
  roundPixels: true,
  resolution: window.devicePixelRatio || 1,
  view: document.body.getElementsByTagName('canvas')[0]
})
document.body.appendChild(app.view)

const container = new Container()

const blurFilter = new filters.BlurFilter(2, 2)
const renderTex = RenderTexture.create(app.renderer.width, app.renderer.height)
const sprite = new Sprite(renderTex)

// white background will fade out the drawing behind.
const bg = new Graphics()
bg.beginFill(0xffffff, 0.1)
bg.drawRect(0, 0, app.renderer.width, app.renderer.height)
bg.endFill()

app.stage.filters = [blurFilter]
app.stage.addChild(sprite)
app.stage.addChild(container)

app.ticker.add(() => {
  // update trail
  app.renderer.render(bg, renderTex, false)
  app.renderer.render(container, renderTex, false)
})

const addParticle = () => {
  const hex = new Hex(
    window.innerWidth / 2,
    window.innerHeight / 2,
    COLORS[currentColor]
  )
  container.addChild(hex)
  hex.run()

  if (hexPaticles.length === MAX_ALIVE) {
    container.removeChild(hexPaticles[0])
    hexPaticles.shift().kill()
  }

  hexPaticles.push(hex)
}

const changeColor = () => {
  currentColor++
  currentColor %= COLORS.length
}

setInterval(addParticle, ADD_PARTICLE_TIME)
setInterval(changeColor, COLOR_CHANGE_TIME)

window.addEventListener('resize', () => {
  app.renderer.render(bg, renderTex, true)
  app.renderer.render(container, renderTex, true)
  app.renderer.resize(window.innerWidth, window.innerHeight)
})