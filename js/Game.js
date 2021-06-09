class Game
{
    constructor()
    {
    }
    getState() //read the gameState from the database
    {
        var gameStateRef = db.ref('gameState'); //referring to the child node gameState
        gameStateRef.on("value", function(data){gameState = data.val()})
    }
    updateState(state) // update the gameState in the database
    {
        db.ref('/').update({gameState: state}); //'/' refers to main database inside which gameState is created
    }
    async start()
    {
        if(gameState === 0)
        {
            player = new Player();
            var playerCountRef = await db.ref('playerCount').once("value"); //once is an asynchronous listener
            if(playerCountRef.exists())
            {
                playerCount = playerCountRef.val();
                player.getCount(); //setup a permanent listener
            }
            form = new Form();
            form.display();
        }
        car1 = createSprite(100, 400);
        car1.addImage("car1", car1Image);

        car2 = createSprite(300, 400);
        car2.addImage("car2", car2Image);

        car3 = createSprite(500, 400);
        car3.addImage("car3", car3Image);

        car4 = createSprite(700, 400);
        car4.addImage("car4", car4Image);

        cars = [car1, car2, car3, car4]; //array
    }
    play()
    {
        form.hideForm();
        textSize(30);
        text("Game Start", 120, 100);

        player.getPlayerInfo();                             

        if(allPlayers !== undefined)  
        {
            background("grey");
            image(trackImage, 0, -displayHeight*4, displayWidth, displayHeight*5);

            var index = 0;
            var x = 220;
            var y;
            var display_position = 130;

            for(var plr in allPlayers)   
            {
                index = index + 1;
                x = x + 220;
                y = displayHeight - allPlayers[plr].distance;

                cars[index-1].x = x;  
                cars[index-1].y = y;   

                if(index === player.index)
                {
                    cars[index-1].shapeColor= "red";
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index-1].y;
                }
                if(plr === "player" + player.index)
                    fill("red");
                else
                    fill("black");
               
                textSize(15);
                text(allPlayers[plr].name + ":" + allPlayers[plr].distance, 120, display_position);
                display_position = display_position + 20;
            }
        }

        if(keyIsDown(UP_ARROW))
        {
            player.distance = player.distance + 50;
            player.update();
        }

        if(player.distance>4000)
        {
            gameState = 2;
        }
    }

    end()
    {
        console.log("GAME ENDED");
    }
};