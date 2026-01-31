export default class Zone {
  constructor({ id, x, y, width, height, type }) {
    this.id = id;
    this.type = type;
    this.bounds = { x, y, width, height };
  }

  containsPoint(x, y) {
    return (
      x >= this.bounds.x &&
      x <= this.bounds.x + this.bounds.width &&
      y >= this.bounds.y &&
      y <= this.bounds.y + this.bounds.height
    );
  }
}