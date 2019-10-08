// fish object has an x,y coordinates
class Fish {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.angle = this.randomAngle()
    this.direction = {
      x: Math.sin(this.angle),
      y: -Math.cos(this.angle),
    }
  }
  newRandomDirection() {
    let angle = this.randomAngle();
    this.direction.y = -Math.cos(angle);
    this.direction.x = Math.sin(angle);
  }
  reverseDirection(axis){
    if(axis === "x"){
      this.direction.x = - this.direction.x
    }else{
      this.direction.y = - this.direction.y
    }
  }
  move() {
    this.x += this.direction.x;
    this.y += this.direction.y;
  }
  randomAngle(){
    let angle = Math.floor(Math.random()*360)*Math.PI/180;
    return angle;
  }

}