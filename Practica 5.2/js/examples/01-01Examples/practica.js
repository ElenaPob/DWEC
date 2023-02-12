"use strict";

// Variables globales
let area;
let cube;
let acctions = [];
let newC;
let divInfo;
let cont = 0;
let tam = 10;

// Área para el proyecto
let main = $('.main');
area = $('<div></div>').css({
	border: '2px solid red',
	height: '400px',
	position: 'relative'
}).addClass('container');
main.prepend(area);

// Pieza que queremos mover
cube = $('<div></div>').css({
	background: "red",
	width: "50px",
	height: "50px",
	position: 'absolute',
	top: "100px",
	left: "150px",
}).addClass('cube');
area.append(cube);

// Coordenadas del proyecto
function showDimensions() {
	divInfo = $('<div></div>').css({
		background: '#f5f5f5',
		width: '150px',
		position: 'relative'
	}).addClass('border border-primary p-2');
	$(this).prepend(divInfo);
}

function moveDimensions(event) {
	let str = "";
	str = "X: " + event.offsetY + " Y: " + event.offsetX;

	divInfo.css({
		top: (event.offsetY) + "px",
		left: (event.offsetX) + "px"
	}).text(str);
}

function hideDimensions() {
	$(this).children().remove(':nth-child(1)');
}

cube = $('.cube');

function createCube(event) {
	newC = $('<div></div>').css({
		background: cube.css('background'),
		width: cube.css('width'),
		height: cube.css('height'),
		position: cube.css('position'),
		top: event.offsetY + "px",
		left: event.offsetX + "px"
	}).addClass('newC').text(++cont);
	area.append(newC);
	$(newC).on({
		click: deleteCube
	});
}

area.on({
	mouseenter: showDimensions,
	mousemove: moveDimensions,
	mouseleave: hideDimensions,
	click: createCube
});

function deleteCube() {
	tam = tam + 34;
	let part = $('<div></div>').css({
		padding: "10px",
		border: '1px solid #ddd',
		display: "block",
		float: "left",
		margin: '10px',
		position: 'absolute',
		top: '330px',
		cursor: 'pointer',
		left: tam + 'px'
	})
	$(this).remove();
	cont = -1;
	divInfo.remove();
}

function moveKey(event) {
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
		case "NumpadAdd": case "BracketRight":
			addAction("add");
			break;
		case "NumpadSubtract": case "Slash":
			addAction("slash");
			break;
		case "Enter": case "NumpadEnter":
			executeAcctions();
			break;
		default:
			break;
	}
	event.preventDefault();
}
$(document).on({
	keydown: moveKey
});

function moveUp(cube) {
	let top = cube.position().top;
	top -= 10;
	top = (top < 0) ? 0 : top;
	cube.css({
		top: top + "px"
	});
}

function moveDown(cube) {
	let top = cube.position().top;
	top += 10;
	top = (top > cube.parent().outerHeight() - cube.outerHeight()) ? cube.parent().outerHeight() - cube.outerHeight() : top;
	cube.css({
		top: top + "px"
	});
}

function moveLeft(cube) {
	let left = cube.position().left;
	left -= 10;
	left = (left < 0) ? 0 : left;
	cube.css({
		left: left + "px"
	});
}

function moveRight(cube) {
	let left = cube.position().left;
	left += 10;
	left = (left > cube.parent().outerWidth() - cube.outerWidth()) ? cube.parent().outerWidth() - cube.outerWidth() : left;
	cube.css({
		left: left + "px"
	});
}

function randomColor(cube) {
	let r = Math.floor((Math.random() * 256));
	let g = Math.floor((Math.random() * 256));
	let b = Math.floor((Math.random() * 256));
	cube.css({
		background: `rgb(${r}, ${g}, ${b})`
	});
}

function sizeAdd(cube) {
	let w = cube.outerWidth();
	let h = cube.outerHeight();
	
	w += 5;
	h += 5;
	

	cube.css({
		width: w + "px",
		height: h + "px",
	});
}

function sizeDown(cube) {
	let w = cube.outerWidth();
	let h = cube.outerHeight();

	if(w <= 10 && h <= 10) {
		w = 10;
		h = 10;
	} else {
		w -= 5;
		h -= 5;
	}

	cube.css({
		width: w + "px",
		height: h + "px",
	});
}

function addAction(action) {
	let span = $('<span></span>');
	acctions.push({
		action: action,
		span: span
	});
	span.css({
		padding: "10px",
		border: '1px solid #ddd',
		display: "block",
		float: "left",
		margin: '2px',
		cursor: 'pointer'
	}).addClass('span').text(action);

	function spanEnter() {
		$(this).css({
			background: "red",
			color: "white"
		});
	}

	function spanLeave() {
		$(this).css({
			background: "white",
			color: "black"
		});
	}

	function spanClick() {
		let index = acctions.findIndex((action) => {
			return action.span === $(this);
		})
		acctions.splice(index, 1);
		$(this).remove();
	}
	
	$('.span').on({
		mouseenter: spanEnter,
		mouseleave: spanLeave,
		click: spanClick
	});
	area.append(span);
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
