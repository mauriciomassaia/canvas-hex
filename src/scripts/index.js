import { Application, RenderTexture } from 'pixi.js';
import '../styles/index.css';
import Hex from './Hex';

const MAX_ALIVE = 500;
const app = new Application(window.innerWidth, window.innerHeight, {
  backgroundColor: 0xffffff,
  antialias: true,
  resolution: window.devicePixelRatio || 1,
  roundPixels: true
});
document.body.appendChild(app.view);

const list = [];
setInterval(() => {
  const hex = new Hex(
    app.stage,
    app.renderer.width / 2,
    app.renderer.height / 2
  );
  hex.run();
  // app.stage.addChild(hex);
  if (list.length === MAX_ALIVE) {
    list.shift().kill();
  }

  list.push(hex);
}, 30);

// app.ticker.add(() => {
//   const renderTex = RenderTexture.create(app.renderer, app.renderer.width, app.renderer.height);
//   app.renderer.render(app.stage, renderTex, false);

// });
