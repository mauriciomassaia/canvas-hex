import { Graphics } from 'pixi.js';
import { TweenMax, Linear } from 'gsap';

export default class Hex extends Graphics {
  constructor(initX, initY, color) {
    super();
    this.distance = 20;
    this.angleInc = Math.PI / 3;
    this.angle = Math.PI;
    this.x = initX;
    this.y = initY;
    this.time = 0.1;

    this.cacheAsBitmap = true;
    this.beginFill(color, 1);
    this.drawCircle(0, 0, 4);
    this.endFill();

    this.run = this.run.bind(this);
  }

  run() {
    const direction = Math.random() > 0.5 ? 1 : -1;
    this.angle += this.angleInc * direction;
    this.tween = TweenMax.to(this, this.time, {
      x: Math.sin(this.angle) * this.distance + this.x,
      y: Math.cos(this.angle) * this.distance + this.y,
      ease: Linear.easeNone,
      onComplete: this.run
    });
  }

  kill() {
    this.tween.kill();
  }
}
