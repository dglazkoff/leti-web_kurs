import map from './map.json';
import { gameManager } from './index';

export default class MapManager {
  constructor() {
    this.mapData = null; // переменная для хранения карты
    this.tLayer = null; // переменная ждя хранения ссылки на блоки карты
    this.xCount = 0; // количество блоков по горизонтали
    this.yCount = 0; // количество блоков по вертикали
    this.tSize = {
      x: 64,
      y: 64,
    }; // размер блока
    this.mapSize = {
      x: 64,
      y: 64,
    }; // Размер карты в пикселях
    this.tilesets = []; // массив описаний блоков карты
    this.imgLoadCount = 0;
    this.imgLoaded = false;
    this.jsonLoaded = false;
    this.view = {
      x: 0,
      y: 0,
      w: 800,
      h: 600,
    };
  }

  parseMap(tilesJSON) {
    this.mapData = tilesJSON; // разобрать JSON
    this.xCount = this.mapData.width; // сохранение ширины
    this.yCount = this.mapData.height; // сохранение высоты
    this.tSize.x = this.mapData.tilewidth; // сохранение размера блока
    this.tSize.y = this.mapData.tileheight; // сохранение размера блока
    this.mapSize.x = this.xCount * this.tSize.x; // вычисления размера карты
    this.mapSize.y = this.yCount * this.tSize.y; // вычисление размера карты
    for (let i = 0; i < this.mapData.tilesets.length; i++) {
      const img = new Image(); // создаем переменную для хранения изображения
      img.onload = () => {
        // при загрузке изображения
        this.imgLoadCount += 1;
        if (this.imgLoadCount === this.mapData.tilesets.length) {
          this.imgLoaded = true;
        }
      };
      img.src = this.mapData.tilesets[i].image;
      const t = this.mapData.tilesets[i];
      const ts = {
        // создаем свой объект tilesets
        firstgid: t.firstgid,
        image: img,
        name: t.name,
        xCount: Math.floor(t.imagewidth / this.tSize.x),
        yCount: Math.floor(t.imageheight / this.tSize.y),
      };
      this.tilesets.push(ts);
    }
    this.jsonLoaded = true;
  }

  getTileset(tileIndex) {
    // получение блока по индексу
    for (let i = this.tilesets.length - 1; i >= 0; i--)
      if (this.tilesets[i].firstgid <= tileIndex) {
        return this.tilesets[i];
      }
    return null;
  }

  getTile(tileIndex) {
    // индекс блока
    const tile = {
      img: null,
      px: 0,
      py: 0,
    };
    const tileset = this.getTileset(tileIndex);
    tile.img = tileset.image;
    const id = tileIndex - tileset.firstgid; // индекс блока в tileset
    const x = id % tileset.xCount;
    const y = Math.floor(id / tileset.xCount);
    tile.px = x * this.tSize.x;
    tile.py = y * this.tSize.y;
    return tile;
  }

  isVisible(x, y, width, height) {
    if (
      x + width < this.view.x ||
      y + height < this.view.y ||
      x > this.view.x + this.view.w ||
      y > this.view.y + this.view.h
    )
      return false;
    return true;
  }

  draw(ctx) {
    if (!this.imgLoaded || !this.jsonLoaded) {
      setTimeout(() => this.draw(ctx), 100);
    } else {
      if (this.tLayer === null) {
        for (let id = 0; id < this.mapData.layers.length; id++) {
          const layer = this.mapData.layers[id];
          if (layer.type === 'tilelayer') {
            this.tLayer = layer;
            break;
          }
        }
      }
      for (let i = 0; i < this.tLayer.data.length; i++) {
        if (this.tLayer.data[i] !== 0) {
          const tile = this.getTile(this.tLayer.data[i]);
          let pX = (i % this.xCount) * this.tSize.x;
          let pY = Math.floor(i / this.xCount) * this.tSize.y;
          if (!this.isVisible(pX, pY, this.tSize.y)) continue;
          pX -= this.view.x;
          pY -= this.view.y;
          ctx.drawImage(
            tile.img,
            tile.px,
            tile.py,
            this.tSize.x,
            this.tSize.y,
            pX,
            pY,
            this.tSize.x,
            this.tSize.y,
          );
        }
      }
    }
  }
  parseEntities() {
    // разбор слоя типа objectgroup
    if (!this.imgLoaded || !this.jsonLoaded) {
      setTimeout(() => this.parseEntities(), 100);
    } else {
      for (let j = 0; j < this.mapData.layers.length; j++) {
        if (this.mapData.layers[j].type === 'objectgroup') {
          const entities = this.mapData.layers[j];
          for (let i = 0; i < entities.objects.length; i++) {
            const e = entities.objects[i];
            try {
              const obj = gameManager.factory[e.type];
              obj.name = e.name;
              obj.pos_x = e.x;
              obj.pos_y = e.y;
              obj.size_x = e.width;
              obj.size_y = e.height;
              gameManager.entities.push(obj);
              if (obj.name === 'player') gameManager.initPlayer(obj);
            } catch (ex) {
              console.log(`Error while creating: [${e.gid}] ${e.type}, ${ex}`);
            }
          }
        }
      }
    }
  }
  getTilesetIdx(x, y) {
    // получить блок по координатам на карте
    const wX = x;
    const wY = y;
    const idx =
      Math.floor(wY / this.tSize.y) * this.xCount +
      Math.floor(wX / this.tSize.x);
    console.log(Math.floor(wY / this.tSize.y));
    return this.tLayer.data[idx];
  }
  centerAt(x, y) {
    // центрирование view
    if (x < this.view.w / 2) this.view.x = 0;
    else if (x > this.mapSize.x - this.view.w / 2)
      this.view.x = this.mapSize.x - this.view.w;
    else this.view.x = x - this.view.w / 2;
    if (y < this.view.h / 2) this.view.y = 0;
    else if (y > this.mapSize.y - this.view.h / 2)
      this.view.y = this.mapSize.y - this.view.h;
    else this.view.y = y - this.view.h / 2;
  }
  loadMap() {
    this.parseMap(map);
  }
}
