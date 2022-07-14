const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winnerMessageElement = document.getElementById("winner-message");
const winnerMessageText = document.querySelector("[winner-message-text]");
const restart = document.getElementById("restart-btn");
let oTurn;

window.onload = startGame();

function startGame() {
	oTurn = false;
	cellElements.forEach((cell) => {
		cell.classList.remove(X_CLASS);
		cell.classList.remove(O_CLASS);
		cell.removeEventListener("click", handleClick);
		cell.addEventListener("click", handleClick, { once: true });
	});
	setBoardHoverClass();
	winnerMessageElement.classList.remove("show");
}

function endGame(draw) {
	if (draw) {
		winnerMessageText.innerText = "Draw!";
	} else {
		winnerMessageText.innerText = `Player ${oTurn ? "O" : "X"} Wins!`;
	}
	winnerMessageElement.classList.add("show");
}

function isDraw() {
	return [...cellElements].every((cell) => {
		return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
	});
}

function handleClick(e) {
	const cell = e.target;
	const currentClass = oTurn ? O_CLASS : X_CLASS;
	placeMark(cell, currentClass);
	if (checkWin(currentClass)) {
		endGame(false);
	} else if (isDraw()) {
		endGame(true);
	} else {
		swapTurns();
		setBoardHoverClass();
	}
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

function swapTurns() {
	oTurn = !oTurn;
}

function setBoardHoverClass() {
	board.classList.remove(X_CLASS);
	board.classList.remove(O_CLASS);
	if (oTurn) {
		board.classList.add(O_CLASS);
	} else {
		board.classList.add(X_CLASS);
	}
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some((combination) => {
		return combination.every((index) => {
			return cellElements[index].classList.contains(currentClass);
		});
	});
}

restart.addEventListener("click", startGame);
