import { mapManager, eventsManager } from './index';

export default class GameManager {
  constructor() {
    this.factory = {}; // фабрика объектов на карте
    this.entities = []; // объекты на карте
    this.fireNum = 0; // идентификатор выстрела
    this.player = null;
    this.laterKill = [];
    this.laterAdd = [];
  }
  initPlayer(obj) {
    this.player = obj;
  }
  kill(obj) {
    this.laterKill.push(obj);
  }
  update(ctx) {
    if (this.player === null) return;
    this.player.move_x = 0;
    this.player.move_y = 0;
    //console.log(eventsManager.action);
    if (eventsManager.action['up']) {
      this.player.move_y = -1;
    }
    if (eventsManager.action['down']) {
      this.player.move_y = 1;
    }
    if (eventsManager.action['left']) {
      this.player.move_x = -1;
    }
    if (eventsManager.action['right']) {
      this.player.move_x = 1;
    }
    if (eventsManager.action['fire']) this.player.fire();
    this.entities.forEach(e => {
      try {
        e.update();
      } catch (ex) {}
    });
    for (let i = 0; i < this.laterKill.length; i++) {
      const idx = this.entities.indexOf(this.laterKill[i]);
      if (idx > -1) {
        this.entities.splice(idx, 1);
      }
    }
    if (this.laterKill.length > 0) this.laterKill.length = 0;
    mapManager.draw(ctx);
    mapManager.centerAt(this.player.pos_x, this.player.pos_y);
    this.draw(ctx);
  }
  draw(ctx) {
    for (let e = 0; e < this.entities.length; e++)
      this.entities[e].draw(ctx, this.player);
  }
  play(ctx) {
    setInterval(() => this.update(ctx), 100);
  }
}
