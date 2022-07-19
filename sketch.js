var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
function preload()
{
  //Carrega as imagens
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}
function setup()
{
  createCanvas(windowWidth,windowHeigth);
  //Som de fundo
  spookySound.loop();
  //Torre
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  //Grupos
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  //Fantasma
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}
function draw()
{
  background(0);
  if (gameState === "play") 
  {
    if(keyDown("left_arrow"))
    {
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow"))
    {
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space"))
    {
      ghost.velocityY = -10;
    }
    //Gravidade no fantasma
    ghost.velocityY = ghost.velocityY + 0.8
    //Efeito torre infinita
    if(tower.y > 400)
    {
      tower.y = 300
    }
    spawnDoors();    
    //Apoio do fantasma
    if(climbersGroup.isTouching(ghost))
    {
      ghost.velocityY = 0;
    }
    //Condição para GAME OVER
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600)
    {
      ghost.destroy();
      gameState = "end"
    }   
    drawSprites();
  } 
  if (gameState === "end")
  {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
}
function spawnDoors() 
{
  //Portas 
  if (frameCount % 240 === 0) 
  {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //Função de portas aleatórias
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    //Velocidade
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    //Altera a profundidade do fantasma
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //Tempo de vida
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //Adiciona cada imagem aos grupos
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

