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
var player, boss;

var bossHealth;
//var boss1,boss2,boss3,boss4,boss5;



function preload(){

}

function setup(){
createCanvas(1200,500);

player = createSprite(200,400,50,50);
player.shapeColor=("red");

boss = createSprite(1000,400,100,100);


ground = createSprite(200,500,2000,20);
ground.shapeColor=("purple")

pelletGroup = createGroup();

bossHealth = 100;
}

function draw(){ 
background("gray");
fill ("red")
text("Health: "+ bossHealth, 500,50);
if(keyDown("space")&& player.y >= 450) {
    player.velocityY = -12;
}

player.velocityY = player.velocityY + 0.8;
boss.velocityY = boss.velocityY + 0.8;

BossHealth0();

player.collide(ground);
boss.collide(ground);

spawnPellets();
playerControls();
Bossrun();


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
    
        bossHealth = bossHealth + 150;
       bossMode1=false;
       bossMode2=true;
       bossMode3=false;
       bossMode4=false;
       bossMode5=false;
    }
    if(bossMode2===true && bossHealth === 0){
        
        bossHealth = bossHealth + 200;
        bossMode1=false;
        bossMode2=false;
        bossMode3=true;
        bossMode4=false;
        bossMode5=false
     }
     if(bossMode3===true && bossHealth === 0){
         bossHealth = bossHealth + 250;
        bossMode1=false;
        bossMode2=false;
        bossMode3=false;
        bossMode4=true;
        bossMode5=false;
     }
     if(bossMode4===true && bossHealth === 0){
        bossHealth = bossHealth + 400;
       bossMode1=false;
       bossMode2=false;
       bossMode3=false;
       bossMode4=false;
       bossMode5=true;
    }
    if(bossMode5===true && bossHealth === 0){
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
        bossHealth = bossHealth + 500;
        bossMode6=false;
        bossMode7=true;
    }
    if(bossMode7===true && bossHealth === 0){
        bossHealth = bossHealth + 550;
        bossMode7=false;
        bossMode8=true;
    }
    if(bossMode8===true && bossHealth === 0){
        bossHealth = bossHealth + 600;
        bossMode8=false;
        bossMode9=true;
    }
    if(bossMode9===true && bossHealth === 0){
        bossHealth = bossHealth + 650;
        bossMode9=false;
        bossMode10=true;
    }
}
