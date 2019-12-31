let aquarium

function animate() {
  aquarium.updateDisplay()
  window.requestAnimationFrame(animate)
}

function initiate() {
  aquarium = new aquariumManager()
  aquarium.generateAquarium()
  document.getElementById("reset").addEventListener("click", aquarium.destroyFishes.bind(aquarium))
  // aquarium.playScreen.addEventListener("click", aquarium.getMousePosition);
  aquarium.playScreen.addEventListener("mousemove", aquarium.getMousePosition);
  aquarium.playScreen.addEventListener("click", aquarium.generateFish.bind(aquarium)
  )
  animate();
}
window.addEventListener("DOMContentLoaded", initiate)



