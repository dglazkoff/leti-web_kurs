import { mapManager, gameManager } from './index';

function changeDirectionOfBot(obj) {
  console.log(obj);
  if (obj.move_x === 1 || obj.move_x === -1) {
    obj.move_x = 0;
    obj.move_y = Math.random() < 0.5 ? -1 : 1;
    return;
  }
  if (obj.move_y === -1 || obj.move_y === 1) {
    obj.move_x = Math.random() < 0.5 ? -1 : 1;
    obj.move_y = 0;
    return;
  }
}

export default class PhysicManager {
  static entityAtXY(obj, x, y) {
    // поиск объекта по координатам
    for (let i = 0; i < gameManager.entities.length; i++) {
      const e = gameManager.entities[i];
      if (e.name !== obj.name) {
        if (
          x + obj.size_x - 1 < e.pos_x ||
          y + obj.size_y - 1 < e.pos_y ||
          x > e.pos_x + e.size_x - 1 ||
          y > e.pos_y + e.size_y - 1
        )
          continue;
        return e;
      }
    }
    return null;
  }
  static update(obj) {
    if (obj.move_x === 0 && obj.move_y === 0) return 'stop';
    const newX = obj.pos_x + Math.floor(obj.move_x * obj.speed);
    const newY = obj.pos_y + Math.floor(obj.move_y * obj.speed);
    const tsX =
      newX + (obj.move_x === 1 || obj.move_y ? 1 : 0) * (obj.size_x - 1);
    const tsY =
      newY + (obj.move_y === 1 || obj.move_x ? 1 : 0) * (obj.size_y - 1);
    let ts = mapManager.getTilesetIdx(obj.pos_x, obj.pos_y);
    if (ts === 3) {
      ts = mapManager.getTilesetIdx(tsX, tsY);
    }
    if (ts === 3) {
      ts = mapManager.getTilesetIdx(newX, newY);
    }
    if (ts === 3) {
      ts = mapManager.getTilesetIdx(tsX, newY);
    }
    if (ts === 3) {
      ts = mapManager.getTilesetIdx(newX, tsY);
    }
    const e = PhysicManager.entityAtXY(obj, newX, newY);
    if (obj.constructor.name === 'Tank') {
      if (ts !== 3 || e !== null) {
        changeDirectionOfBot(obj);
      }
    }
    if (e !== null && obj.onTouchEntity) obj.onTouchEntity(e);
    if (ts !== 3 && obj.onTouchMap) obj.onTouchMap(ts);
    if (ts === 3 && e === null) {
      obj.pos_x = newX;
      obj.pos_y = newY;
    } else return 'break';
    return 'move';
  }
}
