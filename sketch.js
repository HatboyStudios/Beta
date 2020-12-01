var MAINMENU = 1;
var FIGHT = 0;
var PLAYERMENU = 2;
var gameState=MAINMENU;

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

/*var level_1 = true;
var level_2 = false;
var level_3 = false;*/
 
var ground;
var pellet, pelletGroup;
var player, boss;
var assistant;
var playButton, playButtonImg;
var playerWeapon;
var weaponCoolDown;
//var playerLevel;
var playerHealth, playerSpeed, playerStrength;
 
var bossHealth;
var boss1Idle,boss1Moving_1,boss1Moving_2;

 
 
function preload(){
 playButtonImg = loadImage("Img/playButton.png");
}
 
function setup(){
createCanvas(1200,500);
 
player = createSprite(200,400,50,50);
player.shapeColor=("red");

playerWeapon = createSprite(200,400,20,20);
playerWeapon.shapeColor=("pink");
 
boss = createSprite(1000,400,100,100);
 
 assistant = createSprite(200,400,25,25);
 
ground = createSprite(200,500,2000,20);
ground.shapeColor=("purple")

playButton = createSprite(600,250,200,200);
playButton.addImage(playButtonImg);
playButton.scale = 2.5;
 
pelletGroup = createGroup();
 
bossHealth = 100;
/*playerLevel = 1;
playerHealth = 100;
playerSpeed = 100;
playerStrength = 100;*/
}
 
function draw(){ 
background("gray");
if(gameState === MAINMENU){
mainMenu();
if(mousePressedOver(playButton)){
    gameState = PLAYERMENU
 }
}

if(gameState === PLAYERMENU){
    playerMenu();
  if(keyDown("p")){
      gameState = FIGHT;
  }
}

if(gameState === FIGHT){
    fight();
fill ("red")
text("Boss Health: "+ bossHealth, 500,50);
/*text("Level: "+ playerLevel, 500,100);
text("Health: "+ playerHealth, 500,150);
text("Speed: "+ playerSpeed, 500,200);
text("Strength: "+ playerStrength, 500,250);*/

if(keyDown("space")&& player.y >= 450) {
    player.velocityY = -12;
}
 
player.velocityY = player.velocityY + 0.8;
boss.velocityY = boss.velocityY + 0.8;
assistant.velocityY = boss.velocityY + 0.8;
 
BossHealth0();
 
player.collide(ground);
boss.collide(ground);
player.collide(boss);
playerWeapon.collide(boss);
 
spawnPellets();
playerControls();
Bossrun();
bossDemoMovement();
playerWeaponPosition();
playerWeaponCommands();
playerLevelUp();
assistantMod
}
 
drawSprites();
}

fucntion assistantMod(){
  assistant.x = player.x-5;
  assistant.y = player.y-5;
}
 
function playerControls(){
    if(keyDown("d")){
        player.x=player.x+10;
    }
    if(keyDown("a")){
        player.x=player.x-10;
    }
 
 
}
 
function spawnPellets(){
    if (frameCount % 60 === 0){
        pellet = createSprite(player.x, player.y,25,25);
       
pellet.visible=false;
pellet.shapeColor=("Brown");
pelletGroup.add(pellet);
 
if(keyDown("e")){
    pellet.velocityX=5;
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
    }
 
    if (bossMode2===true){
        boss.shapeColor=("yellow");
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
    //playerLevel=playerLevel+1;
        bossHealth = bossHealth + 150;
       bossMode1=false;
       bossMode2=true;
       bossMode3=false;
       bossMode4=false;
       bossMode5=false;
    }
    if(bossMode2===true && bossHealth === 0){
       // playerLevel=playerLevel+1;
        bossHealth = bossHealth + 200;
        bossMode1=false;
        bossMode2=false;
        bossMode3=true;
        bossMode4=false;
        bossMode5=false
     }
     if(bossMode3===true && bossHealth === 0){
        //playerLevel=playerLevel+1;
         bossHealth = bossHealth + 250;
        bossMode1=false;
        bossMode2=false;
        bossMode3=false;
        bossMode4=true;
        bossMode5=false;
     }
     if(bossMode4===true && bossHealth === 0){
        //playerLevel=playerLevel+1;
        bossHealth = bossHealth + 400;
       bossMode1=false;
       bossMode2=false;
       bossMode3=false;
       bossMode4=false;
       bossMode5=true;
    }
    if(bossMode5===true && bossHealth === 0){
       // playerLevel=playerLevel+1;
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
        //playerLevel=playerLevel+1;
        bossHealth = bossHealth + 500;
        bossMode6=false;
        bossMode7=true;
    }
    if(bossMode7===true && bossHealth === 0){
        //playerLevel=playerLevel+1;
        bossHealth = bossHealth + 550;
        bossMode7=false;
        bossMode8=true;
    }
    if(bossMode8===true && bossHealth === 0){
       // playerLevel=playerLevel+1;
        bossHealth = bossHealth + 600;
        bossMode8=false;
        bossMode9=true;
    }
    if(bossMode9===true && bossHealth === 0){
        //playerLevel=playerLevel+1;
        bossHealth = bossHealth + 650;
        bossMode9=false;
        bossMode10=true;
    }
    if(bossMode10===true && bossHealth === 0){
       // playerLevel=playerLevel+1;
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
    assistant.visible=false;
}

function fight(){
    playButton.visible = false;
    player.visible = true;
    boss.visible = true;
    ground.visible= true;
    playerWeapon.visible=true
    assistant.visible=true;
}

function playerMenu(){
    playButton.visible = false;
    player.visible = false;
    boss.visible = false;
    ground.visible = false;
    playerWeapon.visible=false
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
/*if (playerLevel === 2){
    playerHealth = 125;
    playerSpeed = 125;
    playerStrength = 125;
}
if (playerLevel === 3){
    playerHealth = 150;
    playerSpeed = 150;
    playerStrength = 150;
}*/
}
