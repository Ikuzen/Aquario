class aquariumManager {
  constructor() {
    this.fishArray = [];
    this.colors = {
      "red": "#FF0000",
      "blue": "#0000FF",
      "yellow": "#FFFF00"
    }
    this.playScreen = document.getElementById("aquarium-screen");
    this.image = this.playScreen.getContext("2d");
    this.tempMousePos;
    this.bounds = this.playScreen.getBoundingClientRect();
    this.getMousePosition = (event) =>{
      this.tempMousePos = {
        x:event.clientX,
        y:event.clientY
      }
      console.log(this.tempMousePos)
    }
    this.aquariumBoundary = {
      aquariumBoundaryLeftX:this.bounds.x-100,
      aquariumBoundaryRightX:870-this.bounds.x,
      aquariumBoundaryTopY:this.bounds.y-100,
      aquariumBoundaryBottomY:700-this.bounds.y,
    }
 
  }
  ///
  // generation functions
  ///
  
  generateAquarium(){
    this.playScreen.style.backgroundImage = "url(assets/images/aquarium-background.jpg)"
    console.log("loaded background")
  }
  generateFish() {
    if(this.tempMousePos.y <= 700){ // generate fish only in the upper side of the canvas
      this.fishArray.push(new Fish(this.tempMousePos.x-this.bounds.x-7.5, this.tempMousePos.y-this.bounds.y-7.5, 15, 15, this.colors["red"]))
      console.log(this.fishArray)
    }
  }

  ///
  /// Display functions
  ///
  drawAllFishes(){ // as rectangle shapes
    for(let fish of this.fishArray){
      this.checkAquariumCollision(fish)
      this.image.fillStyle = fish.colors;
      this.image.fillRect(
        fish.x,
        fish.y,
        fish.w,
        fish.h)
        fish.newRandomDirection();
        fish.move(); // update next position of fishes
        
    }
  }
  clearCanvas(){
    this.image.clearRect(0, 0, 800,800);
  }
  updateDisplay(){
    this.clearCanvas();
    this.drawAllFishes();
  }
  destroyFishes(){
    this.fishArray= [];
    console.log("DIE")
  }

  ///
  //specific functions
  ///
  
  checkAquariumCollision(fish){
    if(fish.x <= this.aquariumBoundary.aquariumBoundaryLeftX || fish.x >= this.aquariumBoundary.aquariumBoundaryRightX ){
      fish.reverseDirection("x") 
    }
    else if(fish.y <= this.aquariumBoundary.aquariumBoundaryTopY || fish.y >= this.aquariumBoundary.aquariumBoundaryBottomY){
      fish.reverseDirection("y") 
    }
  }
}