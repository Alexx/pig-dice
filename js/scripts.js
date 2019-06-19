//-----------Business Logic-------------
function Game() {
  this.gamers = [];
  this.currentGamer = 0;
  this.currentID = 0;
}

Game.prototype.addPlayer = function(gamer) {
  gamer.id = this.assignID();
  this.gamers.push(gamer);
}

Game.prototype.assignID = function() {
  this.currentID += 1;
  return this.currentID;
}

function Gamer(name) {
  this.name = name;
  this.currentScore = 0;
  this.totalScore = 0;

};

//---------------GAME-----------------

function pigDice(gamerGroup) {
  while (gamerGroup.gamers[0].totalScore < 100 && gamerGroup.gamers[1].totalScore < 100) {

  }
}

function playTurn(gamerGroup) {
  var gamer = gamerGroup.gamers[gamerGroup.currentGamer];
  var currentRoll = rollDice();
  console.log(currentRoll);
  if(currentRoll === 1) {
    gamer.currentScore = 0;
    changeTurn(gamerGroup);
  } else {
    gamer.currentScore += currentRoll;
  }
}

function hold(gamerGroup) {
  var gamer = gamerGroup.gamers[gamerGroup.currentGamer];
  console.log(gamer.totalScore, gamer.currentScore);
  gamer.totalScore += gamer.currentScore;
  gamer.currentScore = 0;
  console.log(gamer.totalScore);
  changeTurn(gamerGroup);
}

function rollDice() {
  return Math.floor(Math.random() * (7 - 1) + 1);
}

function changeTurn(gamerGroup) {
  var currentGamer = gamerGroup.currentGamer;
  if(currentGamer + 1 === gamerGroup.gamers.length){
    gamerGroup.currentGamer = 0;
  } else {
    gamerGroup.currentGamer += 1;
  }
}



//-----------------------------

//shows winner, score and resets all scores to 0
function endGame(gamerGroup) {
  var gamer = gamerGroup.gamers[gamerGroup.currentGamer];
  console.log(gamer.name);

  reset(gamerGroup);
};


//restarts game
function reset(gamerGroup) {
  gamerGroup.gamers.forEach(function(player) {
    player.totalScore = 0;
    player.currentScore = 0;
  });

};

function isGameRunning(gamerGroup) {
  if(gamerGroup.gamers[0].totalScore + gamerGroup.gamers[0].currentScore < 10 && gamerGroup.gamers[1].totalScore + gamerGroup.gamers[0].currentScore < 10 ) {
    console.log(gamerGroup.gamers[0].totalScore);
    return true;
  } else {
    console.log("game end");
    return false;
  }
}





//------------User Interface--------------
$(document).ready(function(){
  var gamerGang = new Game;
  var gamer1 = new Gamer("Jake");
  var gamer2 = new Gamer("Alex");
  gamerGang.addPlayer(gamer1);
  gamerGang.addPlayer(gamer2);
  console.log(gamerGang);

  $("#roll").click(function() {
    if (isGameRunning(gamerGang)) {
      playTurn(gamerGang);
    }

  });
  $("#hold").click(function() {
    if (isGameRunning(gamerGang)) {
      hold(gamerGang);
    }
  });

  // while (gamerGang.gamers[0].totalScore < 10 && gamerGang.gamers[1].totalScore < 10) {
    //
    // }

  });
