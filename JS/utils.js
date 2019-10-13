function generateImage(width, height, src) {
  const img = new Image(width, height);
  img.src = src;

  return img;
}

function generateSound(src){
  const sound = new Audio()
  sound.src = src
  return sound
}