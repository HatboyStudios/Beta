//this is a concept menu for the player menu before you start the battle
// to see what you can do
var NULL = 0;
var PLAYEREDIT = 1;
var NEWCHARACTER = 2;
var playerState = NULL

var playerVisual, editButton, newCharacterButton, playButton,returnButton;

function setup(){
  createCanvas(1200,500);

  playerVisual = createSprite(200,300);
  playerVisual.shapeColor=("red");

  editButton = createSprite(500,100, 100, 75);
  editButton.shapeColor=("blue");

  newCharacterButton = createSprite(500,200, 100, 75);
  newCharacterButton.shapeColor=("yellow");

  playButton = createSprite(500, 300, 100, 75);
  playButton.shapeColor=("green");

  returnButton = createSprite(500, 400, 100, 75);
  returnButton.shapeColor=("purple");
}

function draw(){
  background("gray");

  drawSprites();
}