class aquariumManager {
  constructor() {
    this.fishArray = [];
    this.colors = [
      "red",
      "blue",
      "yellow",
      "olive",
      "green",
      "orange",
      "purple",
      "lime",
      "teal",
      "silver",
      "white:"
    ]

    this.playScreen = document.getElementById("aquarium-screen");
    this.image = this.playScreen.getContext("2d");
    this.tempMousePos;
    this.bounds = this.playScreen.getBoundingClientRect();
    this.getMousePosition = (event) => {
      this.tempMousePos = {
        x: event.clientX,
        y: event.clientY
      }
      console.log(this.tempMousePos)
    }
    this.aquariumBoundary = {
      aquariumBoundaryLeftX: this.bounds.x - 100,
      aquariumBoundaryRightX: 870 - this.bounds.x,
      aquariumBoundaryTopY: this.bounds.y - 100,
      aquariumBoundaryBottomY: 700 - this.bounds.y,
    }

  }
  // main function
  updateDisplay() {
    this.clearCanvas();
    this.allFishHandler();
  }
  ///
  // generation functions
  ///

  generateAquarium() {
    this.playScreen.style.backgroundImage = "url(assets/images/aquarium-background.jpg)"
    console.log("loaded background")
  }
  generateFish() {
    if (this.tempMousePos.y <= 700) { // generate fish only in the upper side of the canvas
      this.fishArray.push(new Fish(this.tempMousePos.x - this.bounds.x - 7.5, this.tempMousePos.y - this.bounds.y - 7.5, 15, 15, this.colors[Math.floor(Math.random() * this.colors.length)]))
      console.log(this.fishArray)
    }
  }

  allFishHandler() {
    for (let fish of this.fishArray) {
      if (!fish.isFollowing) {
        fish.newRandomDirection(); // if not following -> random direction;
      } else {
        fish.direction = fish.followFish.direction // if following -> same direction as other fish
      }
      this.checkRangeFish(fish);
      fish.move();
      this.checkAquariumCollision(fish);
      this.drawFish(fish);
    }

  }
  ///
  /// Display functions
  ///
  drawFish(fish) {
    this.image.fillStyle = fish.color;
    this.image.fillRect(
      fish.x,
      fish.y,
      fish.w,
      fish.h)
  }

  clearCanvas() {
    this.image.clearRect(0, 0, 800, 800);
  }

  destroyFishes() {
    this.fishArray = [];
    console.log("DIE")
  }

  ///
  //calculating functions
  ///

  checkAquariumCollision(fish) {
    if (fish.x <= this.aquariumBoundary.aquariumBoundaryLeftX || fish.x >= this.aquariumBoundary.aquariumBoundaryRightX) {
      fish.reverseDirection("x")
    } else if (fish.y <= this.aquariumBoundary.aquariumBoundaryTopY || fish.y >= this.aquariumBoundary.aquariumBoundaryBottomY) {
      fish.reverseDirection("y")
    }
  }

  distanceAB(fishA, fishB) {
    return Math.sqrt((fishA.x - fishB.x) ** 2 + (fishA.y - fishB.y) ** 2);
  }

  checkRangeFish(fish) {
    for (let i = 0; i < this.fishArray.length && !fish.isFollowing; i++) { // checks if fishes are not following/being following first
      if (fish !== this.fishArray[i] &&
        this.fishArray.length > 1 &&
        this.fishArray[i].followFish !== fish &&
        this.distanceAB(fish, this.fishArray[i]) <= 20 &&
        !this.checkCircularFollowing(fish,this.fishArray[i] ,this.fishArray[i])) {
        fish.isFollowing = true;
        fish.followFish = this.fishArray[i];
        break;
      }
    }

  }
  checkCircularFollowing(fishA, fishB, fishBToFollow = false) {
    if (fishBToFollow) {
      fishA.fishToFollow = fishBToFollow;
    }
    if (fishA.fishToFollow) {
      if (fishB.isFollowing) {
        if (fishB.followFish === fishA.fishToFollow) { // checks is
          return true
        } else {
          return this.checkCircularFollowing(fishA, fishB.followFish);
        }
      } else {
        fishA.fishToFollow = null;
        return false
      }
    }
  }
}