// fish object has an x,y coordinates
class Fish {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.angle = this.randomAngle()
    this.isFollowing = false;
    this.followFish = null;
    this.direction = {
      x: Math.sin(this.angle),
      y: -Math.cos(this.angle),
    }
  }
  newRandomDirection() {
    this.angle += (Math.random()*0.5-0.25);
    this.direction.y = -Math.cos(this.angle);
    this.direction.x = Math.sin(this.angle);
  }
  reverseDirection(axis){
    if(axis === "x"){
      this.direction.x = - this.direction.x
      this.angle -= Math.PI
    }else{
      this.direction.y = - this.direction.y
      this.angle -= Math.PI
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