var PLAY=1;
var END=0;
var gameState=PLAY;

var BackgroundImg, BackGround 
var sweetBirdImg,sweetBird
var birdImg1,birdImg2, bird 
var score=0;
var gameOverImg,gameOver
var restartImg , restart 

      

function preload(){
  sweetBirdImg =loadAnimation("sweetBird1.png","sweetBird2.png","sweetBird3.png","sweetBird4.png","sweetBird5.png","sweetBird6.png","sweetBird7.png","sweetBird8.png","sweetBird9.png");
  
  BackgroundImg=loadImage("orange-evening-4.png");
  birdImg1=loadImage("eagle1.png");
  birdImg2=loadImage("Rc0094197e459683cc9e5cd74d3a81420-1.png");

  gameOverImg=loadImage("game-over-white-red-b.png");
  restartImg=loadImage("UI-13-512.png");

  
  }

function setup(){
  createCanvas(windowWidth,windowHeight);
  //create background
  edges=createEdgeSprites();
  
  BackGround= createSprite(width/1.6,height/2,60,60);
  BackGround.addImage("backGround",BackgroundImg);

  
   
  
  sweetBird =createSprite(50,height/3);
  sweetBird.addAnimation("sweetBirdImg",sweetBirdImg);
  sweetBird.scale=0.4;
  //sweetBird.debug=true;
  sweetBird.setCollider("circle",0,0,10);
  
  gameOver=createSprite(width/2,height/3,20,20);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.7;

  restart=createSprite(width/2,height/1.7,20,20);
  restart.addImage(restartImg);
  restart.scale=0.1;
  
  birdsG= new Group();
  
}

function draw() {

  background("blue");
 
  if(gameState===PLAY){
    gameOver.visible=false;
    restart.visible=false;

    sweetBird.visible=true;
    score=score+Math.round(getFrameRate()/60);

    
    BackGround.velocityX=-(2+score/300);
    

          if(keyDown("up")||touches.y<height/2){
              sweetBird.y=sweetBird.y-5;
              touches=[];
    }else if(keyDown("down")||touches.y<height/2){
              sweetBird.y=sweetBird.y+5;
              touches=[];
  }

      
          
    birds();
    if(sweetBird.isTouching(birdsG)){
      gameState=END;
    }
  }else if(gameState===END){
    gameOver.visible=true;
    restart.visible=true;
    sweetBird.visible=false;
    BackGround.velocityX=0;
    birdsG.setVelocityEach(0);
    birdsG.destroyEach();
  }
  
  
  if(BackGround.x<width/2.75){
    BackGround.x=width/1.6;
  }
  sweetBird.collide(edges);
  if(mousePressedOver(restart)){
    reset();
  }
  
 drawSprites();
 textSize(20);
 fill(0);
 text("score:"+score,width*3.5/4,50);
}

function birds(){
  
if(frameCount%100===0){
  bird=createSprite(width+20,Math.round(random(30,height-50)),10,10);
  
  birdsG.add(bird);
  bird.lifetime=width/4+100;
var rand=Math.round(random(1,2));
  switch(rand){
    case 1:bird.addImage(birdImg1);
           bird.velocityX=-(7+score/(3*width/4));
           bird.scale=0.38
           break
    case 2:bird.addImage(birdImg2);
           bird.scale=0.4;
           bird.velocityX=-(5+score/(3*width/4));
           break
    default:break
  }
}
}
function reset(){
  gameState=PLAY;
  score=0;
  birdsG.destroyEach();

}