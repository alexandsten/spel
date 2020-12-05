// Globala konstanter och variabler
var boardElem;			// Referens till div-element för "spelplanen"
const carImgs = ["car_up.png","car_right.png","car_down.png","car_left.png"];
						// Array med filnamn för bilderna med bilen
var carDir = 1;			// Riktning för bilen, index till carImgs
var carElem;			// Referens till img-element för bilen
const xStep = 5;		// Antal pixlar som bilen ska förflytta sig i x-led
const yStep = 5;		// eller y-led i varje steg
const timerStep = 20;	// Tid i ms mellan varje steg i förflyttningen
var timerRef = null;	// Referens till timern för bilens förflyttning
var startBtn;			// Referens till startknappen
var stopBtn;			// Referens till stoppknappen
/* === Tillägg i labben === */
var pigElem             //gris
var pigTimerRef = null;       // gris timer
const pigDuration = 4000;
var pigNr;
var hitCounter;
var pigNrElem;
var hitCounterElem;
// ------------------------------
// Initiera globala variabler och koppla funktion till knapp
function init() {
	// Referenser till element i gränssnittet
		boardElem = document.getElementById("board");
		carElem = document.getElementById("car");
		startBtn = document.getElementById("startBtn");
		stopBtn = document.getElementById("stopBtn");
	// Lägg på händelsehanterare
		document.addEventListener("keydown",checkKey);
			// Känna av om användaren trycker på tangenter för att styra bilen
		startBtn.addEventListener("click",startGame);
		stopBtn.addEventListener("click",stopGame);
	// Aktivera/inaktivera knappar
		startBtn.disabled = false;
		stopBtn.disabled = true;
	/* === Tillägg i labben === */
		pigElem = document.getElementById("pig");
		pigNrElem = document.getElementById("pigNr");
		hitCounterElem = document.getElementById("hitCounter");

} // End init
window.addEventListener("load",init);
// ------------------------------
// Kontrollera tangenter och styr bilen
function checkKey(e) {
	let k = e.key;
	switch (k) {
		case "ArrowLeft":
		case "z":
			carDir--; // Bilens riktning 90 grader åt vänster
			if (carDir < 0) carDir = 3;
			carElem.src = "img/" + carImgs[carDir];
			break;
		case "ArrowRight":
		case "-":
			carDir++; // Bilens riktning 90 grader åt höger
			if (carDir > 3) carDir = 0;
			carElem.src = "img/" + carImgs[carDir];
			break;
	}
} // End checkKey
// ------------------------------
// Initiera spelet och starta bilens rörelse
function startGame() {
	startBtn.disabled = true;
	stopBtn.disabled = false;
	carElem.style.left = "0px";
	carElem.style.top = "0px";
	carDir = 1;
	carElem.src = "img/" + carImgs[carDir];
	moveCar();
	/* === Tillägg i labben === */
	pigTimerRef = setTimeout(newPig,pigDuration);
	pigNr = 0;
	hitCounter = 0;
	pigNr.innerHTML = 0;
	hitCounter.innerHTML = 0;

} // End startGame
// ------------------------------
// Stoppa spelet
function stopGame() {
	if (timerRef != null) clearTimeout(timerRef);
	startBtn.disabled = false;
	stopBtn.disabled = true;
	/* === Tillägg i labben === */
	if (pigTimerRef != null) clearTimeout(pigTimerRef);
	document.getElementById("pig").style.display = "hidden";
} // End stopGame
// ------------------------------
// Flytta bilen ett steg framåt i bilens riktning
function moveCar() {
	let xLimit = boardElem.offsetWidth - carElem.offsetWidth;
	let yLimit = boardElem.offsetHeight - carElem.offsetHeight;
	let x = parseInt(carElem.style.left);	// x-koordinat (left) för bilen
	let y = parseInt(carElem.style.top);	// y-koordinat (top) för bilen
	switch (carDir) {
		case 0: // Uppåt
			y -= yStep;
			if (y < 0) y = 0;
			break;
		case 1: // Höger
			x += xStep;
			if (x > xLimit) x = xLimit;
			break;
		case 2: // Nedåt
			y += yStep;
			if (y > yLimit) y = yLimit;
			break;
		case 3: // Vänster
			x -= xStep;
			if (x < 0) x = 0;
			break;
	}
	carElem.style.left = x + "px";
	carElem.style.top = y + "px";
	timerRef = setTimeout(moveCar,timerStep);
	/* === Tillägg i labben === */
	

} // End moveCar
// ------------------------------

/* === Tillägg av nya funktioner i labben === */

function newPig() {	
	/* let xLimit = boardwidth-(pigwidth+20) = boardwidth-pigwidth-20; 
	let xLimit = boardwidth-(pigwidth+20);
	let yLimit = boardheight - pigheight - 20;
	let x = Math.floor(xLimit * Math.random()) + 10;
	let y = Math.floor(yLimit * Math.random()) + 10;
	let xLimit = boardwidth.offsetWidth - pigElem.offsetWidth-20; */
	let xLimit = boardElem.offsetWidth - pigElem.offsetWidth-20;
	let yLimit = boardElem.offsetHeight - pigElem.offsetHeight-20;
	let x = Math.floor(xLimit * Math.random()) + 10;
	let y = Math.floor(yLimit * Math.random()) + 10;
	pigElem.style.left = x + "px";
	pigElem.style.top = y + "px";
	document.getElementById("pig").src = "img/pig.png";
	pigElem.style.visibility = "visible";
	pigTimerRef = setTimeout(newPig,pigDuration);
	if (pigNr<10) {
		let xLimit = boardElem.offsetWidth - pigElem.offsetWidth-20;
	let yLimit = boardElem.offsetHeight - pigElem.offsetHeight-20;
	let x = Math.floor(xLimit * Math.random()) + 10;
	let y = Math.floor(yLimit * Math.random()) + 10;
	pigElem.style.left = x + "px";
	pigElem.style.top = y + "px";
	document.getElementById("pig").src = "img/pig.png";
	pigElem.style.visibility = "visible";
	pigTimerRef = setTimeout(newPig,pigDuration);
	pigNr++;
	pigNrElem = pigNr;
	}
	else {
		stopGame;
	}
}

function checkHit() {
	let cSize = carElem.offsetWidth;
	let pSize = pigElem.offsetWidth;
	let cL =  parseInt(carElem.style.left);
	let cT =  parseInt(carElem.style.top);
	let pL =  parseInt(pigElem.style.left);
	let pT =  parseInt(pigElem.style.top);
	if (cL+10 < pL+pSize && cL+cSize-10 > pL && cT+10 < pT+pSize && cT+cSize-10 > pT) {
		alert("Hello! I am an alert box!!");
		clearTimeout(pigTimerRef);
		document.getElementById("pig").src = "img/smack.png";
		pigTimerRef = setTimeout(newPig,pigDuration);
		hitCounter++;
		hitCounterElem = hitCounter;
	}
}