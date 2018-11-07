import { mapManager, gameManager } from './index';

export default class PhysicManager {
  static entityAtXY(obj, x, y) {
    // поиск объекта по координатам
    for (let i = 0; i < gameManager.entities.length; i++) {
      const e = gameManager.entities[i];
      if (e.name !== obj.name) {
        if (
          x + obj.size_x < e.pos_x ||
          y + obj.size_y < e.pos_y ||
          x > e.pos_x + e.size_x ||
          y > e.pos_y + e.size_y
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
    const ts = mapManager.getTilesetIdx(
      newX + (obj.move_x === 1 ? 1 : 0) * (obj.size_x - 1),
      newY + (obj.move_y === 1 ? 1 : 0) * (obj.size_y - 1),
    );
    console.log(ts, newY, (obj.move_y === 1 ? 1 : 0) * obj.size_y);
    const e = PhysicManager.entityAtXY(obj, newX, newY);
    if (e !== null && obj.onTouchEntity) obj.onTouchEntity(e);
    if (ts !== 3 && obj.onTouchMap) obj.onTouchMap(ts);
    if (ts === 3 && e === null) {
      obj.pos_x = newX;
      obj.pos_y = newY;
      console.log(obj.pos_y);
    } else return 'break';
    return 'move';
  }
}
