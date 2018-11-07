import './index.pcss';
import map1 from './map1.json';
import map2 from './map2.json';
import MapManager from './mapManager';
import SpriteManager from './spriteManager';
import GameManager from './gameManager';
import EventsManager from './eventsManager';
import { Player, Rocket, Tank } from './entities';

const canvas = document.querySelector('canvas');
canvas.width = 8 * 32;
canvas.height = 7 * 32;
const ctx = canvas.getContext('2d');
const start = document.querySelector('.button_start');
let currentMap = map1;

export const spriteManager = new SpriteManager();
export const eventsManager = new EventsManager();

eventsManager.setup(canvas);

export let gameManager;
export let mapManager;

start.addEventListener('click', () => {
  console.log('click');
  start.setAttribute('disabled', 'disabled');
  gameManager = new GameManager();
  mapManager = new MapManager();
  gameManager.factory['Player'] = new Player({
    pos_x: 35,
    pos_y: 160,
    size_x: 32,
    size_y: 32,
    lifetime: 100,
    move_x: 0,
    move_y: 0,
    speed: 8,
    direction: 'up',
  });
  gameManager.factory['Rocket'] = new Rocket({
    pos_x: 32,
    pos_y: 128,
    size_x: 32,
    size_y: 32,
    move_x: 0,
    move_y: 0,
    speed: 20,
  });
  gameManager.factory['Tank'] = new Tank({
    pos_x: 128,
    pos_y: 32,
    size_x: 32,
    size_y: 32,
    lifetime: 100,
    move_x: 0,
    move_y: -1,
    speed: 4,
    direction: 'down',
  });
  eventsManager.init();
  mapManager.loadMap(currentMap);
  spriteManager.loadAtlas();
  mapManager.parseEntities();
  gameManager.play(ctx);
});

export function endGame() {
  clearInterval(gameManager.playInterval);
  gameManager.clear();
  start.disabled = false;
  gameManager = null;
}

export function nextLevel() {
  endGame();
  currentMap = map2;
}
