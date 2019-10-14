// fish object has an x,y coordinates
class Fish {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.isFollowing = false;
    this.isFollowed = false;
    this.followedBy = null;
    this.followFish = null; // Fish object that is being followed
    
    this.fishToFollow = null // stores the fish to follow, in order to be checked
    this.angle = this.randomAngle()
    this.previousAngle = this.angle;
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
      this.angle -= Math.PI
    }else{
      this.angle += Math.PI
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