var ground;
var pellet, pelletGroup;
var player, boss;
var bossRun1;
var bossHealth;
var boss1,boss2,boss3,boss4,boss5;

var bossMode1=true;
var bossMode2=false;
var bossMode3=false;
var bossMode4=false;
var bossMode5=false;

function preload(){

}

function setup(){
createCanvas(1200,500);

player = createSprite(200,400,50,50);
player.shapeColor=("red");

boss = createSprite(1000,400,100,100);
boss.shapeColor=("blue");

ground = createSprite(200,500,2000,20);
ground.shapeColor=("purple")

pelletGroup = createGroup();

bossHealth = 100;
}

function draw(){ 
background("gray");
if(keyDown("space")&& player.y >= 450) {
    player.velocityY = -12;
}
if(bossMode1=true && bossHealth === 0){
   boss2Change();
}
if(bossMode2=true && bossHealth === 0){
    boss3Change();
 }
player.velocityY = player.velocityY + 0.8;
boss.velocityY = boss.velocityY + 0.8;



player.collide(ground);
boss.collide(ground);

spawnPellets();
playerControls();



drawSprites();
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
    bossHealth = bossHealth - 100;
    pelletGroup.collide(boss);
    pelletGroup.destroyEach();
}

}

function boss2Change(){
    boss.shapeColor=("yellow");
    bossHealth = 150;
    bossMode1=false
    bossMode2=true
}

function boss3Change(){
    boss.shapeColor=("red");
    bossHealth = 200;
    bossMode2=false
    bossMode3=true
}
