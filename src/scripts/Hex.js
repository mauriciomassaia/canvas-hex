import { Graphics } from 'pixi.js';
import { TweenMax, Linear, Power2, ColorPropsPlugin } from 'gsap';

export default class Hex {

  constructor(container, initX, initY, color) {
    this.color = color;
    this.container = container;
    this.distance = 20;
    this.angleInc = Math.PI / 3;
    this.angle = Math.PI;
    this.g = new Graphics();
    this.g.beginFill(0xffffff, 1);
    this.g.drawCircle(0, 0, 4);
    this.g.endFill();
    this.g.tint = color;
    this.g.x = initX;
    this.g.y = initY;
    this.run = this.run.bind(this);
    this.container.addChild(this.g);
    this.runCount = 0;
    this.time = 0.1 ;
    this.running = true;
  }

  changeColor(color) {
     this.g.tint = color;
    // if (this.running) {

    //   const props = { tint: this.color };
    //   this.tintTween = TweenMax.to(props, 0.4 , {
    //     colorProps: { format: 'number', tint: color } ,
    //     ease: Power2.easeInOut,
    //     onUpdate: (v)=> {
    //       this.g.tint = props.tint;
    //     }
    //   });
    // }
  }

  run() {
    const i = (Math.random() > 0.5) ? 1 : -1;
    this.angle += this.angleInc * i;
    this.g.alpha -= 0.02
    this.time += (0.3 - this.time) * 0.01
    this.tween = TweenMax.to(this.g, this.time , {
      x: (Math.sin(this.angle) * this.distance) + this.g.x,
      y: (Math.cos(this.angle) * this.distance) + this.g.y,
      ease: Linear.easeNone,
      onComplete: this.run
    });

    this.runCount += 0.005;
  }

  stop() {
    this.running = false;
    this.tween.kill();
  }

  kill() {
    this.running = false;
    this.tween.kill();
    // this.tintTween.kill();
    this.container.removeChild(this.g);
    this.container = null;
    this.g = null;
  }
}
