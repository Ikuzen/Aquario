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
    this.getMousePosition = (event) =>{
      this.tempMousePos = {
        x:event.clientX,
        y:event.clientY
      }
      
    }
    this.bounds = this.playScreen.getBoundingClientRect();
  }
  ///
  // generation functions
  ///
  
  generateAquarium(){
    this.playScreen.style.backgroundImage = "url(assets/images/aquarium-background.jpg)"
    console.log("loaded background")
  }
  generateFish() {
    this.fishArray.push(new Fish(this.tempMousePos.x-this.bounds.x-7.5, this.tempMousePos.y-this.bounds.y-7.5, 15, 15, this.colors["red"]))
    console.log(this.fishArray)
  }

  ///
  /// Display functions
  ///
  drawAllFishes(){ // as rectangle shapes
    for(let i=0;i<this.fishArray.length;i++){
      this.image.fillStyle = this.fishArray[i].colors;
      this.image.fillRect(
        this.fishArray[i].x,
        this.fishArray[i].y,
        this.fishArray[i].w,
        this.fishArray[i].h)
        this.fishArray[i].move(); // update next position of fishes
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
}