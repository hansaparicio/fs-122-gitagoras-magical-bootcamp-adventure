export default class KeyboardController {
  constructor() {
    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      interact: false
    };

    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }

  onKeyDown = (event) => {
    switch (event.key.toLowerCase()) {
      case "w":
        this.keys.up = true;
        break;
      case "s":
        this.keys.down = true;
        break;
      case "a":
        this.keys.left = true;
        break;
      case "d":
        this.keys.right = true;
        break;
      case "e":
        this.keys.interact = true;
        break;
      default:
        break;
    }
  };

  onKeyUp = (event) => {
    switch (event.key.toLowerCase()) {
      case "w":
        this.keys.up = false;
        break;
      case "s":
        this.keys.down = false;
        break;
      case "a":
        this.keys.left = false;
        break;
      case "d":
        this.keys.right = false;
        break;
      case "e":
        this.keys.interact = false;
        break;
      default:
        break;
    }
  };

  getState() {
    return { ...this.keys };
  }
}