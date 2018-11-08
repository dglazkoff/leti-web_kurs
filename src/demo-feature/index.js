import './index.pcss';
import map1 from './map1.json';
import map2 from './map2.json';
import MapManager from './mapManager';
import SpriteManager from './spriteManager';
import GameManager from './gameManager';
import EventsManager from './eventsManager';
import { Player, RocketPlayer, RocketEnemy, Tank } from './entities';

const canvas = document.querySelector('canvas');
canvas.width = 15 * 32;
canvas.height = 15 * 32;
const ctx = canvas.getContext('2d');
const start = document.querySelector('.button_start');
const level1 = document.querySelector('.button_level_1');
const level2 = document.querySelector('.button_level_2');
let currentMap = map1;

export const spriteManager = new SpriteManager();
export const eventsManager = new EventsManager();

eventsManager.setup(canvas);

export let gameManager;
export let mapManager;

getScore();

start.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  start.setAttribute('disabled', 'disabled');
  gameManager = new GameManager();
  mapManager = new MapManager();
  gameManager.factory['Player'] = () =>
    new Player({
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
  gameManager.factory['RocketPlayer'] = () =>
    new RocketPlayer({
      pos_x: 32,
      pos_y: 128,
      size_x: 8,
      size_y: 8,
      move_x: 0,
      move_y: 0,
      speed: 10,
    });
  gameManager.factory['RocketEnemy'] = () =>
    new RocketEnemy({
      pos_x: 32,
      pos_y: 128,
      size_x: 8,
      size_y: 8,
      move_x: 0,
      move_y: 0,
      speed: 10,
    });
  gameManager.factory['Tank'] = () =>
    new Tank({
      pos_x: 128,
      pos_y: 32,
      size_x: 32,
      size_y: 32,
      lifetime: 100,
      move_x: 0,
      move_y: -1,
      speed: 2,
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

export function savePlayer() {
  const popup = document.querySelector('.popup');
  popup.classList.add('active');
  const save = popup.querySelector('.popup__input_save');
  save.addEventListener('click', () => {
    const nameInput = popup.querySelector('.popup__input_name');
    const scoreInput = document.querySelector('.score');
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameInput.value,
        score: scoreInput.innerHTML,
      }),
    }).then(() => {
      getScore();
    });
    popup.classList.remove('active');
  });
}

function getScore() {
  fetch('http://localhost:3001/users')
    .then(res => res.json())
    .then(res => {
      const table = document.querySelector('.table_score');
      table.innerHTML = '';
      const caption = document.createElement('caption');
      const trHead = document.createElement('tr');
      const thName = document.createElement('th');
      const thScore = document.createElement('th');
      caption.innerHTML = 'Score Table';
      thName.innerHTML = 'Name';
      thScore.innerHTML = 'Score';
      trHead.appendChild(thName);
      trHead.appendChild(thScore);
      table.appendChild(caption);
      table.appendChild(trHead);
      res.forEach(user => {
        const tr = document.createElement('tr');
        const nameTd = document.createElement('td');
        const scoreTd = document.createElement('td');
        nameTd.innerHTML = user.name;
        scoreTd.innerHTML = user.score;
        tr.appendChild(nameTd);
        tr.appendChild(scoreTd);
        table.appendChild(tr);
      });
    });
}

level1.addEventListener('click', () => {
  if (gameManager) endGame();
  currentMap = map1;
});

level2.addEventListener('click', () => {
  if (gameManager) endGame();
  currentMap = map2;
});
