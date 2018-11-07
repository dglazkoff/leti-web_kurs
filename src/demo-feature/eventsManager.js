export default class EventsManager {
  constructor() {
    this.bind = [];
    this.action = [];
  }
  setup(canvas) {
    this.bind[87] = 'up'; // w
    this.bind[65] = 'left'; // a
    this.bind[83] = 'down'; // s
    this.bind[68] = 'right'; // d
    this.bind[32] = 'fire'; // пробел
    document.body.addEventListener('keydown', e => this.onKeyDown(e));
    document.body.addEventListener('keyup', e => this.onKeyUp(e));
  }
  onKeyDown(event) {
    const action = this.bind[event.keyCode];
    if (action) this.action[action] = true;
  }
  onKeyUp(event) {
    const action = this.bind[event.keyCode];
    if (action) this.action[action] = false;
    console.log(action);
  }
}
