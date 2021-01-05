// Create all these variables
var PLAY = 5;
var END = 0 ;
var gameState = PLAY ; 
var RO, FO ,FO1, NO ;
var RG, FG, NG ;
var ground, groundImage ;
var girl, girl_Running,jump, girl_Out ;
var obstacle, OI1,OI2,OI3, obstacleGroup ;
var inGround ;
var score = 0 ;
var jumpSound , outSound ;
var restart, restartImg, go, goi ;


function preload (){
  
  // Load all these images into these variables.
  girl_Running = loadAnimation ("Girl_left.png","Girl_right.png");
  girl_Out = loadImage ("Girl_Out.png");
  groundImage = loadImage ("Plain Ground.png");
  OI1 = loadImage ("Bush1.png");
  OI2 = loadImage ("Bush2.png");
  OI3 = loadImage ("Bush3.png");
  RG = loadImage ("Roadground.png");
  RO = loadImage ("Cone.png");
  FO = loadImage ("Rock.png");
  FG = loadImage ("Forest Ground.png");
  NO = loadImage ("Water.png");
  NG = loadImage ("Night Land.png");
  jump = loadImage ("girl_Jump.png");
  jumpSound = loadSound ("Jump.mp3");
  restartImg = loadImage ("Reset.png");
  outSound = loadSound ("Out.mp3");
  goi = loadImage ("goforit.png");
  
}
 
function setup() {

  // Create an area : 600 width and 200 height.
  createCanvas(600,200);
   
  //Create the ground
  ground = createSprite(200,160,400,20);
 
  // Add all these images to Ground.
  ground.addImage("ground",groundImage);
  ground.addImage("newGround",RG);
  ground.addImage("Forest",FG);
  ground.addImage ("night",NG);

  //Create an invisible ground.
  inGround = createSprite (100,190,200,20);
  //inGround.debug = true ;
  inGround.setCollider ("rectangle",0,0,200,10);
  inGround.visible = false ;
  
  // Create Triveni
  girl = createSprite (50,150,1,1);
  
  // add all these images and animations to Triveni.
  girl.addAnimation ("run",girl_Running);
  girl.addImage ("loose",girl_Out);
  girl.addImage ("highJump",jump);
  
  // Let triveni's scale be 0.5.
  girl.scale = 0.5;
 
  // Create the reset button
  restart = createSprite (300,100,15,15);
  restart.addImage ("outandplay", restartImg);
      
  // create the gameover text.
  go = createSprite (290,50, 10, 10);
  go.addImage ("nextrun",goi);
  go.visible = false ;
  
  // Create a new group named Obstaclegroup.
  obstacleGroup = createGroup ();

}

function draw() {

  background ("lightblue");
  
  // If space key is pressed then:
  if(keyDown("space")&& girl.y >= 100) {
      
     // Make Triveni jump !
     girl.velocityY = -12;
    
    // Change the girl image to jumping position
     girl.changeImage("highJump");
    
    // play the jump sound.
    jumpSound.play ();
    
    }
  
  // if the game state is Play , then.
  if (gameState===PLAY){
    
  
    // Spawn the obstacles.
    spawnObstacles ();
    
    // Add gravity to the girl so that it doesn't fly away !
     girl.velocityY = girl.velocityY + 0.8 ;
    
    // Don't show the restart button on the  screen.
    restart.visible = false ;
    
    // Set the velocity X of the ground to -8 so that it looks like a scrolling ground.
    ground.velocityX = -8 ;
    
    // Add score
    score = score + Math.round(getFrameRate()/60);
    
    // If ground's x is lower than 250, then just put it again into the front(Make it infinte !)
    if(ground.x  < 250){
    
     ground.x = ground.width /2;
      
    }
  
    // if score is more than 500, then change the ground's and obstacle's image.
    if(score > 500 ){
      
      ground.changeImage ("newGround");
      obstacle.changeImage ("cone");
      
    }
    
    // if score is more than 1500, then change the ground's and the obstacle's image. 
    if(score > 1500){
      
      ground.changeImage ("Forest");
      obstacle.changeImage ("rock");
    
    }
    
    // if score's more than 2500 then change the ground"s the obstacle's image again !
    if(score > 2500 ){
      
      ground.changeImage ("night");
      obstacle.changeImage ("water");
      background("black");
      
    }
    
    // if score's more than 3500, then change thee ground's and obstacle's image...
    if(score > 3500 ){
      
      ground.changeImage ("ground");
      obstacle.changeImage ("rock");
      
      
    }
    
    // If girl is touching obstacles then :
    if(girl.isTouching(obstacleGroup)){
      
      // Change the gamestate to end.
      gameState = END ;
      
      // Play the Die Sound.
      outSound.play ();
      
    }
    
  } else
    
    // But if the game state is End, then :
    if (gameState === END ){
      
      // Change triveni's image to out image.
      girl.changeImage ("loose");
      
      // Set the ground's velocity to 0.
      ground.velocityX = 0;
      
      // set the obstacles velocity to 0.
      obstacleGroup.setVelocityXEach (0);
      
      // Show the restart button.
      restart.visible = true ;
      
      // show the text Game Over.
      go.visible = true ;
      
      // Set the score to 0.
      score = 0 ;
      
      // The girl's velocity must be 0 !
      girl.velocityY = 0 ;
      
      // Don't destroy the Obstacles.
      obstacleGroup.setLifetimeEach(-1);
      
      // if Reset button is pressed, then :
      if(mousePressedOver(restart)){
          
       // Change the gamestate to play !
       gameState = PLAY ;
     
        // Follow the reset function 
        reset ();
        
        
      }
      
    }
    
    
  // Make triveni collide to the Invisible ground.  
  if (girl.collide (inGround)){
   
    // Change the animation of triveni
    girl.changeAnimation ("run");
   
 }
  
  // draw all the sprites.
  drawSprites();
  
    textSize(30);
    fill("red");
    text ("Score : " + score, 230,30);
  
}

function spawnObstacles (){
  
  if(frameCount % 60 === 0 ){
    
    obstacle = createSprite(600,145,10,40);
    obstacle.velocityX = -8 ;
    obstacle.scale = 1.5 ;
    
    
    
    obstacle.lifetime = 220; 
    obstacle.debug = false ;
    
    var rand = Math.round(random(1,3));
    
    obstacle.setCollider("rectangle",0,25,50,20);
    
    
    switch(rand){
        
      case 1 : obstacle.addImage (OI1);
              break;
              
      case 2 : obstacle.addImage (OI2); 
              break ;
              
      case 3 : obstacle.addImage (OI3);
              break; 
              
      default : obstacle.addImage (OI2);
              break ;
    
    }
    obstacleGroup.add (obstacle);
    obstacle.addImage("cone",RO);
    obstacle.addImage ("rock",FO);
    obstacle.addImage ("water",NO);
  }

}

function reset (){
  
  obstacleGroup.destroyEach ();
  
}
