const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const cellItems = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const end = document.getElementById('endGame');
const message = document.getElementById('message');
const buttonRestart = document.getElementById('buttonRestart');
const chk = document.getElementById('chk');
const ball = document.getElementById('ball');
const header = document.getElementById('header');
const aItems = document.querySelectorAll('.a');
const linkItems = document.querySelectorAll('.link');
const label = document.getElementById('label');
const footer = document.getElementById('footer');
const buttonPlayAgain = document.getElementById('buttonPlayAgain');
//const inlineFrame = document.getElementById('inlineFrame');
// ako je true, o je na redu, inace je x
let o_turn;



// toggle znaci da se ponasa kao prekidac, add('dark'), pa remove('dark')
chk.addEventListener('change', () => {
	document.body.classList.toggle('dark');
	ball.classList.toggle('move');
	header.classList.toggle('dark');
	aItems.forEach(a => { a.classList.toggle('dark') });
	linkItems.forEach(link => { link.classList.toggle('dark') });
	label.classList.toggle('dark');
	cellItems.forEach(cell => { cell.classList.toggle('dark') });
	buttonRestart.classList.toggle('dark');
	footer.classList.toggle('dark');
	message.classList.toggle('dark');
	buttonPlayAgain.classList.toggle('dark');
	//inlineFrame.classList.toggle('dark');
});

startGame();

buttonRestart.addEventListener('click', startGame);
buttonPlayAgain.addEventListener('click', startGame);



function startGame() {
	// once: true - mozemo samo jednom da kliknemo, svaki drugi put nista se nece desiti
	cellItems.forEach(cell => { cell.classList.remove('x')
								cell.classList.remove('o')
								cell.removeEventListener('click', funClicked)
								cell.addEventListener('click', funClicked, { once: true }) });
	o_turn = false;
	setCellHoverClass(); // postavim da je x na pocetku igre kada prislonim misa
	end.classList.remove('show');
}

// kada kliknemo, moramo upisati znak, proveriti da li je neko pobedio, promeniti igraca i ispisati sledeci znak kada se prisloni mis
function funClicked(e) {
	const cell = e.target;
	const currentClass = o_turn ? 'o' : 'x';
	drawElement(cell, currentClass);
	if (checkWinner(currentClass)) // ako imamo pobednika
		endGame(false); // nije nereseno
	else if (isDraw()) // ako je nereseno
		endGame(true);
	else // inace nije kraj igre
	{
		switchTurn();
		setCellHoverClass();
	}
}

function drawElement(cell, currentClass) {
	cell.classList.add(currentClass);
}

/* ako za bilo koju pobednicku kombinaciju vazi da svaka od tri celije sadrzi istu klasu, imamo pobednika */
function checkWinner(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
										return combination.every(index => {
																	return cellItems[index].classList.contains(currentClass)
																})
									})
}

// proveravamo da li svaka cell ima neku svoju klasu
function isDraw() {
	return [...cellItems].every(cell => {
									return cell.classList.contains('x') || cell.classList.contains('o')
									});
}

function switchTurn() {
	o_turn = !o_turn;
}

function setCellHoverClass() {
	board.classList.remove('x');
	board.classList.remove('o'); // ovo ne moramo kod cell uklanjati, zato sto cell sadrzi samo jednu klasu x ili o
	if (o_turn)
		board.classList.add('o');
	else
		board.classList.add('x');
}

function endGame(result) {
	// formiram poruku
	if (result) // nereseno
		message.innerText = "Draw!";
	else
		message.innerText = `${o_turn ? "O" : "X"} Wins!`;
	end.classList.add('show');
}










