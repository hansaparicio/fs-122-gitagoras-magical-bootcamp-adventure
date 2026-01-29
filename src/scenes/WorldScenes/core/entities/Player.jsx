export default class Player {
  constructor({ x, y, image, scale = 3, navMask }) {
    this.position = { x, y };
    this.image = image;
    this.navMask = navMask;

    this.columns = 4;
    this.rows = 4;

    this.spriteWidth = Math.floor(this.image.width / this.columns);
    this.spriteHeight = Math.floor(this.image.height / this.rows);
    this.scale = scale;

    this.speed = 200;

    this.direction = "down";
    this.frameX = 0;
    this.frameY = 0;

    this.frameTimer = 0;
    this.frameInterval = 150;

    this.walkCycle = [0, 1, 2, 3];
    this.walkIndex = 0;
  }

  getFeetPosition() {
    return {
      x: this.position.x + (this.spriteWidth * this.scale) / 2,
      y: this.position.y + this.spriteHeight * this.scale
    };
  }

  calculateNextPosition(input, deltaTime) {
    const distance = this.speed * deltaTime;

    let nextX = this.position.x;
    let nextY = this.position.y;
    let moving = false;

    let dx = 0;
    let dy = 0;

    if (input.up) {
      dy -= distance;
      this.direction = "up";
      moving = true;
    }
    if (input.down) {
      dy += distance;
      this.direction = "down";
      moving = true;
    }
    if (input.left) {
      dx -= distance;
      this.direction = "left";
      moving = true;
    }
    if (input.right) {
      dx += distance;
      this.direction = "right";
      moving = true;
    }

    if (dx !== 0) {
      const candidateX = this.position.x + dx;
      const feetX = candidateX + (this.spriteWidth * this.scale) / 2;
      const feetY = this.position.y + this.spriteHeight * this.scale;

      if (!this.navMask || this.navMask.isWalkable(feetX, feetY)) {
        nextX = candidateX;
      }
    }

    if (dy !== 0) {
      const candidateY = this.position.y + dy;
      const feetX = nextX + (this.spriteWidth * this.scale) / 2;
      const feetY = candidateY + this.spriteHeight * this.scale;

      if (!this.navMask || this.navMask.isWalkable(feetX, feetY)) {
        nextY = candidateY;
      }
    }

    return { x: nextX, y: nextY, moving };
  }

  applyPosition(position) {
    this.position.x = position.x;
    this.position.y = position.y;
  }

  updateAnimation(deltaTime, isMoving) {
    if (isMoving) {
      this.frameTimer += deltaTime * 1000;
      if (this.frameTimer > this.frameInterval) {
        this.frameTimer = 0;
        this.walkIndex = (this.walkIndex + 1) % this.walkCycle.length;
        this.frameX = this.walkCycle[this.walkIndex];
      }
    } else {
      this.frameX = 0;
      this.walkIndex = 0;
      this.frameTimer = 0;
    }

    const directionRow = {
      down: 1,
      up: 0,
      left: 2,
      right: 3
    };

    this.frameY = directionRow[this.direction];
  }
}