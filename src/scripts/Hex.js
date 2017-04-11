import { Graphics } from 'pixi.js';
import { TweenMax, Linear, Cubic } from 'gsap';

export default class Hex {

  constructor(container, initX, initY) {
    this.container = container;
    this.distance = 20;
    this.angleInc = Math.PI / 3;
    this.angle = Math.PI;
    this.g = new Graphics();
    this.g.beginFill(0x333333, 1);
    this.g.drawCircle(0, 0, 4);
    this.g.endFill();
    this.g.x = initX;
    this.g.y = initY;
    this.run = this.run.bind(this);
    this.container.addChild(this.g);
  }

  run() {
    const i = (Math.random() > 0.5) ? 1 : -1;
    this.angle += this.angleInc * i;
    // this.g.alpha -= 0.02;
    this.tween = TweenMax.to(this.g,0.2, {
      x: (Math.sin(this.angle) * this.distance) + this.g.x,
      y: (Math.cos(this.angle) * this.distance) + this.g.y,
      ease: Linear.easeOut,
      onComplete: this.run
    });
  }

  kill() {
    this.tween.kill();
    this.container.removeChild(this.g);
    this.container = null;
    this.g = null;
  }
}
