import { spriteManager, gameManager, mapManager } from './index';
import PhysicManager from './physicManager';

class Entity {
  constructor(pos_x, pos_y, size_x, size_y) {
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.size_x = size_x;
    this.size_y = size_y;
  }
}

class Tanks extends Entity {
  constructor({
    pos_x,
    pos_y,
    size_x,
    size_y,
    lifetime,
    move_x,
    move_y,
    speed,
    direction,
  }) {
    super(pos_x, pos_y, size_x, size_y);
    this.lifetime = lifetime;
    this.move_x = move_x;
    this.move_y = move_y;
    this.speed = speed;
    this.direction = direction;
  }
}

export class Player extends Tanks {
  constructor(data) {
    super(data);
  }
  draw(ctx) {
    spriteManager.drawSprite(
      ctx,
      `tank_${this.direction}x32`,
      this.pos_x,
      this.pos_y,
      this.direction,
    );
  }
  update() {
    if (this.move_x === 1) this.direction = 'right';
    if (this.move_x === -1) this.direction = 'left';
    if (this.move_y === -1) this.direction = 'up';
    if (this.move_y === 1) this.direction = 'down';
    PhysicManager.update(this);
  }
  onTouchEntity(obj) {}
  kill() {
    gameManager.kill(this);
  }
  fire() {
    const rocket = {};
    rocket.size_x = 8;
    rocket.size_y = 8;
    rocket.name = `bullet${++gameManager.fireNum}`;
    switch (this.direction) {
      case 'left': // выстрел влево
        rocket.pos_x = this.pos_x - rocket.size_x;
        rocket.pos_y = this.pos_y + this.size_x / 2 - rocket.size_y / 4;
        rocket.move_x = -1;
        rocket.move_y = 0;
        break;
      case 'right': // выстрел вправо
        rocket.pos_x = this.pos_x + this.size_x;
        rocket.pos_y = this.pos_y + this.size_x / 2 - rocket.size_y / 4;
        rocket.move_x = 1;
        rocket.move_y = 0;
        break;
      case 'up':
        rocket.pos_x = this.pos_x + this.size_x / 2 - rocket.size_x / 4;
        rocket.pos_y = this.pos_y - rocket.size_y;
        rocket.move_x = 0;
        rocket.move_y = -1;
        break;
      case 'down':
        rocket.pos_x = this.pos_x + this.size_x / 2 - rocket.size_x / 4;
        rocket.pos_y = this.pos_y + this.size_y;
        rocket.move_x = 0;
        rocket.move_y = 1;
        break;
      default:
        throw new Error();
    }
    rocket.speed = 10;
    rocket.direction = this.direction;
    gameManager.entities.push(new RocketPlayer(rocket));
  }
}

export class Tank extends Tanks {
  constructor(data) {
    super(data);
    this.name = data.name;
    this.timer = setInterval(() => this.fire(), 1500);
  }
  draw(ctx) {
    spriteManager.drawSprite(
      ctx,
      `tank_${this.direction}x32`,
      this.pos_x,
      this.pos_y,
      this.direction,
    );
  }
  update() {
    if (this.move_x === 1) this.direction = 'right';
    if (this.move_x === -1) this.direction = 'left';
    if (this.move_y === -1) this.direction = 'up';
    if (this.move_y === 1) this.direction = 'down';
    PhysicManager.update(this);
  }
  onTouchEntity(obj) {}
  kill() {
    gameManager.kill(this);
    gameManager.score += 1;
    let newX;
    let newY;
    do {
      newX = (Math.floor(Math.random() * (mapManager.xCount - 1)) + 1) * 32;
      newY = (Math.floor(Math.random() * (mapManager.yCount - 1)) + 1) * 32;
    } while (
      mapManager.getTilesetIdx(newX, newY) !== 3 ||
      PhysicManager.entityAtXY(this, newX, newY)
    );
    gameManager.entities.push(
      new Tank({
        name: this.name,
        pos_x: newX,
        pos_y: newY,
        size_x: 32,
        size_y: 32,
        lifetime: 100,
        move_x: 0,
        move_y: -1,
        speed: this.speed,
        direction: 'down',
      }),
    );
    clearInterval(this.timer);
  }
  fire() {
    const rocket = {};
    rocket.size_x = 8;
    rocket.size_y = 8;
    rocket.name = `bullet${++gameManager.fireNum}`;
    switch (this.direction) {
      case 'left': // выстрел влево
        rocket.pos_x = this.pos_x - rocket.size_x;
        rocket.pos_y = this.pos_y + this.size_x / 2 - rocket.size_y / 4;
        rocket.move_x = -1;
        rocket.move_y = 0;
        break;
      case 'right': // выстрел вправо
        rocket.pos_x = this.pos_x + this.size_x;
        rocket.pos_y = this.pos_y + this.size_x / 2 - rocket.size_y / 4;
        rocket.move_x = 1;
        rocket.move_y = 0;
        break;
      case 'up':
        rocket.pos_x = this.pos_x + this.size_x / 2 - rocket.size_x / 4;
        rocket.pos_y = this.pos_y - rocket.size_y;
        rocket.move_x = 0;
        rocket.move_y = -1;
        break;
      case 'down':
        rocket.pos_x = this.pos_x + this.size_x / 2 - rocket.size_x / 4;
        rocket.pos_y = this.pos_y + this.size_y;
        rocket.move_x = 0;
        rocket.move_y = 1;
        break;
      default:
        throw new Error();
    }
    rocket.speed = 10;
    rocket.direction = this.direction;
    gameManager.entities.push(new RocketEnemy(rocket));
  }
}

class Rockets extends Entity {
  constructor({
    pos_x,
    pos_y,
    size_x,
    size_y,
    move_x,
    move_y,
    speed,
    direction,
    name,
  }) {
    super(pos_x, pos_y, size_x, size_y);
    this.move_x = move_x;
    this.move_y = move_y;
    this.speed = speed;
    this.direction = direction;
    this.name = name;
  }
  draw(ctx) {
    spriteManager.drawSprite(
      ctx,
      `bullet_${this.direction}x8`,
      this.pos_x,
      this.pos_y,
    );
  }
  update() {
    PhysicManager.update(this);
  }
  onTouchMap(idx) {
    this.kill();
  }
  kill() {
    gameManager.kill(this);
  }
}

export class RocketPlayer extends Rockets {
  constructor(data) {
    super(data);
  }
  onTouchEntity(obj) {
    if (obj.name.match(/enemy[\d*]/) || obj.name.match(/bullet[\d*]/)) {
      obj.kill();
    }
    this.kill();
  }
}

export class RocketEnemy extends Rockets {
  constructor(data) {
    super(data);
  }
  onTouchEntity(obj) {
    if (obj.name.match(/player/) || obj.name.match(/bullet[\d*]/)) {
      obj.kill();
    }
    this.kill();
  }
}
