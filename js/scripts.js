//-----------Business Logic-------------
const WinningScore = 100;

//-----------Contructors-------------

function Game() {
  this.gamers = [];
  this.currentGamer = 0;
}

Game.prototype.addPlayer = function(gamer) {
  this.gamers.push(gamer);
}

function Gamer(name) {
  this.name = name;
  this.diceRolled = [];
  this.currentScore = 0;
  this.totalScore = 0;

};

//---------------GAME FUNCTIONS-----------------

function checkPlayers(gamerGroup) {
  if(gamerGroup.gamers.length >= 1) {
    $(".errorOutput").text("")
    startGame(gamerGroup);
  } else {
    $(".errorOutput").text("Add a player!")
  }
}

function startGame(gamerGroup) {
  $(".hiddenGame").show();
  $(".inputGamer").hide();
  displayInformation(gamerGroup)
}

function resetGame(gamerGroup) {
  reset(gamerGroup)
  $(".hiddenGame").hide();
  $(".inputGamer").show();
}

function rollDice() {
  return Math.floor(Math.random() * (7 - 1) + 1);
}

function playTurn(gamerGroup) {
  $("#rolledOneOutput").text("");
  var gamer = gamerGroup.gamers[gamerGroup.currentGamer];
  var currentRoll = rollDice();
  if(currentRoll === 1) {
    gamer.currentScore = 0;
    gamer.diceRolled = [];
    $("#rolledOneOutput").text("YOU ROLLED A ONE LOSER");
    displayInformation(gamerGroup);
    changeTurn(gamerGroup);
  } else {
    gamer.currentScore += currentRoll;
    gamer.diceRolled.push(currentRoll);
    displayInformation(gamerGroup);
  }
}

function changeTurn(gamerGroup) {
  var currentGamer = gamerGroup.currentGamer;
  if(currentGamer + 1 === gamerGroup.gamers.length){
    gamerGroup.currentGamer = 0;
  } else {
    gamerGroup.currentGamer += 1;
  }
}

function hold(gamerGroup) {
  var gamer = gamerGroup.gamers[gamerGroup.currentGamer];
  gamer.totalScore += gamer.currentScore;
  gamer.currentScore = 0;
  changeTurn(gamerGroup);
  displayInformation(gamerGroup);
}

function reset(gamerGroup) {
  gamerGroup.gamers.forEach(function(player) {
    player.diceRolled = [];
    player.totalScore = 0;
    player.currentScore = 0;
  });
};

function displayInformation(gamerGroup) {
  var gamer = gamerGroup.gamers[gamerGroup.currentGamer];
  $("#diceOutput").text(gamer.diceRolled);
  if(isPlayerWinner(gamerGroup)) {
    reset(gamerGroup);
    $("#nameOutput").text(gamer.name + " is the Winnner!!!");
    $("#totalScoreOutput").text("Total Score: " + gamer.totalScore);
    $("#currentScoreOutput").text("Current Score: " + gamer.currentScore);
  } else {
    $("#nameOutput").text(gamer.name + " is currently playing");
    $("#totalScoreOutput").text("Total Score: " + gamer.totalScore);
    $("#currentScoreOutput").text("Current Score: " + gamer.currentScore);
  }
  displayGamers(gamerGroup);
}

function displayGamers(gamerGroup) {
  var gamerCards = $("#gamerCards div");
  var htmlForCards = "";

  gamerGroup.gamers.forEach(function(gamer) {
    console.log(gamer);
    htmlForCards += "<div class='col-md-4'>" +
    "<div class='card' style='width: 18rem;'> <img class='card-img-top' src='img/skeletor.jpeg' alt=''><div class='card-body'><p> Total Score: " + gamer.totalScore + "</p><div class='card-footer'>" + gamer.name + "</div></div></div></div>";
  });
  gamerCards.html(htmlForCards);
}

function isPlayerWinner(gamerGroup) {
  if(gamerGroup.gamers[gamerGroup.currentGamer].totalScore + gamerGroup.gamers[gamerGroup.currentGamer].currentScore >= WinningScore) {
    reset(gamerGroup);
    return true;
  } else {
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
    $("#newPlayer").val('');
  });

  $("#resetButton").click(function() {
    resetGame(gamerGang);
  });

  $("#startButton").click(function() {
    checkPlayers(gamerGang);
    displayGamers(gamerGang);
  });

  $("#roll").click(function() {
    playTurn(gamerGang);
  });

  $("#hold").click(function() {
    hold(gamerGang);
  });

});
