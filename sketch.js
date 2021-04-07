/*
so far this code is the single player version of the project so no multiplayer features have been implemented for right now multiplayer version
might be in the works
*/
var MAINMENU = 1;
var FIGHT = 0;
var PLAYERMENU = 2;
var gameState=MAINMENU;

var NULL = 0;
var PLAYEREDIT = 1;
var NEWCHARACTER = 2;
var playerState = NULL

var bossRun1 = true;
var bossRun2 = false;
 
var bossMode1=true;
var bossMode2=false;
var bossMode3=false;
var bossMode4=false;
var bossMode5=false;
var bossMode6=false;
var bossMode7=false;
var bossMode8=false;
var bossMode9=false;
var bossMode10=false;


 
var ground;
var pellet, pelletGroup;
var fireball, fireballGroup;
var player, boss;
var assistant;
var playButton, playButtonImg;
var playerWeapon;
var weaponCoolDown;
var playerLevel;
var playerHealth, playerSpeed, playerStrength;
var skillPoints;
 
var bossHealth;
var boss1Idle,boss1Moving_1,boss1Moving_2;
var boss2Idle;
var boss3Idle;
 
var bg;

var platform, platformGroup;

var playerVisual, editButton, newCharacterButton, playButton2,returnButton;

var editImg, newCharacterImg, playImg, returnImg

var species, job, armor, weapon, skillTree, magic, other;
 
function preload(){
 playButtonImg = loadImage("Img/playButton.png");
boss1Idle = loadImage("Img/Flaming_Hornet.png");
boss2Idle = loadImage("Img/Sand_Larva.png");
boss3Idle = loadImage("Img/Face.png");
bg = loadImage("Img/bg.png");

editImg = loadImage("Img/Icons/icons1.png");
newCharacterImg = loadImage("Img/Icons/icons0.png");
playImg = loadImage("Img/Icons/icons2.png");
returnImg = loadImage("Img/Icons/icons3.png");
}
 
function setup(){
createCanvas(1200,500);
 
player = createSprite(200,400,50,50);
player.shapeColor=("red");

playerWeapon = createSprite(200,400,20,20);
playerWeapon.shapeColor=("pink");
 
boss = createSprite(1000,480,100,50);
boss.addImage("boss1", boss1Idle);
boss.addImage("boss2", boss2Idle);
boss.addImage("boss3", boss3Idle);
boss.scale=(2.0)
//boss.debug = true;
boss.setCollider("rectangle",0,0,this.width,this,height) 
console.log(boss.y);

ground = createSprite(600,490,1200,20);
ground.shapeColor=("purple")

playButton = createSprite(600,250,200,200);
playButton.addImage(playButtonImg);
playButton.scale = 2.5;
 
pelletGroup = createGroup();
platformGroup = createGroup();
fireballGroup = createGroup();
 
bossHealth = 100;

playerLevel = 1;
playerHealth = 1;
playerSpeed = 1;
playerStrength = 1;
skillPoints = 0;

playerVisual = createSprite(200,300);
playerVisual.shapeColor=("red");

editButton = createSprite(500,100, 100, 75);
editButton.shapeColor=("blue");
editButton.addImage(editImg);
editButton.scale = 2

newCharacterButton = createSprite(500,200, 100, 75);
newCharacterButton.shapeColor=("yellow");
newCharacterButton.addImage(newCharacterImg);
newCharacterButton.scale = 2

playButton2 = createSprite(500, 300, 100, 75);
playButton2.shapeColor=("green");
playButton2.addImage(playImg);
playButton2.scale = 2

returnButton = createSprite(500, 400, 100, 75);
returnButton.shapeColor=("purple");
returnButton.addImage(returnImg);
returnButton.scale = 2

assistant = createSprite(200,400,25,25);
}
 
function draw(){ 
background(bg);
if(gameState === MAINMENU){
mainMenu();
if(mousePressedOver(playButton)){
    gameState = PLAYERMENU
 }
}

if(gameState === PLAYERMENU){
    playerMenu();
  if(mousePressedOver(playButton2)){
      gameState = FIGHT;
  }

  if(mousePressedOver(returnButton)){
    gameState = MAINMENU;
}


  if(playerState === NULL){
    if(mousePressedOver(editButton)){
      playerState = PLAYEREDIT;
    }
  }

  if(playerState === PLAYEREDIT){
    editButton.shapeColor=("black");
  }
}

if(gameState === FIGHT){
    fight();
fill ("red")
textSize(20);
text("Boss Health: "+ bossHealth, 500,50);
text("Level: "+ playerLevel, 500,100);
text("Health: "+ playerHealth, 500,150);
text("Speed: "+ playerSpeed, 500,200);
text("Strength: "+ playerStrength, 500,250);
text("SkillPoints:"+skillPoints, 500, 300);

if(keyDown("space")&& player.y >= 450) {
    player.velocityY = -20;
}
 
player.velocityY = player.velocityY + 0.8;

assistant.velocityY = assistant.velocityY + 0.8;

 
BossHealth0();
 
player.collide(ground);
boss.collide(ground);
player.collide(boss);
playerWeapon.collide(boss);
platformGroup.collide(player);
assistant.collide(ground);
//platformGroup.bounceOff(player);
 
spawnPellets();
playerControls();
Bossrun();
bossDemoMovement();
playerWeaponPosition();
playerWeaponCommands();
//playerLevelUp();
spawnPlatform();
assistantMod()
spawnfireballs();

if(player.isTouching(platformGroup)){
   //player.collide(platformGroup)
   //platformGroup.setVelocityEach(0);
   bounceOff();
}



}
 
drawSprites();
playerLevelUp();
}
 
function playerControls(){
    if(keyDown("d")){
        player.x=player.x+10;

       /* if(playerSpeed === 125){
            player.x=player.x+12.5;
        }

        if(playerSpeed === 150){
            player.x=player.x+15;
        }*/
    }
    if(keyDown("a")){
        player.x=player.x-10;

       /* if(playerSpeed === 125){
            player.x=player.x-12.5;
        }

        if(playerSpeed === 150){
            player.x=player.x-15;
        }*/
    }
 
 
}
 
function spawnPellets(){
    if (frameCount % 60 === 0){
        pellet = createSprite(player.x, player.y,25,25);
       
pellet.visible=false;
pellet.shapeColor=("Brown");
pelletGroup.add(pellet);
 
if(keyDown("e")){
    pellet.velocityX=10;
   pellet.visible=true;
}
   
}
if(boss.isTouching(pelletGroup)){
    bossHealth = bossHealth - 5;
    pelletGroup.collide(boss);
    pelletGroup.destroyEach();
}
 
}
 
function Bossrun(){
    if(bossRun1 === true){
        bossMovement1();
    }
 
    if(bossRun2 === true){
        bossMovement2();
    }
}
 
function bossMovement1(){
    if (bossMode1===true){
        boss.shapeColor=("blue");
        if(keyDown("down_arrow")){
            boss.y=boss.y+10;
        }
    }
 
    if (bossMode2===true){
        boss.shapeColor=("yellow");
        boss.velocityY = boss.velocityY + 0.8;
    }
 
    if(bossMode3===true){
        boss.shapeColor=("black");
    }
    
    if(bossMode4===true){
        boss.shapeColor=("purple");
    } 
 
    if(bossMode5===true){
        boss.shapeColor=("red");
    }
}
 
function bossMovement2(){
    if (bossMode6===true){
        boss.shapeColor=("white");
    }
 
    if (bossMode7===true){
        boss.shapeColor=("pink");
    }
 
    if(bossMode8===true){
        boss.shapeColor=("magenta");
    }
    
    if(bossMode9===true){
        boss.shapeColor=("brown");
    } 
 
    if(bossMode10===true){
        boss.shapeColor=("black");
    }
}
 
function BossHealth0(){
    if(bossMode1===true && bossHealth === 0){
    playerLevel=playerLevel+1;
    boss.changeImage("boss2", boss2Idle);
    boss.scale=(2.0);
        bossHealth = bossHealth + 150;
       bossMode1=false;
       bossMode2=true;
       bossMode3=false;
       bossMode4=false;
       bossMode5=false;
    }
    if(bossMode2===true && bossHealth === 0){
       boss.changeImage("boss3", boss3Idle);
        playerLevel=playerLevel+1;
        bossHealth = bossHealth + 200;
        bossMode1=false;
        bossMode2=false;
        bossMode3=true;
        bossMode4=false;
        bossMode5=false
     }
     if(bossMode3===true && bossHealth === 0){
        playerLevel=playerLevel+1;
         bossHealth = bossHealth + 250;
        bossMode1=false;
        bossMode2=false;
        bossMode3=false;
        bossMode4=true;
        bossMode5=false;
     }
     if(bossMode4===true && bossHealth === 0){
        playerLevel=playerLevel+1;
        bossHealth = bossHealth + 400;
       bossMode1=false;
       bossMode2=false;
       bossMode3=false;
       bossMode4=false;
       bossMode5=true;
    }
    if(bossMode5===true && bossHealth === 0){
       playerLevel=playerLevel+1;
        bossRun2=true;
        bossRun1=false;
        bossHealth = bossHealth + 450;
       bossMode1=false;
       bossMode2=false;
       bossMode3=false;
       bossMode4=false;
       bossMode5=false;
       bossMode6=true;
    }
    if(bossMode6===true && bossHealth === 0){
        playerLevel=playerLevel+1;
        bossHealth = bossHealth + 500;
        bossMode6=false;
        bossMode7=true;
    }
    if(bossMode7===true && bossHealth === 0){
    playerLevel=playerLevel+1;
        bossHealth = bossHealth + 550;
        bossMode7=false;
        bossMode8=true;
    }
    if(bossMode8===true && bossHealth === 0){
        playerLevel=playerLevel+1;
        bossHealth = bossHealth + 600;
        bossMode8=false;
        bossMode9=true;
    }
    if(bossMode9===true && bossHealth === 0){
        playerLevel=playerLevel+1;
        bossHealth = bossHealth + 650;
        bossMode9=false;
        bossMode10=true;
    }
    if(bossMode10===true && bossHealth === 0){
        playerLevel=playerLevel+1;
        bossHealth = bossHealth + 100;
        bossMode1=true;
        bossMode10=false;
    }
}

function mainMenu(){
    playButton.visible = true;
    player.visible = false;
    boss.visible = false;
    ground.visible = false;
    playerWeapon.visible=false;
    //platform.visible=false;
    editButton.visible = false;
    returnButton.visible = false;
    playerVisual.visible = false;
    newCharacterButton.visible = false;
    playButton2.visible = false;
    assistant.visible=false;
}

function fight(){
    playButton.visible = false;
    player.visible = true;
    boss.visible = true;
    ground.visible= true;
    playerWeapon.visible=true;
    //platform.visible=true;
    editButton.visible = false;
    returnButton.visible = false;
    playButton2.visible = false;
    newCharacterButton.visible = false;
    playerVisual.visible = false;
    assistant.visible=true;
}

function playerMenu(){
    playButton.visible = false;
    player.visible = false;
    boss.visible = false;
    ground.visible = false;
    playerWeapon.visible=false
    //platform.visible=false;
    playerVisual.visible = true;
    editButton.visible = true;
    returnButton.visible = true;
    playButton2.visible = true;
    newCharacterButton.visible = true;
    assistant.visible=false;
}

function bossDemoMovement(){
    /*
this is for custom demo for boss movement
    */
   if(keyDown("left_arrow")){
       boss.x=boss.x-10;
   }
   if(keyDown("right_arrow")){
    boss.x=boss.x+10;
}
if(keyDown("up_arrow")){
    boss.y=boss.y-10;
}

}

function playerWeaponPosition(){
    playerWeapon.x=player.x+30;
    playerWeapon.y=player.y;
}

function playerWeaponCommands(){
    if(playerWeapon.isTouching(boss) && keyDown("r")){
        bossHealth = bossHealth-10;
    }
}

function playerLevelUp(){

    if(playerLevel>=2 && playerLevel<=3){
        skillPoints = 5;
    }

// if (playerLevel === 2){
//    /* playerHealth = 125;
//     playerSpeed = 125;
//     playerStrength = 125;*/
//     skillPoints = 5;
//     console.log(skillPoints);

//     if(skillPoints === 5){
//         skillPoints = skillPoints =5;
//     }
// }
 //if (playerLevel === 3){
//     /*playerHealth = 150;
//     playerSpeed = 150;
//     playerStrength = 150;*/
//     skillPoints = skillPoints +5;
// }
}

function spawnPlatform(){
    if(World.frameCount%120 === 0){
    platform = createSprite(1200,350,200,20);
    platform.shapeColor = ("purple");
    platform.velocityX=-7;
    platformGroup.add(platform);
    platform.depth=player.depth
    //console.log(player.depth);
//console.log(platform.depth);
    /* if(gameState === mainMenu || gameState === playerMenu){
        platformGroup.visible=false;
     }*/
     }
 }

 function bounceOff(){
    if (platformGroup.x - player.x < player.width/2 + platformGroup.width/2
        && player.x - platformGroup.x < player.width/2 + platformGroup.width/2) {
      platformGroup.velocityX = platformGroup.velocityX * (-1);
      player.velocityX = player.velocityX * (-1);
    }
    if (platformGroup.y - player.y < player.height/2 + platformGroup.height/2
      && player.y - platformGroup.y < player.height/2 + platformGroup.height/2){
      platformGroup.velocityY = platformGroup.velocityY * (-1);
      player.velocityY = player.velocityY * (-1);
    }
}

function spawnfireballs(){
    if (frameCount % 60 === 0){
        fireball = createSprite(boss.x, boss.y,25,25);
       
fireball.visible=false;
fireball.shapeColor=("Brown");
fireballGroup.add(fireball);
 
if(keyDown("i")){
    fireball.velocityX=-10;
   fireball.visible=true;
}
   
}
/*if(boss.isTouching(pelletGroup)){
    bossHealth = bossHealth - 5;
    pelletGroup.collide(boss);
    pelletGroup.destroyEach();
}*/
 
}

function assistantMod(){
    assistant.x = player.x-40;
    assistant.y = player.y+10;
  }

function aiEnemies(){
 
}
