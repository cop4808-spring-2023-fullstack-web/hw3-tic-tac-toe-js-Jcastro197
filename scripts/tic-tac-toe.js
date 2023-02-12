//elements selected from the DOM 
const statusDisplay = document.querySelector('.status');
const cpuWin = document.querySelector('.cpuWins');
const playerWin = document.querySelector('.playerWins');

//game variables 
let gameActive = true;
//this lets currentplayer be randomly selected
let currentPlayer = Math.floor(Math.random()) < 0.5 ? "X" : "O";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;


statusDisplay.innerHTML = currentPlayerTurn();
//is the counter for the wins
cpuWin.innerHTML = `CPU Wins: 0`;
playerWin.innerHTML = `Player Wins: 0`;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

//changed this function to handle the computer playing
function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
  if (currentPlayer === "X") {
    computerPlay();
  }
}

//changed this function to handle the computer playing
//also added the counter for the wins

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    if (currentPlayer === "X") {
        cpuWin.innerHTML = `CPU Wins: ${parseInt(cpuWin.innerHTML.split(" ")[2]) + 1}`;
    } else {
        playerWin.innerHTML = `Player Wins: ${parseInt(playerWin.innerHTML.split(" ")[2]) + 1}`;
    }
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function computerPlay() {
  let emptyCells = [];
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === "") {
      emptyCells.push(i);
    }
  }
  if (emptyCells.length === 0) {
    return;
  }
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const cellIndex = emptyCells[randomIndex];
  const cell = document.querySelector(`[data-cell-index="${cellIndex}"]`);
  handleCellPlayed(cell, cellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = Math.random() < 0.5 ? "X" : "O";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);