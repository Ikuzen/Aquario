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
function checkIntersection(BerdObj, PipeObj){
  if(BerdObj.x+10 < PipeObj.x+PipeObj.w && BerdObj.x+BerdObj.w-10 > PipeObj.x && BerdObj.y+10 < PipeObj.y+PipeObj.h && BerdObj.y+BerdObj.h-10 > PipeObj.y){
    return true
  }
  else{
    return false
  }
}