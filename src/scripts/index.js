import { Application, filters, Container, Graphics, RenderTexture, Sprite } from 'pixi.js';
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

const container = new Container();

// white background will fade out the drawing behind.
const bg = new Graphics();
bg.beginFill(0xffffff, 0.025);
bg.drawRect(0, 0, app.renderer.width, app.renderer.height);
bg.endFill();
container.addChild(bg);
const list = [];

// Trail
const blurFilter = new filters.BlurFilter(3, 3);
const renderTex = RenderTexture.create(app.renderer.width, app.renderer.height);
const sprite = new Sprite(renderTex);
sprite.filters = [blurFilter];
app.stage.addChild(sprite);
app.stage.addChild(container);

app.ticker.add(() => {
  // update trail
  app.renderer.render(container, renderTex, false);
});

setInterval(() => {
  // add new hex
  const hex = new Hex(
    container,
    app.renderer.width / 2,
    app.renderer.height / 2
  );
  hex.run();

  if (list.length === MAX_ALIVE) {
    // remove oldest
    list.shift().kill();
  }

  list.push(hex);
}, 30);