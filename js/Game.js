class Game {
  constructor() {
    this.leaderBoardtitle = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
  }


  // read the gameState value from database
  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })
  }

  // updating the gameState in db
  update(state) {
    database.ref("/").update({
      gameState: state
    })
  }

  // starting the game and creating the car objs
  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 100, height / 4);
    car1.addImage("car1", car1_img);
    car1.scale = 0.1;

    car2 = createSprite(width / 2 + 100, height / 4);
    car2.addImage("car2", car2_img);
    car2.scale = 0.1;

    cars = [car1, car2];

    fuels = new Group();
    powerCoins = new Group();
    obstacles = new Group();

    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2 },
      { x: width / 2 - 150, y: height - 1300, image: obstacle1 },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1 },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2 },
      { x: width / 2, y: height - 2800, image: obstacle2 },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1 },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2 },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2 },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1 },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2 },
      { x: width / 2, y: height - 5300, image: obstacle1 },
      { x: width / 2 - 180, y: height - 5500, image: obstacle2 }
    ];

    // adding fuel sprite in the game
    this.addSprites(fuels, 4, fuelImg, 0.02);

    // adding powerCoin sprite in the game
    this.addSprites(powerCoins, 18, coin, 0.09);

    // adding obstaclessprite in the game
    this.addSprites(
      obstacles,
      obstaclesPositions.length,
      obstacle1,
      0.04,
      obstaclesPositions
    );
  }

  // creating function to add sprites
  addSprites(spritesGroup, numberofSprites, spritesImage, scale, position = []) {
    for (var i = 0; i < numberofSprites; i++) {
      var x, y;

      var sprite = createSprite(x, y);
      sprite.scale = scale;
      spritesGroup.add(sprite);
    }
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  play() {
    this.handleElements();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);
      var index = 0;

      for (var plr in allPlayers) {
        // add 1 to the index for every loop
        index = index + 1;

        // display cars x and y axis from database 
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        if (index === player.index) {
          stroke(10);
          fill("yellow");
          ellipse(x, y, 80, 80);
          // changing camera position in y axis
          camera.position.y = cars[index - 1].position.y
        }
      }
      this.handlePlayerControls();
      drawSprites();
    }
  }

  handlePlayerControls() {
    if (keyDown("UP_ARROW")) {
      player.positionY += 10;
      player.update();
    }
    if (keyDown("RIGHT_ARROW") && player.positionX < width / 2 + 270) {
      player.positionX += 5;
      player.update();
    }
    if (keyDown("LEFT_ARROW") && player.positionX > width / 2 - 300) {
      player.positionX -= 5;
      player.update();
    }
  }

  // handleFuel(index) {
  //   cars[index - 1].overlap(fuels, function (collector, collected)){
  //     player.fuel = 185;
  //     collected.remove();
  //   }
  // }

}
