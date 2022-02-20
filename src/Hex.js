import { Graphics } from 'pixi.js'
import gsap from 'gsap'

export default class Hex extends Graphics {
  constructor (initX, initY, color, time = 0.1) {
    super()
    this.distance = 20
    this.angleInc = Math.PI / 3
    this.angle = Math.PI
    this.x = initX
    this.y = initY
    this.time = time

    this.beginFill(color, 1)
    this.drawCircle(0, 0, 4)
    this.endFill()

    this.run = this.run.bind(this)
  }

  run () {
    const direction = Math.random() > 0.5 ? 1 : -1
    this.angle += this.angleInc * direction
    this.tween = gsap.to(this, {
      x: Math.sin(this.angle) * this.distance + this.x,
      y: Math.cos(this.angle) * this.distance + this.y,
      duration: this.time,
      ease: 'none',
      onComplete: this.run
    })
  }

  kill () {
    this.tween.kill()
  }
}
