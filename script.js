// ===============================
// TIC TAC TOE GAME
// ===============================

// Board cells
const cells = document.querySelectorAll(".cell");

// Setup elements
const playerSetup = document.getElementById("playerSetup");
const startGameButton = document.getElementById("startGameButton");

const pvpButton = document.getElementById("pvpButton");
const computerButton = document.getElementById("computerButton");

const difficultySection = document.getElementById("difficultySection");

const playerONameBox = document.getElementById("playerONameBox");

const easyButton = document.getElementById("easyButton");
const mediumButton = document.getElementById("mediumButton");
const hardButton = document.getElementById("hardButton");

const playerXNameInput = document.getElementById("playerXName");
const playerONameInput = document.getElementById("playerOName");

// Game elements
const gameArea = document.getElementById("gameArea");

const displayPlayerX = document.getElementById("displayPlayerX");
const displayPlayerO = document.getElementById("displayPlayerO");

const turnText = document.getElementById("turnText");

const resultMessage = document.getElementById("resultMessage");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");

const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");

const newGameButton = document.getElementById("newGameButton");
const resetButton = document.getElementById("resetButton");


// ===============================
// GAME VARIABLES
// ===============================



let board = ["", "", "", "", "", "", "", "",""];

let currentPlayer = "X";

let gameOver = false;

let computerThinking = false;

// Player names
let playerXName = "";
let playerOName = "";
let gameMode = "pvp";

let difficulty = "easy";

// Scores
let scoreX = 0;
let scoreO = 0;


// ===============================
// WINNING COMBINATIONS
// ===============================

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];



// ===============================
// DIFFICULTY
// ===============================

easyButton.addEventListener("click", () => {

    difficulty = "easy";

    easyButton.classList.add("active");
    mediumButton.classList.remove("active");
    hardButton.classList.remove("active");
});


mediumButton.addEventListener("click", () => {

    difficulty = "medium";

    mediumButton.classList.add("active");
    easyButton.classList.remove("active");
    hardButton.classList.remove("active");
});


hardButton.addEventListener("click", () => {

    difficulty = "hard";

    hardButton.classList.add("active");
    easyButton.classList.remove("active");
    mediumButton.classList.remove("active");
});

// ===============================
// GAME MODE
// ===============================

pvpButton.addEventListener("click", () => {

    gameMode = "pvp";

    pvpButton.classList.add("active");
    computerButton.classList.remove("active");

    // Hide difficulty options
    difficultySection.classList.add("hidden");

    // Show Player 2 input
    playerONameBox.classList.remove("hidden");
});


computerButton.addEventListener("click", () => {

    gameMode = "computer";

    computerButton.classList.add("active");
    pvpButton.classList.remove("active");

    // Show difficulty options
    difficultySection.classList.remove("hidden");

    // Hide Player 2 input
    playerONameBox.classList.add("hidden");
});


// ===============================
// START GAME
// ===============================



startGameButton.addEventListener("click", () => {

    // Get names from input boxes
   playerXName = playerXNameInput.value.trim();

if (gameMode === "pvp") {
    playerOName = playerONameInput.value.trim();
} else {
    playerOName = "Computer";
}

    // Check whether names are entered
 if (playerXName === "") {

    alert("Please enter your name.");

    return;
}

if (gameMode === "pvp" && playerOName === "") {

    alert("Please enter Player 2's name.");

    return;
}

    // Display names in the game
    displayPlayerX.textContent = playerXName;
    displayPlayerO.textContent = playerOName;

    // Hide setup screen
    playerSetup.classList.add("hidden");

    // Show game
    gameArea.classList.remove("hidden");

    // Start with X
    currentPlayer = "X";

    gameOver = false;

    turnText.textContent = playerXName + "'s Turn (X)";
});


// ===============================
// CELL CLICK
// ===============================

cells.forEach((cell) => {

    cell.addEventListener("click", () => {

        const index = cell.getAttribute("data-index");

        // Don't allow moves after game ends
        if (gameOver || computerThinking) {
    return;
}

        // Don't allow already occupied cells
        if (board[index] !== "") {
            return;
        }

        // Put X or O on board
        board[index] = currentPlayer;

        // Display symbol
        cell.textContent = currentPlayer;

        // Add CSS class
        if (currentPlayer === "X") {

            cell.classList.add("x");

        } else {

            cell.classList.add("o");
        }

        // Check game result
        checkWinner();
    });
});


// ===============================
// CHECK WINNER
// ===============================

function checkWinner() {

    for (let combination of winningCombinations) {

        const [a, b, c] = combination;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            const winner = board[a];

            // Highlight winning cells
            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");

            // Update score
            if (winner === "X") {

                scoreX++;

                scoreXElement.textContent = scoreX;

                showResult(
                    playerXName + " Wins!",
                    "Congratulations " + playerXName + "! 🎉"
                );

            } else {

                scoreO++;

                scoreOElement.textContent = scoreO;

                showResult(
                    playerOName + " Wins!",
                    "Congratulations " + playerOName + "! 🎉"
                );
            }

            gameOver = true;

            return;
        }
    }


    // Check draw
    if (!board.includes("")) {

        showResult(
            "It's a Draw!",
            "Nobody wins this round. Try again!"
        );

        gameOver = true;

        return;
    }


    // Change player
    switchPlayer();

if (gameMode === "computer" && currentPlayer === "O" && !gameOver) {

    computerThinking = true;

    setTimeout(() => {

        computerMove();

        computerThinking = false;

    }, 500);
}
}


// ===============================
// SWITCH PLAYER
// ===============================

function switchPlayer() {

    if (currentPlayer === "X") {

        currentPlayer = "O";

        turnText.textContent = playerOName + "'s Turn (O)";

    } else {

        currentPlayer = "X";

        turnText.textContent = playerXName + "'s Turn (X)";
    }
}

function findWinningMove(player) {

    for (let i = 0; i < board.length; i++) {

        // Only check empty cells
        if (board[i] !== "") {
            continue;
        }

        // Temporarily place the player's symbol
        board[i] = player;

        let won = false;

        // Check all winning combinations
        for (let combination of winningCombinations) {

            const [a, b, c] = combination;

            if (
                board[a] === player &&
                board[b] === player &&
                board[c] === player
            ) {
                won = true;
                break;
            }
        }

        // Undo the temporary move
        board[i] = "";

        // If this position creates a win, return its index
        if (won) {
            return i;
        }
    }

    // No winning move found
    return -1;
}

function getRandomCorner() {

    const corners = [0, 2, 6, 8];

    const availableCorners = [];

    for (let corner of corners) {

        if (board[corner] === "") {
            availableCorners.push(corner);
        }
    }

    if (availableCorners.length === 0) {
        return -1;
    }

    const randomIndex =
        Math.floor(Math.random() * availableCorners.length);

    return availableCorners[randomIndex];
}

function evaluateBoard() {

    for (let combination of winningCombinations) {

        const [a, b, c] = combination;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            if (board[a] === "O") {
                return 10;
            }

            if (board[a] === "X") {
                return -10;
            }
        }
    }

    // No winner
    return 0;
}

function minimax(isMaximizing) {

    const score = evaluateBoard();

    // Computer wins
    if (score === 10) {
        return score;
    }

    // Player wins
    if (score === -10) {
        return score;
    }

    // Draw
    if (!board.includes("")) {
        return 0;
    }

    // Computer's turn
    if (isMaximizing) {

        let bestScore = -Infinity;

        for (let i = 0; i < board.length; i++) {

            if (board[i] === "") {

                // Try computer move
                board[i] = "O";

                const score = minimax(false);

                // Undo move
                board[i] = "";

                bestScore = Math.max(bestScore, score);
            }
        }

        return bestScore;
    }

    // Player's turn
    else {

        let bestScore = Infinity;

        for (let i = 0; i < board.length; i++) {

            if (board[i] === "") {

                // Try player move
                board[i] = "X";

                const score = minimax(true);

                // Undo move
                board[i] = "";

                bestScore = Math.min(bestScore, score);
            }
        }

        return bestScore;
    }
}

function findBestMove() {

    let bestScore = -Infinity;

    let bestMove = -1;

    for (let i = 0; i < board.length; i++) {

        if (board[i] === "") {

            // Try computer move
            board[i] = "O";

            // See how good this move is
            const score = minimax(false);

            // Undo the move
            board[i] = "";

            // Keep the best move
            if (score > bestScore) {

                bestScore = score;

                bestMove = i;
            }
        }
    }

    return bestMove;
}


function makeRandomComputerMove() {

    const emptyCells = [];

    for (let i = 0; i < board.length; i++) {

        if (board[i] === "") {
            emptyCells.push(i);
        }
    }

    if (emptyCells.length === 0) {
        return;
    }

    const randomIndex =
        Math.floor(Math.random() * emptyCells.length);

    makeComputerMove(emptyCells[randomIndex]);
}

function makeMediumComputerMove() {

    // Try to win
    const winningMove = findWinningMove("O");

    if (winningMove !== -1) {

        makeComputerMove(winningMove);

        return;
    }

    // Try to block the player
    const blockingMove = findWinningMove("X");

    if (blockingMove !== -1) {

        makeComputerMove(blockingMove);

        return;
    }

    // Take center
    if (board[4] === "") {

        makeComputerMove(4);

        return;
    }

    // Take a corner
    const cornerMove = getRandomCorner();

    if (cornerMove !== -1) {

        makeComputerMove(cornerMove);

        return;
    }

    // Otherwise random
    makeRandomComputerMove();
}

// ===============================
// COMPUTER MOVE
// ===============================
function computerMove() {

    if (difficulty === "easy") {

        makeRandomComputerMove();

    } else if (difficulty === "medium") {

        makeMediumComputerMove();

    } else if (difficulty === "hard") {

        const bestMove = findBestMove();

        if (bestMove !== -1) {

            makeComputerMove(bestMove);
        }
    }
}

function makeComputerMove(index) {

    board[index] = "O";

    cells[index].textContent = "O";

    cells[index].classList.add("o");

    checkWinner();
}

// ===============================
// SHOW RESULT
// ===============================

function showResult(title, message) {

    resultTitle.textContent = title;

    resultText.textContent = message;

    resultMessage.classList.add("show");
}


// ===============================
// NEW GAME
// ===============================

newGameButton.addEventListener("click", () => {

    // Clear board
    board = ["", "", "", "", "", "", "", "",""];

    // X starts again
    currentPlayer = "X";

    gameOver = false;

    computerThinking = false;


    // Clear cells
    cells.forEach((cell) => {

        cell.textContent = "";

        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.classList.remove("winner");
    });

    // Update turn
    turnText.textContent = playerXName + "'s Turn (X)";

    // Hide result
    resultMessage.classList.remove("show");
});


// ===============================
// RESET SCORE
// ===============================

resetButton.addEventListener("click", () => {

    // Reset scores
    scoreX = 0;
    scoreO = 0;

    scoreXElement.textContent = "0";
    scoreOElement.textContent = "0";

    // Clear board
    board = ["", "", "", "", "", "", "", "",""];

    currentPlayer = "X";

    gameOver = false;

    computerThinking = false;

    // Clear cells
    cells.forEach((cell) => {

        cell.textContent = "";

        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.classList.remove("winner");
    });

    // Update turn
    turnText.textContent = playerXName + "'s Turn (X)";

    // Hide result
    resultMessage.classList.remove("show");
});