//game status elements
const gameState = {
  board: [null, null, null, null, null, null, null, null, null],
  player1Name: "",
  player2Name: "",
  currentPlayer: "X",
  gameOver: false,
  winner: "",
  computer: "",
};

//Winning combos
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//Dom References
const board = document.getElementById("board");
const form = document.querySelector("form");
const player1Input = document.getElementById("player1Input");
const player2Input = document.getElementById("player2Input");
const winningMessage = document.getElementById("winningMessage");
const computerPlaysMessage = document.getElementById("computerPlaysMessage");
const restartButton = document.getElementById("restartButton");

//functions

//Board Rendering
function renderBoard() {
  for (let i = 0; i < gameState.board.length; i++) {
    const currValue = gameState.board[i];
    const currCell = document.getElementById(`${i}`);
    currCell.innerText = currValue;
  }
}

//Switch Marks
function switchMark() {
  let mark = gameState.currentPlayer;
  if (mark === "X") {
    gameState.currentPlayer = "O";
  } else {
    gameState.currentPlayer = "X";
  }
}

//reset the board
function restartBoard() {
  for (let i = 0; i < gameState.board.length; i++) {
    if (gameState.board[i] !== null) {
      gameState.board[i] = null;
      gameState.currentPlayer = "X";
      console.log(gameState);
    }
  }
  renderBoard();
}

//Check if the game is over by looping through the winning conditions and check if the selected cells match any winning condition
function checkWin(cellId) {
  for (let i = 0; i <= winningCombos.length - 1; i++) {
    let cellSelected = winningCombos[i];
    let cellA = gameState.board[cellSelected[0]];
    let cellB = gameState.board[cellSelected[1]];
    let cellC = gameState.board[cellSelected[2]];
    if (cellA !== null && cellA === cellB && cellB === cellC) {
      gameState.gameOver = true;
      console.log("Winner!");
      winningMessageDisplays(cellA);
      gameState.winner = cellA;
    }
  }
}

//Check Draw
function checkDraw() {
  let array = [];
  for (let i = 0; i < gameState.board.length; i++) {
    if (gameState.board[i] === null) {
      array.push(gameState.board[i]);
    }
  }
  if (array.length === 0) {
    console.log("Draw");
    gameState.gameOver = "Draw";
  }
}

//Winning Message
function winningMessageDisplays(cellA) {
  winningMessage.innerText = cellA + " won";
}

//determine if the computer is playing by checking the input string value in the playerNames
function whoIsPlaying() {
  if (gameState.player1Name === "" && gameState.player2Name === "") {
    startMessage.innerText = `Please enter at least one name.`;
  } else if (gameState.player1Name === "" || gameState.player2Name === "") {
    console.log("Computer is playing");
    startMessage.innerText = `Let's play with computer.`;
    gameState.computer = "Yes";
  } else {
    startMessage.innerText = `${gameState.player1Name} v.s. ${gameState.player2Name}.`;
  }
}

//computer plays

function computerMoves() {
  if (gameState.computer) {
    const emptyCells = [];
    for (let i = 0; i < gameState.board.length; i++) {
      if (gameState.board[i] === null) {
        emptyCells.push(i);
      }
    }
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cell = emptyCells[randomIndex];
    console.log("computer will mark with ", gameState.currentPlayer);
    gameState.board[cell] = gameState.currentPlayer;
    renderBoard();
    switchMark();
  }
}

//Event Listener

//Store the player's name to gameState when the name is submited
form.addEventListener("submit", function (event) {
  renderBoard();
  event.preventDefault();
  console.log(event.value);
  gameState.player1Name = player1Input.value;
  gameState.player2Name = player2Input.value;
  // console.log("gameState:", gameState);
  whoIsPlaying();
  player1Input.value = "";
  player2Input.value = "";
  console.log("gameState:", gameState);
});

//mark the selected cell with an X or O
//store Xs to index
// board.addEventListener("click", { once: true });
board.addEventListener("click", function (event) {
  const index = event.target.id;
  if (gameState.board[index] === null) {
    gameState.board[index] = gameState.currentPlayer;
  }
  renderBoard();
  switchMark();
  computerMoves();
  checkWin(event.target.id);
  checkDraw();
  console.log("gameState:", gameState);
});

restartButton.addEventListener("click", function (event) {
  restartBoard();
});
