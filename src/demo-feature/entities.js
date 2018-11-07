import { spriteManager, gameManager } from './index';
import PhysicManager from './physicManager';

class Entity {
  constructor(pos_x, pos_y, size_x, size_y) {
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
    direction,
  }) {
    super(pos_x, pos_y, size_x, size_y);
    this.lifetime = lifetime;
    this.move_x = move_x;
    this.move_y = move_y;
    this.speed = speed;
    this.direction = direction;
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
    PhysicManager.update(this);
  }
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
    rocket.speed = gameManager.factory['Rocket'].speed;
    rocket.direction = this.direction;
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
  constructor({
    pos_x,
    pos_y,
    size_x,
    size_y,
    move_x,
    move_y,
    speed,
    direction,
  }) {
    super(pos_x, pos_y, size_x, size_y);
    this.move_x = move_x;
    this.move_y = move_y;
    this.speed = speed;
    this.direction = direction;
  }
  draw(ctx) {
    spriteManager.drawSprite(
      ctx,
      `bullet_${this.direction}`,
      this.pos_x,
      this.pos_y,
    );
  }
  update() {
    PhysicManager.update(this);
  }
  onTouchEntity(obj) {
    if (
      obj.name.match(/enemy[\d*]/) ||
      obj.name.match(/player/) ||
      obj.name.match(/rocket[\d*]/)
    ) {
      obj.kill();
    }
    this.kill();
  }
  onTouchMap(idx) {
    this.kill();
  }
  kill() {
    gameManager.kill(this);
  }
}
