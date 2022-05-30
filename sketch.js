var spaceShipImg, enemyImg, astronautImg;
var spaceImg, restartImg;
var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var enemyG, enemy;
var astronautG, astronaut;

function preload(){
  spaceImg = loadImage('space.jpg');
  restartImg = loadImage('restart.png');

  spaceShipImg = loadImage('spaceShip.png');
  enemyImg = loadImage('enemy.png');
  astronautImg = loadImage('astronaut.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  spaceShip = createSprite(width / 2, height / 2 + 200);
  spaceShip.addImage('spaceShip', spaceShipImg);
  spaceShip.scale = 0.3;

  restart = createSprite(width / 2, height / 2);
  restart.addImage('restart', restartImg);
  restart.scale = 1; // prô: a bolinha estava aqui, mas estava muito pequenininha, a prô aumentou
  restart.visible = false;

  astronautG = new Group();
  enemyG = new Group();
}

function draw() {
  // spaceShip.debug = true
  
  background(spaceImg);
  
  drawSprites();

  fill("white"); // prô: pra poder pintar o texto de qualquer cor que vc quiser
  textSize(50); // prô: aumentar tamanho da pontuacao
  text('Pontuação: ' + score, width - 400, 50); // prô: tive que aumentar o quanto tira do x pq aumentei a fonte

  // text.Color = '46'

  if (gameState === PLAY) {
    // prô: se deixar assim, ele vai ganhando pontuacao por segundo, 
    // se quiser deixar só pelo o que pegar na tela vc pode deixar só score
    score = score + Math.round(getFrameRate() / 60);
  
    spawnEnemy();
    spawnAstronaut();
    
    if (astronautG.isTouching(spaceShip)) {
      score += 5 // prô: se deixar =5, ele não soma 5, ele muda a pontuação pra 5
      // prô: achei legal sumir o astronauta quando toca nele
      astronautG.destroyEach();
    }

    if (keyDown("D")){
      spaceShip.x = spaceShip.x + 7
    }

    if (keyDown("A")){
      spaceShip.x = spaceShip.x + -7
    }

    if (enemyG.isTouching(spaceShip)) {
      gameState = END
    }
  } 
  else if (gameState === END) { 
    restart.visible = true

    enemyG.setVelocityYEach(0)
    enemyG.setLifetimeEach(-1)

    astronautG.setVelocityYEach(0)
    astronautG.setLifetimeEach(-1)

    if (mousePressedOver(restart)) {
      reset()
    }
  }
}

function spawnEnemy() {
  if (frameCount % 40 === 0) {
    enemy = createSprite(0, 0, 10, 40)
    // prô: a prô trocou a ordem (velocityY depois de criar o sprite)
    enemy.velocityY = enemy.velocityY + 6
    enemy.addImage(enemyImg)
    enemy.x = Math.round(random(0, width)) + 100
    // prô: sorteio onde vai aparecer na tela
    enemy.scale = 0.3
    enemy.lifetime = 300
    enemyG.add(enemy)
  }  
}

function spawnAstronaut() {
  if (frameCount % 100 === 0) {
    var astronaut = createSprite(0, 0, 40, 10)
    // prô: a prô trocou a ordem (velocityY depois de criar o sprite)
    astronaut.velocityY = astronaut.velocityY + 6
    astronaut.addImage(astronautImg)

    astronaut.x = Math.round(random(0, width)) + 100
    // prô: sorteio onde vai aparecer na tela

    astronaut.scale = 1.2
    astronaut.lifetime = 300
    astronautG.add(astronaut)
  }
}

function reset() {
  gameState = PLAY
  restart.visible = false

  enemyG.destroyEach()
  astronautG.destroyEach()

  // prô: voltar o foguete pro lugar inicial
  spaceShip.x = width / 2
  spaceShip.y = height / 2 + 200

  score = 0
}
