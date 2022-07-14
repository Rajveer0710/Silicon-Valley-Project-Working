let drone, drone_img;
let tree, tree_img;
let backgroundImage
let bird, bird_img; 
let plane, plane_img;
let tornado;
let startButtonImg, startButton;
var gameState = 0;
//var play = 1;
var currentWidth = 0;
var score = 0;
var gameOver, restart, gameOverImg, restartImg;

var guitarSound, buzzerSound, crashingSound;

function preload(){
  backgroundImage = loadImage("background.png");
  
  bird_img = loadImage("bird.png");
  drone_img = loadImage("drone.png");
  plane_img = loadImage("plane.png");
  tornado = loadImage("tornado.png");
  tree_img = loadImage("tree.png");
  startButtonImg = loadImage("start.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

  guitarSound = loadSound("Guitar.mp3");
  buzzerSound = loadSound("Buzzer.mp3");
  crashingSound = loadSound("CrashSound.mp3");
}

    function setup(){
      createCanvas(2720, 800);

      startButton = createSprite(width/2, 500, 20, 20);
      startButton.addImage(startButtonImg);
      startButton.scale = 1;

      gameOver = createSprite(width/2,200);
      gameOver.addImage(gameOverImg);
      
      restart = createSprite(width/2,400, 20, 20);
      restart.addImage(restartImg);
      
      gameOver.scale = 5;
      restart.scale = 2;
    
      gameOver.visible = false;
      restart.visible = false;

      treeGroup = new Group();
      planeGroup = new Group();
      birdGroup = new Group();
      //tornadoGroup = new Group();

      score = 0;
    }

function draw(){
      background(backgroundImage);


      textSize(45);
      fill("orange")
      stroke("red");
      strokeWeight(3);
      text("Score: "+ score, 2400,70);
      
      drawSprites();

      if(gameState === 0){

 
              textSize(30);
              fill("black")
              text("*INSTRUCTIONS*", 350, 200)
              text("1. Press space to make drone fly", 350, 250)
              text("2. Use arrow keys to move in different directions", 350, 280)
              text("3. Don't fly into the trees, birds, planes, and other objects", 350, 310)
              text("4. Every time you get 100 points the difficulty increases", 350, 340 )

              text("*STORY*", 1600, 200)
              text("Your a drone pilot that need to send package to a village", 1600, 250);
              text("suffering from a disease. The package contains a antidote that", 1600, 280);
              text("will save them.", 1600, 310);
              text("You must deliver the package safely.", 1600, 340);

              startButton.visible = true;

              if(mousePressedOver(startButton)){

                gameState = 1;
                startButton.visible = false;
          
                drone = createSprite(250, 200, 100, 100);
                drone.addImage(drone_img);
                drone.scale = 0.5 
                drone.setCollider("circle", 0, 0, 100)  

                guitarSound.play();


          
              }
      }

          if(gameState === 1){     
                  //currentWidth = currentWidth + Math.round(50);

          
                  if(keyDown("right")){
                  drone.velocityX = (6 + 3*score/100);
                
                  }
                
                  if(keyDown("left")){
                    drone.velocityX = -(6 + 3*score/100);
                
                  }

                  if(keyDown("down")){
                    drone.velocityY = (6 + 3*score/100);
                  }

                      if(keyDown("up")){
                        drone.velocityY = -(6 + 3*score/100);
                      }
                    
                      if(birdGroup.isTouching(drone)){
                        drone.destroy();
                        crashingSound.play();
                        gameState = 2;
                      }
      
                      if(planeGroup.isTouching(drone)){
                        drone.destroy();
                        crashingSound.play();
                        gameState = 2;
                      }
      
                      if(treeGroup.isTouching(drone)){
                        drone.destroy();
                        crashingSound.play();
                        gameState = 2;
                      }


                  edges = createEdgeSprites();
          
                  drone.bounceOff(edges);

                  score = score + Math.round(getFrameRate()/60);
                  treeGroup.velocityX = -(6 + 1.5*score/100);
                  birdGroup.velocityX = -(6 + 1.5*score/100);
                  planeGroup.velocityX = -(6 + 1.5*score/100);
          
                  spawnTree();
                  spawnBird();
                  spawnPlane();
            }
    
          else if(gameState === 2){ 

            gameOver.visible = true;
            restart.visible = true;
           
           treeGroup.setVelocityXEach(0);
           birdGroup.setVelocityXEach(0);
           planeGroup.setVelocityXEach(0);

           planeGroup.destroyEach();
           birdGroup.destroyEach();
           treeGroup.destroyEach();





           if(mousePressedOver(restart)) {
            reset();
          }
         }

    }   

    function reset(){
      gameState = 0;
      gameOver.visible = false;
      restart.visible = false;

      buzzerSound.play();
        guitarSound.pause();
  
      score = 0;
    }

function spawnTree() {
  //write code here to spawn the clouds
   if (frameCount % 15 === 0) {
     tree = createSprite(2720, 680, 40, 10);
    //tree.x = Math.round(random(100,2000));
    tree.addImage(tree_img);
    tree.scale = 0.5;
    tree.velocityX = -12; 
    
     //assign lifetime to the variable
    tree.lifetime = 300;
    
    //adjust the depth
    //tree.depth = drone.depth;
    //drone.depth = drone.depth + 1;
    
    //adding cloud to the group
   treeGroup.add(tree);
    }
}

function spawnBird() {
  //write code here to spawn the clouds
   if (frameCount % 70 === 0) {
     bird = createSprite(2200,300,40,10);
   bird.y = Math.round(random(40,500));
   bird.x = Math.round(random(2000,2500));
    bird.addImage(bird_img);
    bird.scale = 0.2;
    bird.velocityX = -10;
    
     //assign lifetime to the variable
    bird.lifetime = 134;
    
    //adjust the depth
    bird.depth = drone.depth;
    drone.depth = drone.depth + 1;
    
    //adding cloud to the group
   birdGroup.add(bird);
    }
}

function spawnPlane() {
  //write code here to spawn the clouds
   if (frameCount % 80 === 0) {
     plane = createSprite(2250,800,40,10);
    plane.x = Math.round(random(2000, 2500));
    plane.y = Math.round(random(40, 300));
    plane.addImage(plane_img);
    plane.scale = 0.8;
    plane.velocityX = -10;
    
     //assign lifetime to the variable
    plane.lifetime = 300;
    
    //adjust the depth
    plane.depth = drone.depth;
    drone.depth = drone.depth + 1;
    
    //adding cloud to the group
   planeGroup.add(plane);
    }
}
