import { Graphics } from 'pixi.js';
import { TweenMax, Linear } from 'gsap';

export default class Hex {

  constructor(stage, initX, initY) {
    this.stage = stage;
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
    this.stage.addChild(this.g);
  }

  run() {
    const i = (Math.random() > 0.5) ? 1 : -1;
    this.angle += this.angleInc * i;
    this.alpha -= 0.015;
    this.tween = TweenMax.to(this.g, 0.2, {
      x: (Math.sin(this.angle) * this.distance) + this.g.x,
      y: (Math.cos(this.angle) * this.distance) + this.g.y,
      ease: Linear.easeInOut,
      onComplete: this.run
    });
  }

  kill() {
    this.tween.kill();
    this.stage.removeChild(this.g);
    this.stage = null;
    this.g = null;
  }
}
