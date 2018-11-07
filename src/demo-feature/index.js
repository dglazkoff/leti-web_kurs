import './index.pcss';
import MapManager from './mapManager';
import SpriteManager from './spriteManager';
import GameManager from './gameManager';
import EventsManager from './eventsManager';
import { Player, Rocket } from './entities';

const canvas = document.querySelector('canvas');
canvas.width = 8 * 32;
canvas.height = 7 * 32;
const ctx = canvas.getContext('2d');

export const mapManager = new MapManager();
export const spriteManager = new SpriteManager();
export const eventsManager = new EventsManager();
export const gameManager = new GameManager();
gameManager.factory['Player'] = new Player({
  pos_x: 35,
  pos_y: 160,
  size_x: 32,
  size_y: 32,
  lifetime: 100,
  move_x: 0,
  move_y: 0,
  speed: 4,
  direction: 'up',
});
gameManager.factory['Rocket'] = new Rocket({
  pos_x: 32,
  pos_y: 128,
  size_x: 32,
  size_y: 32,
  move_x: 0,
  move_y: 0,
  speed: 6,
});
mapManager.loadMap();
spriteManager.loadAtlas();
mapManager.parseEntities();
eventsManager.setup(canvas);
gameManager.play(ctx);
