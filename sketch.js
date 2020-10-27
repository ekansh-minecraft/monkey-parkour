var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage, obstacles
var foodGroup, obstacleGroup
var survivalTime = 0;
var ground;
var score = 0
var END = 0
var PLAY = 1
var gameState
var WALKING = 0
var JUMPING = 58
var monkeyState = WALKING
var rewardFrame
var y = 100
var endFrame

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  //creatingmonkey
  monkey = createSprite(80, 315, 20, 20)
  monkey.addAnimation("moving", monkey_running)
  monkey.scale = 0.1

 
  ground = createSprite(400, 350, 900, 10)
  ground.velocityX = -4;

  foodGroup = createGroup()
  obstacleGroup = createGroup()

  gameState = PLAY

}

function draw() {
 // the color of the screen green
  background("green")

  // the text score
  textSize(13)
  stroke("white")
  fill("white")
  text("Score:" + score, 50, 50)

  // the text survival time and this means how many atempents done
  textSize(13)
  stroke("black")
  fill("black")
  text("SurvivalTime:" + survivalTime, 250, 50)


  monkey.collide(ground)

  if (monkey.isTouching(obstacleGroup)) {
    gameState = END
    ground.velocityX = 0
    obstacleGroup.forEachSetVelocityX = 0
    obstacleGroup.destroyEach()
  }


 //this if condition is for the playing state
  if (gameState === PLAY) {
    playing()
  }
 // this whole gamestate is when it is gameover
  if (gameState === END) {

    textSize(13)
    fill("red")
    text("Press r to restart", 20, 200)

    if (keyDown("r")) {
      gameState = PLAY;
      survivalTime = survivalTime + 1
      obstacleGroup.destroyEach()
      foodGroup.destroyEach()
    }
      score = 0
      ground.velocityX = 0
    }

  drawSprites()
  
    
}
 // spawning obstacles
function spawnObstacles() {
  var obstacles = createSprite(210, 330, 20, 20)
  obstacles.addImage("minecraft", obstacleImage)
  obstacles.scale = 0.1
  obstacles.velocityX = -4;
  obstacles.debug = false
  obstacles.setCollider("circle", 0, 0)
  obstacleGroup.add(obstacles)
}
 // spawning banana
function spawnBanana() {
 
  var banana = createSprite(210,250,20,20)
  banana.addImage("miecraft", bananaImage)
  banana.scale = 0.07
  banana.velocityX = -4;
  banana.debug = false
  banana.setCollider("circle", 4, 4)
  foodGroup.add(banana)
}

// this is when it is playing 
function playing()
  {
  if (ground.x > 0) {
    ground.x = ground.width / 2
  }
  // making the mokey jump
  if (keyDown("space") && monkeyState === WALKING) {
    monkey.velocityY = -14
    monkey.y = monkey.y - 1
    monkeyState = JUMPING
  }
  if (monkeyState === JUMPING) {
    monkey.velocityY = monkey.velocityY + 0.8
    
  if (monkey.isTouching(ground)) {
    monkeyState = WALKING
    }
  }

  // spawning the obstacles in 80 frames
    if (frameCount % 80 === 0) {
      spawnObstacles()
      spawnBanana()
    }
      // making the monkey's collider
      monkey.setCollider("circle", 0, 0)

     // decting if the monkey is touching the foodgroup so that it can          destoy it and increase the score
  if (monkey.isTouching(foodGroup)) {
    foodGroup.destroyEach()
   score = score + 1 
    y = 250
    
    endFrame = frameCount + 30
  }
  if(frameCount < endFrame)
  {
     text("+1",200,y)
     y = y - 1
  }
}