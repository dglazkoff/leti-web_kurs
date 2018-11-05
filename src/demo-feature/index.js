import './index.pcss';
import MapManager from './mapManager';
import SpriteManager from './spriteManager';
import { Player, Rocket } from './entities';

const canvas = document.querySelector('canvas');
canvas.width = 8 * 32;
canvas.height = 7 * 32;
const ctx = canvas.getContext('2d');

export const mapManager = new MapManager();
export const spriteManager = new SpriteManager();
const player = new Player({
  pos_x: 32,
  pos_y: 160,
  size_x: 32,
  size_y: 32,
  lifetime: 100,
  move_x: 0,
  move_y: 0,
  speed: 1,
});
const rocket = new Rocket({
  pos_x: 32,
  pos_y: 128,
  size_x: 32,
  size_y: 32,
  move_x: 0,
  move_y: 0,
  speed: 4,
});
mapManager.loadMap();
spriteManager.loadAtlas();
//mapManager.parseEntities();
mapManager.draw(ctx);
player.draw(ctx);
rocket.draw(ctx);
