(function (){
	let divExamples = document.getElementById('examples').children[12];
	let buttons = divExamples.getElementsByClassName('tab-pane')[7].getElementsByTagName('button');

	function project(){
		// Variables globales
		let cube;
		let acctions = [];
		const coords = document.createElement("span");
		const customEvent = new CustomEvent("event");	

		// Área para el proyecto
		let main = document.getElementsByTagName("main")[0];
		const area = document.createElement("div");
		area.classList.add("container");
		area.style.border = "2px solid black";
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

		// Evento de pulsado de tecla.
		document.addEventListener("keydown", function (event) {
			console.log(event.code);
			switch (event.code){ // Detección de tecla pulsada.
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
				case "Enter":
					executeAcctions();
					break;
				default:
					break;
			}
			event.preventDefault();
		});

		// Funciones de implementación de acciones
		function moveUp(cube){
			let top = cube.offsetTop;
			top -= 10;
			top = (top < 0)? 0 : top;
			cube.style.top = top + "px";
		}

		function moveDown(cube){
			let top = cube.offsetTop;
			top += 10;
			top = (top > area.offsetHeight - cube.offsetHeight)? area.offsetHeight - cube.offsetHeight : top;
			cube.style.top = top + "px";
		}

		function moveLeft(cube){
			let left = cube.offsetLeft;
			left -= 10;
			left = (left < 0)? 0 : left;
			cube.style.left = left + "px";
		}

		function moveRight(cube){
			let left = cube.offsetLeft;
			left += 10;
			left = (left > area.offsetWidth - cube.offsetWidth)? area.offsetWidth - cube.offsetWidth : left;
			cube.style.left = left + "px";
		}

		function randomColor(cube){
			let r = Math.floor((Math.random() * 256));
			let g = Math.floor((Math.random() * 256));
			let b = Math.floor((Math.random() * 256));
			cube.style.background = `rgb(${r}, ${g}, ${b})`;
		}

		function sizeUp(cube) {
			const up = cube.style.width;
			let size = +up.slice(0, 2);

			size += 5;
			cube.style.width = `${size}px`;
			cube.style.height = `${size}px`;
		}

		function sizeDown(cube) {
			const down = cube.style.width;
			let size = +down.slice(0, 2);

			// El tamaño cómo mínimo debe de ser de 10px.
			if(!(size <= 10)) {
				size = 10;
				cube.style.width = `${size}px`;
				cube.style.height = `${size}px`;
			}
		}

		// Registro de acción y generación de span
		function addAction(action){
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
				this.style.backgroundColor = "red";
				this.style.color = "white";
			});

			span.addEventListener("mouseleave", function () {
				this.style.backgroundColor = "white";
				this.style.color = "black";
			});

			span.addEventListener("keydown", function(event) {
				if(event.ctrlKey && event.key === "+"){
					cube.sizeUp();
				}
			});

			span.addEventListener("keydown", function(event) {
				if(event.ctrlKey && event.key === "+"){
					cube.sizeUp();
				}
			});

			span.addEventListener("click", function () {
				let index = acctions.findIndex((action) => {
					return action.span === this;
				});

				acctions.splice(index,1);
				this.remove();
			});

			area.appendChild(span);
		}

		// Ejecución de acciones recursiva
		function executeAcctions(){
			if(acctions.length > 0){
				let action = acctions.shift();
				for(const cube of cubes) {
					switch(action.action){
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
				}
			}
		}
	}

	buttons[0].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Proyecto');
		$$result.log('Funciones');
		$$result.log('Mover izquierda');
		$$result.log('Mover derecha');
		$$result.log('Mover arriba');
		$$result.log('Mover abajo');
		$$result.log('Cambiar color C');
		$$result.log('Ejecutar acciones ENTER');
		$$result.log('Borrar acción cliqueando en SPAN');
		project();
	});
})();

