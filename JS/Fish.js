// fish object has an x,y coordinates
class Fish {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.startingAngle = this.randomAngle()
    this.direction = {
      x: Math.sin(this.startingAngle),
      y: -Math.cos(this.startingAngle),
    }
  }
  newRandomDirection() {
    let angle = this.randomAngle();
    this.direction.y = -Math.cos(angle);
    this.direction.x = Math.sin(angle);

  }
  move() {
    this.x += this.direction.x;
    this.y += this.direction.y;
    console.log(this.direction)
  }
  randomAngle(){
    let angle = Math.floor(Math.random()*360)*Math.PI/180;
    return angle;
  }

}