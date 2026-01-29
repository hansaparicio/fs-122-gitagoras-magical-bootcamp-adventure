export default class NavMask {
  constructor(maskImage, width, height) {
    this.width = width;
    this.height = height;

    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;

    this.ctx = this.canvas.getContext("2d", {
      willReadFrequently: true
    });

    this.ctx.drawImage(maskImage, 0, 0);
  }

  isWalkable(x, y) {
    const px = Math.floor(x);
    const py = Math.floor(y);

    if (px < 0 || py < 0 || px >= this.width || py >= this.height) {
      return false;
    }

    const [r, g, b] = this.ctx.getImageData(px, py, 1, 1).data;

    const isBlocked = r > 150 && g < 100 && b < 100;
    return !isBlocked;
  }
}