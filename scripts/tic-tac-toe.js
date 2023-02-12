// const statusDisplay = document.querySelector('.status');

// let gameActive = true;
// let currentPlayer = "X";
// let flag;
// let gameState = ["", "", "", "", "", "", "", "", ""];
// let computer;

// const winningMessage = () => `Player ${currentPlayer} has won!`;
// const drawMessage = () => `Game ended in a draw!`;
// const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// statusDisplay.innerHTML = currentPlayerTurn();

// const winningConditions = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
// ];

// function handleCellPlayed(clickedCell, clickedCellIndex) {
//     gameState[clickedCellIndex] = currentPlayer;
//     clickedCell.innerHTML = currentPlayer; 
// }

// function computerPlay() {
//     flag = 1;

//     if(flag === 1) {
//         console.log("Computer play");
//     let random = Math.floor(Math.random() * 9);
//     let cell = document.querySelector(`[data-cell-index="${random}"]`);
//     if(gameState[random] === "") {
//         cell.innerHTML = computer;
//         gameState[random] = computer;
//         handleResultValidation();
//     }
//     else if(gameState[random] !== "") {
//         computerPlay();
//     }}
// }

    

// function handlePlayerChange() {

//     currentPlayer = currentPlayer === "X" ? "O" : "X";

//     if(currentPlayer === "X") {
//         //console.log(`It's, ${currentPlayer},'s turn`)
//         computer = "O";
//         statusDisplay.style.color = "rgb(255, 0, 0)";
//     }
//     // if(currentPlayer === "O") {
//     //     //console.log(`It's, ${currentPlayer},'s turn`)
//     //     computer = "X";
//     //     //computerPlay();
//     //     statusDisplay.style.color = "rgb(0,0,255)";
//     // }

//     computerPlay();

//     statusDisplay.innerHTML = currentPlayerTurn();
// }

// function handleResultValidation() {
//     console.log("Result validation");
//     let roundWon = false;
//     for (let i = 0; i <= 7; i++) {
//         const winCondition = winningConditions[i];
//         let a = gameState[winCondition[0]];
//         let b = gameState[winCondition[1]];
//         let c = gameState[winCondition[2]];
//         if (a === '' || b === '' || c === '') {
//             continue;
//         }
//         if (a === b && b === c) {
//             roundWon = true;
//             break
//         }
//     }

//     if (roundWon) {
//         statusDisplay.innerHTML = winningMessage();
//         gameActive = false;
//         statusDisplay.style.color = "rgb(251,100,204)";
//         return;
//     }

//     let roundDraw = !gameState.includes("");
//     if (roundDraw) {
//         statusDisplay.innerHTML = drawMessage();
//         gameActive = false;
//         statusDisplay.style.color = "rgb(251,100,204)";
//         return;
//     }

//     handlePlayerChange();
// }

// function handleCellClick(clickedCellEvent) {
//     const clickedCell = clickedCellEvent.target;
//     const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

//     if (gameState[clickedCellIndex] !== "" || !gameActive) {
//         return;
//     }
//     handleCellPlayed(clickedCell, clickedCellIndex);
//     handleResultValidation();
// }

// function handleRestartGame() {
//     gameActive = true;
//     currentPlayer = "X";
//     gameState = ["", "", "", "", "", "", "", "", ""];
//     statusDisplay.style.color = "rgb(65, 65, 65)";
//     statusDisplay.innerHTML = currentPlayerTurn();
//     document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
// }


// document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
// document.querySelector('.restart').addEventListener('click', handleRestartGame);

const statusDisplay = document.querySelector('.status');
const cpuWin = document.querySelector('.cpuWins');
const playerWin = document.querySelector('.playerWins');

let gameActive = true;
let currentPlayer = Math.random() < 0.5 ? "X" : "O";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;


statusDisplay.innerHTML = currentPlayerTurn();

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

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
  if (currentPlayer === "X") {
    computerPlay();
  }
}

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