var army, armyAni;
var jumpS;
var bomb, bombG, bombImg;
var blastImg, blastS,gameOverImg,restart,gameOver, restartImg;
var bgImg, bgS, bg;
var PLAY = 0;
var END = 1;
var gameState;
var inviGround;
var score;

function preload(){
  bgImg = loadImage("bgImg2.jfif");

  armyAni = loadAnimation("s1.png", "s2.png", "s3.png", "s4.png", "s5.png", "s6.png");
  
  bombImg = loadImage("bomb1.png");
  blastImg = loadAnimation("blast.png");

  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("restart-icon-internet-button-on-260nw-421013368-removebg-preview.png");

  bgS = loadSound("bgmusic2.wav");
  blastS = loadSound("boom.wav");
  jumpS = loadSound("jump.wav");
}

function setup(){
  createCanvas(400,400);
  
  bg = createSprite(300,200,600,400)
  bg.addImage(bgImg);
  bg.scale = 2.7;
  bg.velocityX = -4;
  
  army = createSprite(50,130,30,80);
  army.addAnimation("running", armyAni);
  army.addAnimation("blast", blastImg);
  army.scale = 0.2;
  army.velocityY = army.velocityY + 0.9;
  army.debug = false;
  army.setCollider("rectangle",-20,0,200,450);

  inviGround = createSprite(200,370,400,80);
  inviGround.visible = false;
  
  restart = createSprite(200,200,20,20);
  restart.addImage(restartImg);
  restart.visible = false;
  
  gameOver = createSprite(50,200,80,20);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  
  score = 0;
  
  bombG = new Group();
  climberG = new Group();
}

function draw(){
  
  //to prevent army from falling off the ground
 army.collide(inviGround);

 //add gravity
 army.velocityY = army.velocityY + 0.9;
  
 //displaying score
text("Score: "+ score, 500,50);
  
  
 if(gameState === PLAY){

  army.addAnimation("running", armyAni);
   
   bgS.play();
   
   if(bg.x === 0){
     bg.x = width/2
   }
   
   if(keyWentDown("space") && army.y >= 150 ){
     army.velocityY = -12;
     jumpS.play();
   }   
   
    score = score + Math.round(frameCount/60);
   
   if(bombG.isTouching(army)){
     blastS.play();
     gameState = END;
   }
 } 
  if(gameState === END){
    
    army.changeAnimation("blast", blastImg);
    gameOver.visble = true;
    restart.visble = true;
    
    
  }  
  spawnbomb();
  drawSprites();
}

function spawnbomb(){
  a = Math.round(random(60,110))

  //to create bombs on random positions
  if(frameCount % a === 0){
    bomb = createSprite(600,260,50,50);
    bomb.addImage("bomb", bombImg);
    bomb.scale = 0.05;
    bomb.velocityX = -4;
    bomb.lifetime = width / bomb.velocityX
    bomb.setCollider("circle",0,0,width/2)
    
    bombG.add(bomb);
  }
}
