class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Enter your name");
    this.playButton = createButton("Play");
    this.titleImg = createImg("./assets/title.png", "game title");
    this.greeting = createElement("h2");
    this.resetButton = createButton("reset");
  }

  setElementsPosition() {
    this.titleImg.position(120,50);
    this.input.position(width / 2 - 110, height / 2 - 80);
    this.playButton.position(width / 2 - 90, height / 2 - 20);
    this.greeting.position(width / 2 - 300, height / 2 - 100); 
    this.resetButton.position(width-100,20);
  }

  setElementsStyle() {
    this.titleImg.class("gameTitle");
    this.input.class("customInput");
    this.playButton.class("customButton");
    this.greeting.class("greeting");
  }

  hide() {
    this.greeting.hide();  
    this.playButton.hide();
    this.input.hide();
    this.titleImg.hide();
  }

  display() {
    this.setElementsPosition();
    this.setElementsStyle();
    this.handleMousePressed();
  }

  handleMousePressed(){
    this.playButton.mousePressed(() =>{
      this.input.hide();
      this.playButton.hide();
      var name = this.input.value();
      var message = " Hello " + name + " </br> Waiting for other Players to join...";
      this.greeting.html(message);
      playerCount +=1;
      player.name = this.input.value();
      player.index = playerCount;
      player.updateCount(playerCount)
      player.addPlayer();
    })

    this.resetButton.mousePressed(() =>{
     database.ref("/").set({
       playerCount:0,
       gameState:0,
       player:{}
     });
     window.location.reload();
      // player.updateCount(0);
      // game.update(0);
    })
  }
}
