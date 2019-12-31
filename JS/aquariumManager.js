class aquariumManager {
  constructor() {
    this.fishArray = [];
    this.index = 0;
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
      "white"
    ]

    this.playScreen = document.getElementById("aquarium-screen");
    this.image = this.playScreen.getContext("2d");
    this.tempMousePos;
    this.bounds = this.playScreen.getBoundingClientRect();
    this.getMousePosition = (event) => {
      this.tempMousePos = {
        x: event.clientX - this.bounds.x - 7.5,
        y: event.clientY - this.bounds.y - 7.5
      }
    }
    this.aquariumBoundary = {
      aquariumBoundaryLeftX: this.bounds.x-100,
      aquariumBoundaryRightX: 870 - this.bounds.x,
      aquariumBoundaryTopY: this.bounds.y-100,
      aquariumBoundaryBottomY: 700 - this.bounds.y,
    }

  }
  // main function
  updateDisplay() {
    this.clearCanvas();
    this.allFishHandler();
    this.sharkPointer();
  }
  ///
  // generation functions
  ///

  generateAquarium() {
    this.playScreen.style.backgroundImage = "url(assets/images/aquarium-background.jpg)"
    console.log("loaded background")
  }
  generateFish() {
    if (this.tempMousePos.y <= 600) { // generate fish only in the upper side of the canvas
      this.fishArray.push(new Fish(this.tempMousePos.x, this.tempMousePos.y, 15, 15, this.colors[Math.floor(Math.random() * this.colors.length)],this.index++))
      console.log(this.fishArray)
    }
  }

  allFishHandler() {
    for (let fish of this.fishArray) {
      if (fish) {
        if (!fish.isFollowing) {
          fish.newRandomDirection(); // if not following -> random direction;
        } else {
          fish.direction = fish.followFish.direction // if following -> same direction as other fish
          fish.angle = fish.followFish.angle
        }
        this.checkRangeFish(fish);
        fish.move();
        this.checkAquariumCollision(fish);
        this.drawFish(fish);

      }
    }

  }
  ///
  /// Display functions
  ///
  drawFish(fish) {
    this.image.fillStyle = fish.color;
    this.image.save()
    if (fish.angle !== fish.previousAngle) {
      this.image.translate(fish.x + 0.5 * 15, fish.y + 0.5 * 15)
      this.image.rotate(fish.angle)
      this.image.translate(-(fish.x + 0.5 * 15), -(fish.y + 0.5 * 15))
      fish.previousAngle = fish.angle;
    }

    this.image.fillRect(
      fish.x,
      fish.y,
      fish.w,
      fish.h
    )
    this.image.restore()
    // this.image.rotate(-fish.angle)


  }

  clearCanvas() {
    this.image.clearRect(0, 0, 10000, 10000);
  }

  destroyFishes() {
    this.fishArray = [];
    console.log("DIE")
  }

  sharkPointer() {
    for (let i = 0; i < this.fishArray.length; i++) {
      if (!this.fishArray[i].flee && this.checkIntersection(this.tempMousePos, this.fishArray[i])) { // fish parameters are all reset
        this.fishArray[i].flee = true;
        this.fishArray[i].isFollowing = false;
        if(this.fishArray[i].followFish){
          this.fishArray[this.fishArray[i].followFish.index].followFish = null; // handles followFish params
          this.fishArray[this.fishArray[i].followFish.index].isFollowing = false;
        }
        this.fishArray[i].followFish = null;
        this.fishArray[i].followedBy = null
        this.fishArray[i].fishToFollow = null
        this.fishArray[i].speed = 3
        setTimeout(() => {
          this.fishArray[i].flee = false;
          this.fishArray[i].speed = 1;

          console.log("not afraid")
        }, 300)
      }
    }
  }
  ///
  //calculating functions
  ///
  checkIntersection(mouseCoordinates, fish) {
    if (mouseCoordinates.x >= fish.x && mouseCoordinates.x <= fish.x + fish.w && mouseCoordinates.y >= fish.y && mouseCoordinates.y <= fish.y + fish.h) {
      return true;
    }
  }

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
    for (let i = 0; i < this.fishArray.length && !fish.isFollowing && !fish.flee; i++) { // checks if fishes are not following/being following first
      if (fish !== this.fishArray[i] &&
        this.fishArray.length > 1 &&
        this.fishArray[i].followFish !== fish &&
        this.distanceAB(fish, this.fishArray[i]) <= 20 &&
        !this.checkCircularFollowing(fish, this.fishArray[i], this.fishArray[i])) {
        fish.isFollowing = true;
        this.fishArray[i].isFollowed = true;
        this.fishArray[i].followedBy = fish;
        fish.followFish = this.fishArray[i];
        break;
      }
    }

  }
  checkCircularFollowing(fishA, fishB, fishBToFollow = false, stackLimit = 0, ) {
    if (stackLimit >= this.fishArray.length) { // to avoid stackOverflow
      return true;
    }
    if (fishBToFollow) {
      fishA.fishToFollow = fishBToFollow;
    }
    if (fishB.isFollowing) {
      if (fishB.followFish === fishA.fishToFollow || fishB.followFish === fishA.followedBy) { // checks is
        return true;
      } else {
        return this.checkCircularFollowing(fishA, fishB.followFish, false, ++stackLimit);
      }
    } else {
      fishA.fishToFollow = null;
      return false
    }
  }


}