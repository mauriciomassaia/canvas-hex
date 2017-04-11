import { Application, Container, RenderTexture, Sprite, SCALE_MODES } from 'pixi.js';
import '../styles/index.css';
import Hex from './Hex';

const MAX_ALIVE = 500;
const app = new Application(window.innerWidth, window.innerHeight, {
  backgroundColor: 0xffffff,
  antialias: true,
  resolution: window.devicePixelRatio || 1,
  roundPixels: true,
  // transparent: true
});
document.body.appendChild(app.view);

const container = new Container();
// container.blendMode =  PIXI.BLEND_MODES.ADD;
app.stage.addChild(container);

const list = [];
setInterval(() => {
  const hex = new Hex(
    container,
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


// Trail
const renderTex = RenderTexture.create(app.renderer.width, app.renderer.height);
const sprite = new Sprite(renderTex);
const renderTex2 = RenderTexture.create(app.renderer.width, app.renderer.height);
const sprite2 = new Sprite(renderTex2);
sprite.alpha = .05;
sprite2.alpha = 1;;
app.stage.addChild(sprite2);

app.ticker.add(() => {
  app.renderer.render(container, renderTex, true);
  app.renderer.render(sprite, renderTex2, false);
});
