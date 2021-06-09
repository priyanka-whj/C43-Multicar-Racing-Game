var db;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;

var form, player, game;
var cars, car1, car2, car3, car4;
var trackImage, car1Image, car2Image, car3Image, car4Image, groundImage;

function preload()
{
    trackImage = loadImage("images/track.jpg");
    car1Image = loadImage("images/car1.png");
    car2Image = loadImage("images/car2.png");
    car3Image = loadImage("images/car3.png");
    car4Image = loadImage("images/car4.png");
    groundImage = loadImage("images/ground.png");

}

function setup() 
{
    createCanvas(displayWidth, displayHeight);

    db = firebase.database();

    game = new Game();
    game.getState();
    game.start();
}

function draw() 
{
    if(playerCount === 4)
    {
        game.updateState(1);
    }
    if(gameState === 1)
    {
        clear();
        game.play();
    }
    if(gameState === 2)
    {
        game.end();
    }
    drawSprites();
}





