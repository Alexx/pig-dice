//-----------Business Logic-------------
const WinningScore = 10;

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
  this.diceRolled = [];
  this.currentScore = 0;
  this.totalScore = 0;

};

//---------------GAME-----------------

function playTurn(gamerGroup) {
  var gamer = gamerGroup.gamers[gamerGroup.currentGamer];
  $("#nameOutput").text(gamer.name + " is currently playing")
  var currentRoll = rollDice();
  console.log("Current Dice Roll: " + currentRoll);
  if(currentRoll === 1) {
    gamer.currentScore = 0;
    gamer.diceRolled = [];
    changeTurn(gamerGroup);
  } else {
    gamer.currentScore += currentRoll;
    gamer.diceRolled.push(currentRoll);
    $("#diceOutput").text(gamer.diceRolled);
  }
}

function hold(gamerGroup) {
  changeTurn(gamerGang);
  var gamer = gamerGroup.gamers[gamerGroup.currentGamer];
  $("#nameOutput").text(gamer.name + " is currently playing")
  $("#diceOutput").text(gamer.diceRolled);
  gamer.totalScore += gamer.currentScore;
  gamer.currentScore = 0;

  console.log("Current Gamers Total Score: " + gamer.totalScore, "Current Gamers Current Score: " + gamer.currentScore + "current gamer " + gamer.name);

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
  console.log(gamer.name + " is the winner");

  reset(gamerGroup);
};

//restarts game
function reset(gamerGroup) {
  gamerGroup.gamers.forEach(function(player) {
    player.diceRolled = [];
    player.totalScore = 0;
    player.currentScore = 0;
  });

};

function isGameRunning(gamerGroup) {
    if(gamerGroup.gamers[gamerGroup.currentGamer].totalScore + gamerGroup.gamers[gamerGroup.currentGamer].currentScore < WinningScore) {
      return true;
    } else {
      console.log("game end");
      endGame(gamerGroup);
      return false;
    }
}

//------------User Interface--------------
$(document).ready(function(){
  var gamerGang = new Game;
  $("#gamerForm").submit(function(event) {
    event.preventDefault();
    var playerName = $("#newPlayer").val();
    newPlayer = new Gamer(playerName);
    gamerGang.addPlayer(newPlayer);
    console.log(gamerGang);
  });

  $("#roll").click(function() {
    if(isGameRunning(gamerGang)) {
      playTurn(gamerGang);
    }

  });
  $("#hold").click(function() {
    if(isGameRunning(gamerGang)) {
      hold(gamerGang);
    }
  });

  // while (gamerGang.gamers[0].totalScore < 10 && gamerGang.gamers[1].totalScore < 10) {
    //
    // }

  });
