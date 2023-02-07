(function (){
	let divExamples = document.getElementById('examples').children[12];
	let buttons = divExamples.getElementsByClassName('tab-pane')[5].getElementsByTagName('button');

	function testEventV1() {
		let button = document.getElementById("button");
		button.onclick = function (event) {
			alert("Identificador: " + event.target.id + " Tipo: " + event.type);
		}
	}

	buttons[0].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('event.target');
		$$result.log('Botón ver artículo');
		testEventV1();
	});

	function testEventV2() {
		let categories = document.getElementById("categories");
		categories.addEventListener("click", function (event) {
			alert("this: " + this.id + " target: " + event.target.nodeName);
		});
	}

	buttons[1].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('this vs target');
		$$result.log('Cliquear en categorías');
		testEventV2();
	});

	function testMouseEvent() {
		let banner = document.querySelector(".banner");
		let div = document.createElement("div");
		div.id = "references";
		banner.appendChild(div);
		banner.addEventListener("click", function (event) {
			let str = "";
			str = "offsetX: " + event.offsetX + " offsetY: " + event.offsetY + "<br>";
			str += "clientX: " + event.clientX + " clientY: " + event.clientY + "<br>";
			str += "pageX: " + event.pageX + " pageY: " + event.pageY + "<br>";
			str += "screenX: " + event.screenX + " screenY: " + event.screenY + "<br>";
			div.innerHTML = str;
		});
	}

	buttons[2].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Evento click');
		$$result.log('Cliquear en categorías');
		testMouseEvent();
	});

	function testMouseEventV2() {
		let categories = document.getElementById("categories");
		let divImages = categories.querySelectorAll(".cat-list-image");
		function showDimensions(event) {
			let dimensionsDiv = document.createElement("div");
			dimensionsDiv.classList.add("border");
			dimensionsDiv.classList.add("border-primary");
			dimensionsDiv.classList.add("p-2");
			dimensionsDiv.style.background = "#f5f5f5";
			dimensionsDiv.style.width = "150px";
			dimensionsDiv.style.position = "absolute";
			dimensionsDiv.style.top = event.offsetY + "px";
			dimensionsDiv.style.left = event.offsetX + "px";
			let str = "offsetWidth: " + this.offsetWidth + "<br>" + "offsetHeight: " + this.offsetHeight;
			dimensionsDiv.innerHTML = str;
			this.appendChild(dimensionsDiv);
		}

		function hideDimensions(event) {
			this.children[1].remove();
		}

		function moveDimensions(event) {
			this.children[1].style.top = (event.offsetY + 10) + "px";
			this.children[1].style.left = (event.offsetX + 10) + "px";
		}

		for (let div of divImages) {
			div.style.position = "relative";
			div.addEventListener("mouseenter", showDimensions);
			div.addEventListener("mousemove", moveDimensions);
			div.addEventListener("mouseleave", hideDimensions);
		}
	}

	buttons[3].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Eventos mouseenter, mouseleave y mousemove');
		$$result.log('Capa flotante en imágenes de categorías');
		testMouseEventV2();
	});

	function testMouseEventV3() {
		document.body.addEventListener("mouseover", function (event){
			event.target.classList.add("border");
			event.target.classList.add("border-danger");
		});

		document.body.addEventListener("mouseout", function (event){
			event.target.classList.remove("border");
			event.target.classList.remove("border-danger");
		});
	}

	buttons[4].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Eventos mouseover y mouseout');
		$$result.log('Evento en body para mostrar borde en cada uno de sus descendientes.');
		testMouseEventV3();
	});

	function testFocus(){
		let input = document.querySelector("input[name = 'email']");
		input.addEventListener("focus",function(){
			let div = document.createElement("div");
			input.parentElement.appendChild(div);
			div.innerText = "Introduce un correo electrónico.";
		});
		input.addEventListener("blur",function(){
			input.nextElementSibling.nextElementSibling.remove();
		});
	}

	buttons[5].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Eventos focus y blur');
		$$result.log('Muestra mensaje en caja de texto del botón de suscripción.');
		testFocus();
	});

	function testKeyEventV1() {
		let input = document.querySelector("input[name = 'email']");
		let div = document.createElement("div");
		input.parentElement.appendChild(div);
		input.focus();

		input.addEventListener("keydown", function (event) {
			this.parentElement.appendChild(
				document.createTextNode(`${event.key}(${event.code}) `)
			);
			this.normalize();
		});
	}

	buttons[6].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Evento keydown');
		$$result.log('Muestra teclas pulsadas en caja de texto del botón de suscripción.');
		testKeyEventV1();
	});

	function testKeyEventV2() {
		let categories = document.getElementById("categories");
		let divImages = categories.querySelectorAll(".cat-list-image");

		document.addEventListener("keydown", function (event) {
			if (event.altKey) {
				if (event.code.indexOf("Numpad") > -1 ||
					event.code.indexOf("Digit") > -1) {
					let number = (event.code.length === 7) ?
						event.code.substring(6) :
						event.code.substring(5);
					number = +number;
					if (number < divImages.length && divImages[number].children.length < 2) {
						let dimensionsDiv = document.createElement("div");
						dimensionsDiv.classList.add("border");
						dimensionsDiv.classList.add("border-primary");
						dimensionsDiv.classList.add("p-2");
						dimensionsDiv.style.background = "#f5f5f5";
						dimensionsDiv.style.width = "150px";
						dimensionsDiv.style.position = "absolute";
						dimensionsDiv.style.top = 0 + "px";
						dimensionsDiv.style.left = 0 + "px";
						let str = "offsetWidth: " + divImages[number].offsetWidth + "<br>" + "offsetHeight: " + divImages[number].offsetHeight;
						dimensionsDiv.innerHTML = str;

						divImages[number].style.position = "relative";
						divImages[number].appendChild(dimensionsDiv);
					}
				}
			}
		});

		document.addEventListener("keyup", function (event) {
			if (event.altKey) {
				if (event.code.indexOf("Numpad") > -1 ||
					event.code.indexOf("Digit") > -1) {
					let number = (event.code.length === 7) ?
						event.code.substring(6) :
						event.code.substring(5);
					number = +number;
					if (number < divImages.length) {
						divImages[number].children[1].remove();
					}
				}
			}
		});
	}

	buttons[7].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Evento keydown');
		$$result.log('Muestra capa en cada imágen al pulsar alt + Nº de imágen.');
		testKeyEventV2();
	});

})();

