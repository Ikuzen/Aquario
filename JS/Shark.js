function unefonction(callback){
  callback()
}
let unObjet = {
  fonction(){
    console.log(this)
  }
}
// unObjet.fonction()
unefonction(unObjet.fonction.bind())

let unAutreObject ={
  blabla:unObjet.fonction
  
}
// unAutreObject.blabla()