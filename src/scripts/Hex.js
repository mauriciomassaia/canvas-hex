import { Graphics } from 'pixi.js';
import { TweenMax, Linear } from 'gsap';

export default class Hex extends Graphics {
  
  constructor() {
    super();
    this.distance = 20;
    this.angleInc = Math.PI / 3;
    this.angle = Math.PI;
    this.beginFill(0x333333, 1);
    this.drawCircle(0, 0, 4);
    this.endFill();
    this.run = this.run.bind(this);
  }

  run() {
    const i = (Math.random() > 0.5) ? 1 : -1;
    this.angle += this.angleInc * i;
    this.alpha -= 0.015;
    this.tween = TweenMax.to(this, .2, {
      x: Math.sin(this.angle) * this.distance + this.x,
      y: Math.cos(this.angle) * this.distance + this.y,
      ease: Linear.easeInOut,
      onComplete: this.run
    });
  }

  kill() {
    this.tween.kill();
    this.parent.removeChild(this);
  }
}