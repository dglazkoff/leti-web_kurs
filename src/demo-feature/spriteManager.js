import sprite from './spritesx8.json';
import { mapManager } from './index';

export default class SpriteManager {
  constructor() {
    this.image = new Image();
    this.sprites = [];
    this.imgLoaded = false;
    this.jsonLoaded = false;
  }
  parseAtlas(atlasJSON) {
    const atlas = atlasJSON;
    for (let name in atlas.frames) {
      const frame = atlas.frames[name].frame;
      this.sprites.push({
        name: name,
        x: frame.x,
        y: frame.y,
        w: frame.w,
        h: frame.h,
      });
    }
    this.jsonLoaded = true;
  }
  loadImage(imgName) {
    this.image.onload = () => {
      this.imgLoaded = true;
    };
    this.image.src = imgName;
  }
  getSprite(name) {
    for (let i = 0; i < this.sprites.length; i++) {
      const s = this.sprites[i];
      if (s.name === name) return s;
    }
    return null;
  }
  drawSprite(ctx, name, x, y) {
    if (!this.imgLoaded || !this.jsonLoaded) {
      setTimeout(() => this.drawSprite(ctx, name, x, y), 100);
    } else {
      const sprite = this.getSprite(name);
      if (!mapManager.isVisible(x, y, sprite.w, sprite.h)) return;
      x = x - mapManager.view.x;
      y = y - mapManager.view.y;
      ctx.drawImage(
        this.image,
        sprite.x,
        sprite.y,
        sprite.w,
        sprite.h,
        x,
        y,
        sprite.w,
        sprite.h,
      );
    }
  }
  loadAtlas() {
    this.loadImage('/img/spritesheetx8.png');
    this.parseAtlas(sprite);
  }
}
