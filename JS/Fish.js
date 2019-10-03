// fish object has an x,y coordinates
class Fish {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.direction = {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1
    }
  }
  newRandomDirection() {
    this.direction = {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1
    }
  }
  move() {
    this.x += this.direction.x;
    this.y += this.direction.y;
  }

}