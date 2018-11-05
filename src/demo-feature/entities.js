import { spriteManager } from './index';

class Entity {
  constructor(pos_x = 0, pos_y = 0, size_x = 0, size_y = 0) {
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.size_x = size_x;
    this.size_y = size_y;
  }
}

export class Player extends Entity {
  constructor({
    pos_x,
    pos_y,
    size_x,
    size_y,
    lifetime,
    move_x,
    move_y,
    speed,
  }) {
    super(pos_x, pos_y, size_x, size_y);
    this.lifetime = lifetime;
    this.move_x = move_x;
    this.move_y = move_y;
    this.speed = speed;
  }
  draw(ctx) {
    spriteManager.drawSprite(ctx, 'tankx32', this.pos_x, this.pos_y);
  }
  update() {}
  onTouchEntity(obj) {}
  kill() {}
  fire() {
    const rocket = {};
    rocket.size_x = 16;
    rocket.size_y = 16;
    rocket.name = `rocket${++gameManager.fireNum}`;
    rocket.move_x = this.move_x;
    rocket.move_y = this.move_y;
    switch (this.move_x + 2 * this.move_y) {
      case -1: // выстрел влево
        rocket.pos_x = this.pos_x - rocket.size_x;
        rocket.pos_y = this.pos_y;
        break;
      case 1: // выстрел вправо
        rocket.pos_x = this.pos_x + this.size_x;
        rocket.pos_y = this.pos_y;
        break;
      case -2:
        rocket.pos_x = this.pos_x;
        rocket.pos_y = this.pos_y - rocket.size_y;
        break;
      case 2:
        rocket.pos_x = this.pos_x;
        rocket.pos_y = this.pos_y + this.size_y;
        break;
      default:
        throw new Error();
    }
    rocket.speed = 4;
    gameManager.entities.push(new Rocket(rocket));
  }
}

class Tank extends Entity {
  constructor({
    pos_x,
    pos_y,
    size_x,
    size_y,
    lifetime,
    move_x,
    move_y,
    speed,
  }) {
    super(pos_x, pos_y, size_x, size_y);
    this.lifetime = lifetime;
    this.move_x = move_x;
    this.move_y = move_y;
    this.speed = speed;
  }
  draw(ctx) {}
  update() {}
  onTouchEntity(obj) {}
  kill() {}
  fire() {}
}

export class Rocket extends Entity {
  constructor({ pos_x, pos_y, size_x, size_y, move_x, move_y, speed }) {
    super(pos_x, pos_y, size_x, size_y);
    this.move_x = move_x;
    this.move_y = move_y;
    this.speed = speed;
  }
  draw(ctx) {
    spriteManager.drawSprite(ctx, 'rocketx32', this.pos_x, this.pos_y);
  }
  update() {}
  onTouchEntity(obj) {}
  onTouchMap(idx) {}
  kill() {}
}
