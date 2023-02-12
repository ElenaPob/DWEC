"use strict";

// Variables globales
let area;
let cube;
let acctions = [];
let cubs;
let coords;
let cont = 0;

// Área para el proyecto
let main = document.getElementsByTagName("main")[0];
area = document.createElement("div");
area.classList.add("container");
area.style.border = "2px solid red";
area.style.height = "400px";
area.style.position = "relative";
main.parentElement.insertBefore(area, main);

// Coordenadas del proyecto
area.addEventListener("mouseenter", () => {
	coords = document.createElement("div");
	coords.classList.add("border");
	coords.classList.add("border-primary");
	coords.classList.add("p-2");
	coords.style.background = "#f5f5f5";
	coords.style.width = "150px";
	coords.style.position = "relative";
	area.appendChild(coords);
})
area.addEventListener("mousemove", (event) => {
	coords.style.top = (event.offsetY) + "px";
	coords.style.left = (event.offsetX) + "px";
	let str = "";
	str = "X: " + event.offsetY + " Y: " + event.offsetX;
	coords.innerHTML = str;
});
area.addEventListener("mouseleave", () => {
	coords.remove();
})

// Pieza que queremos mover
cube = document.createElement("div");
cube.style.background = "red";
cube.style.width = "50px";
cube.style.height = "50px";
cube.style.position = "absolute";
cube.style.top = "100px";
cube.style.left = "150px";
area.appendChild(cube);

area.addEventListener("click", (event) => {
	cubs = document.createElement("div");
	cubs.classList = "newC";
	cubs.style.background = cube.style.background;
	cubs.style.width = cube.style.width;
	cubs.style.height = cube.style.height;
	cubs.style.position = cube.style.position;
	cubs.addEventListener("click", borrado, false);
	cubs.style.top = event.offsetY + "px";
	cubs.style.left = event.offsetX + "px";
	cubs.innerHTML = ++cont;
	area.appendChild(cubs);
})
function borrado() {
	this.remove();
}

document.addEventListener("keydown", function (event) {
	console.log(event.code);
	switch (event.code) {
		case "ArrowUp":
			addAction("up");
			break;
		case "ArrowDown":
			addAction("down");
			break;
		case "ArrowLeft":
			addAction("left");
			break;
		case "ArrowRight":
			addAction("right");
			break;
		case "KeyC":
			addAction("color");
			break;
		case "BracketRight":
			addAction("add");
			break;
		case "Slash":
			addAction("slash");
			break;
		case "Enter": case "NumpadEnter":
			executeAcctions();
			break;
		default:
			break;
	}
	event.preventDefault();
});

function moveUp(cube) {
	let top = cube.offsetTop;
	top -= 10;
	top = (top < 0) ? 0 : top;
	cube.style.top = top + "px";
}
function moveDown(cube) {
	let top = cube.offsetTop;
	top += 10;
	top = (top > area.offsetHeight - cube.offsetHeight) ? area.offsetHeight - cube.offsetHeight : top;
	cube.style.top = top + "px";
}
function moveLeft(cube) {
	let left = cube.offsetLeft;
	left -= 10;
	left = (left < 0) ? 0 : left;
	cube.style.left = left + "px";
}
function moveRight(cube) {
	let left = cube.offsetLeft;
	left += 10;
	left = (left > area.offsetWidth - cube.offsetWidth) ? area.offsetWidth - cube.offsetWidth : left;
	cube.style.left = left + "px";
}

function randomColor(cube) {
	let r = Math.floor((Math.random() * 256));
	let g = Math.floor((Math.random() * 256));
	let b = Math.floor((Math.random() * 256));
	cube.style.background = `rgb(${r}, ${g}, ${b})`;
}

function sizeAdd(cube) {
	let w = cube.style.width;
	let size = +w.slice(0, 2);

	size += 5;
	cube.style.width = `${size}px`;
	cube.style.height = `${size}px`;
}

function sizeDown(cube) {
	let w = cube.offsetWidth;
	let h = cube.offsetHeight;

	if(w <= 10 && h <= 10) {
		w = 10;
		h = 10;
	} else {
		w -= 5;
		h -= 5;
	}
	cube.style.width = w + "px";
	cube.style.height = h + "px";
}

function addAction(action) {
	let span = document.createElement("span");
	acctions.push({
		action: action,
		span: span
	});
	span.textContent = action;
	span.style.padding = "10px";
	span.style.border = "1px solid #ddd";
	span.style.display = "block";
	span.style.float = "left";
	span.style.margin = "2px";
	span.style.cursor = "pointer";
	span.addEventListener("mouseenter", function () {
		this.style.background = "red";
		this.style.color = "white";
	})
	span.addEventListener("mouseleave", function () {
		this.style.background = "white";
		this.style.color = "black";
	})
	span.addEventListener("click", function () {
		let index = acctions.findIndex((action) => {
			return action.span === this;
		})
		acctions.splice(index, 1);
		this.remove();
	})
	area.appendChild(span);
}


function executeAcctions() {
	console.log("executeAcctions: " + acctions.length);
	if (acctions.length > 0) {
		let action = acctions.shift();
		switch (action.action) {
			case "up":
				moveUp(cube);
				break;
			case "down":
				moveDown(cube);
				break;
			case "left":
				moveLeft(cube);
				break;
			case "right":
				moveRight(cube);
				break;
			case "color":
				randomColor(cube);
				break;
			case "sizeUp":
				sizeUp(cube);
				break;
			case "sizeDown":
				sizeDown(cube);
				break;
			default:
				break;
		}
		
		action.span.remove();
		setTimeout(executeAcctions, 50);
	} else {
		console.log("No hay acciones");
	}
}
