const board = document.getElementById('board');
let currentPlayer = 'X';
let moves = 0;
let gameEnded = false;

function handleCellClick(event) {
    if (gameEnded || event.target.textContent !== '') {
        return;
    }
    event.target.textContent = currentPlayer;
    moves++;

    if (checkWinner(currentPlayer)) {
        displayResult(`${currentPlayer} wins!`);
        gameEnded = true;
    } else if (moves === 9) {
        displayResult("It's a draw!");
        gameEnded = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function createGameBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function checkWinner(player) {
    const cells = document.querySelectorAll('.cell');
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];
    return winningCombinations.some(combination =>
        combination.every(index => cells[index].textContent === player)
    );
}

function displayResult(message) {
    const resultDisplay = document.createElement('div');
    resultDisplay.innerText = message;
    resultDisplay.classList.add('result');
    board.parentElement.appendChild(resultDisplay);
}

