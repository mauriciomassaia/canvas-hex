import { Application, filters, Container, Graphics, RenderTexture, Sprite } from 'pixi.js';
import '../styles/index.css';
import Hex from './Hex';

const MAX_ALIVE = 200;
const COLOR_CHANGE_TIME = 2000;
const ADD_PARTICLE_TIME = 1000 / 30;

const colors = [
  0xC9BFBF,
  0xBDB4F0,
  0xFF9999,
  0xFF6B6B,
  0xfbcb00,
  0x7a7a78,
];

let currentColor = 0;
const app = new Application(window.innerWidth, window.innerHeight, {
  backgroundColor: 0xffffff,
  antialias: true,
  roundPixels: true
});

document.body.appendChild(app.view);

const list = [];
const container = new Container();

const blurFilter = new filters.BlurFilter(1, 2);
const renderTex = RenderTexture.create(app.renderer.width, app.renderer.height);
const sprite = new Sprite(renderTex);

// white background will fade out the drawing behind.
const bg = new Graphics();
bg.beginFill(0xffffff, 0.1);
bg.drawRect(0, 0, app.renderer.width, app.renderer.height);
bg.endFill();

app.stage.filters = [blurFilter];
app.stage.addChild(sprite);
app.stage.addChild(container);

app.ticker.add(() => {
  // update trail
  app.renderer.render(bg, renderTex, false);
  app.renderer.render(container, renderTex, false);
});

const addHex = () => {
  const hex = new Hex(
    container,
    app.renderer.width / 2,
    app.renderer.height / 2,
    colors[currentColor]
  );
  hex.run();

  if (list.length === MAX_ALIVE) {
    // remove oldest
    list.shift().kill();
  }

  list.push(hex);
};

const changeColor = () => {
  currentColor++;
  currentColor %= colors.length;
};

setInterval(addHex, ADD_PARTICLE_TIME);
setInterval(changeColor, COLOR_CHANGE_TIME);