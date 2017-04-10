import '../styles/index.css';
import { Application } from 'pixi.js';
import Hex from './Hex';

const MAX_ALIVE = 500;
const app = new PIXI.Application(window.innerWidth, window.innerHeight, {
  backgroundColor: 0xffffff,
  antialias: true,
  resolution: window.devicePixelRatio || 1,
  roundPixels: true
});
document.body.appendChild(app.view);

const list = [];
setInterval(() => {
  const hex = new Hex();
  hex.x = app.renderer.width / 2;
  hex.y = app.renderer.height / 2;
  hex.run();
  app.stage.addChild(hex);
  if (list.length === MAX_ALIVE) {
    list.shift().kill();
  }

  list.push(hex);
}, 30);

window.addEventListener('load', () => {
  console.log('window ready.');
});
