var play = 1;

var end = 0;

var gameState = play;

var count = 0;

var monkey = createSprite(200,380,20,50);
monkey.setCollider("circle",0,0,40);
monkey.x = 50;

var ground = createSprite(200,380,400,20);
ground.x = ground.width /2;

var invisibleGround = createSprite(200,385,400,5);
invisibleGround.visible = false;

var ObstaclesGroup = createGroup();
var CloudsGroup = createGroup();

var gameOver = createSprite(200,300);
gameOver.scale = 0.5;
gameOver.visible = false;

var restart = createSprite(200,340);
restart.scale = 0.5;
restart.visible = false;

textSize(18);
textFont("Georgia");
textStyle(BOLD);

function setup() {
  createCanvas(400,400);
  createSprite(400, 200, 50, 50);
}

function draw() {
  background("white");

  text("Score: "+ count, 250, 100);
  console.log(gameState);

  if(gameState === play){
    ground.velocityX = -(6+ 3*count/100);
    count = count + Math.round(World.frameRate/60);

      
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
      
      if(keyDown("space") && monkey.y >= 359){
        monkey.velocityY = -12 ;
      }

    monkey.velocityY = monkey.velocityY + 0.8;

        spawnClouds();
  
        spawnObstacles();
        
        if(ObstaclesGroup.isTouching(monkey)){
          gameState = end;
          playSound("die.mp3");
        }
      }
      
      else if(gameState === end) {
        gameOver.visible = true;
        restart.visible = true;
        ground.velocityX = 0;
        monkey.velocityY = 0;
        ObstaclesGroup.setVelocityXEach(0);
        CloudsGroup.setVelocityXEach(0);
        
        
        ObstaclesGroup.setLifetimeEach(-1);
        CloudsGroup.setLifetimeEach(-1);
        
      }
      if(mousePressedOver(restart)){
        reset();
      }
    
      monkey.collide(invisibleGround);

  drawSprites();
}

function spawnClouds() {
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(400,320,40,10);
    cloud.y = randomNumber(280,320);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 134;
    
    cloud.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    CloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = -(6+ count/100);
    
    var rand = randomNumber(1,6);
    
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    ObstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = play;
  gameOver.visible = false;
  restart.visible = false;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  count = 0;
}