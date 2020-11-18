//Create variables here

var foodStock,database,dog,happyDog,dogImg,foodS;
function preload()
{
dogImg = loadImage("images/dogImg.png")
happyDogImg = loadImage("images/dogImg1.png")
  //load images here
  
}

function setup() {
  createCanvas(500,500);

  //init database
  database = firebase.database();

  // extract foodstock from db
  foodStock = database.ref("food");
  foodStock.on("value",readStock)
  
  //create dog sprite
  dog = createSprite(250,300,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  //add styles here
  fill(255)
  text("Note : press UP ARROW to feed your pet", 200,50)
  text("food remaining : "+ foodS,100,150)



}

function keyPressed(){
  if(keyCode === UP_ARROW){
    writeStock(foodS);
    console.log(foodS);
    if(foodS>0){
    dog.addImage(happyDogImg);
    }
    else{
      dog.addImage(dogImg);
    }

  }
} 
function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x>0){
    x--;
  }
  else if(x<=0){
    x = 0 ;
  }
  database.ref('/').update({
    food:x
  })
}

