const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");
let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Winning combinations
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute("data-index");

    if (boardState[index] !== "" || !gameActive) {
        return;
    }

    updateCell(cell, index);
    checkWinner();
}

function updateCell(cell, index) {
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Current Player: ${currentPlayer}`;
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer === "X" ? "O" : "X"} Wins!`;
        gameActive = false;
        return;
    }

    if (!boardState.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }
}

function restartGame() {
    currentPlayer = "X";
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.textContent = `Current Player: ${currentPlayer}`;
    cells.forEach(cell => (cell.textContent = ""));
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
statusText.textContent = `Current Player: ${currentPlayer}`;
