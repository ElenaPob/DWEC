(function (){
	let divExamples = document.getElementById('examples').children[12];
	let buttons = divExamples.getElementsByClassName('tab-pane')[6].getElementsByTagName('button');

	function testBubbling(){
		let categories = document.getElementById("categories");
		let divImages = categories.querySelectorAll(".cat-list-image");

		function getElement(event){
			this.style.border = "2px solid red";
			$$result.log("Target: " + event.target.nodeName + " Element: " + this.nodeName)
		}

		for (let div of divImages){
			div.firstElementChild.addEventListener("click", getElement);
			div.addEventListener("click", getElement);
		}
		categories.addEventListener("click", getElement);
		document.body.addEventListener("click", getElement);
		document.documentElement.addEventListener("click", getElement);
		document.addEventListener("click", () => {$$result.log("document")});
		window.addEventListener("click", () => {$$result.log("window")});

		//divImages[0].firstElementChild.click();
	}

	buttons[0].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Bubbling desde imágenes de categorías');
		$$result.log('Al cliquear en una categoría se genera un borde en cada uno de los ancestros hasta HTML.');
		$$result.log('Cada ancestro tiene asociado el manejador.');
		$$result.log('Los eventos se capturan de dentro hacía fuera.');
		testBubbling();
	});

	function testCapturing(){
		let categories = document.getElementById("categories");
		let divImages = categories.querySelectorAll(".cat-list-image");

		function getElement(event){
			this.style.border = "2px solid red";
			$$result.log("Target: " + event.target.nodeName + " Element: " + this.nodeName)
		}

		for (let div of divImages){
			div.firstElementChild.addEventListener("click", getElement, true);
			div.addEventListener("click", getElement, true);
		}
		categories.addEventListener("click", getElement, true);
		document.body.addEventListener("click", getElement, true);
		document.documentElement.addEventListener("click", getElement, true);
		document.addEventListener("click", () => {$$result.log("document")}, true);
		window.addEventListener("click", () => {$$result.log("window")}, true);

		//divImages[0].firstElementChild.click();
	}

	buttons[1].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Capturing desde imágenes de categorías');
		$$result.log('Al cliquear en una categoría se genera un borde en cada uno de los ancestros hasta HTML.');
		$$result.log('Cada ancestro tiene asociado el manejador.');
		$$result.log('Los eventos se capturan de fuera hacía dentro.');
		testCapturing();
	});

	function testCustomEvent(){
		let categories = document.getElementById("categories");
		let divImages = categories.querySelectorAll(".cat-list-image");

		function getElement(event){
			this.style.border = "2px solid red";
			$$result.log("Target: " + event.target.nodeName + " Element: " + this.nodeName);
			$$result.log("prop1: " + event.detail.prop1 + " prop2: " + event.detail.prop2);
		}

		for (let div of divImages){
			div.firstElementChild.addEventListener("myevent", getElement);
			div.addEventListener("myevent", getElement);
		}
		categories.addEventListener("myevent", getElement);
		document.body.addEventListener("myevent", getElement);
		document.documentElement.addEventListener("myevent", getElement);
		document.addEventListener("myevent", () => {$$result.log("document")});
		window.addEventListener("myevent", () => {$$result.log("window")});

		let myevent = new CustomEvent('myevent', {
			bubbles: true,
			detail: {
				prop1: 'value1',
				prop2: 'value2',
			},
		});

		divImages[0].firstElementChild.dispatchEvent(myevent);
	}

	buttons[2].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('Evento myevent');
		$$result.log('Definimos evento para que se propague y que reciba objeto concreto.');
		$$result.log('El evento se lanza desde la primera imagen de las categorías.');
		testCustomEvent();
	});

	function testStopPropagation(){
		let categories = document.getElementById("categories");
		let divImages = categories.querySelectorAll(".cat-list-image");

		function getElement(event){
			this.style.border = "2px solid red";
			$$result.log("Target: " + event.target.nodeName + " Element: " + this.nodeName)
		}

		for (let div of divImages){
			div.firstElementChild.addEventListener("click", getElement);
			div.addEventListener("click", getElement);
		}
		categories.addEventListener("click", getElement);
		document.body.addEventListener("click", (event) => {
			event.stopPropagation();
		});
		document.documentElement.addEventListener("click", getElement);
		document.addEventListener("click", () => {$$result.log("document")});
		window.addEventListener("click", () => {$$result.log("window")});

		//divImages[0].firstElementChild.click();
	}

	buttons[3].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('stopPropagation() con bubbling');
		$$result.log('Detenemos la propagación en BODY.');
		$$result.log('El evento se lanza desde la primera imagen de las categorías.');
		testStopPropagation();
	});

	function testStopPropagationV2(){
		let categories = document.getElementById("categories");
		let divImages = categories.querySelectorAll(".cat-list-image");

		function getElement(event){
			this.style.border = "2px solid red";
			$$result.log("Target: " + event.target.nodeName + " Element: " + this.nodeName)
		}

		for (let div of divImages){
			div.firstElementChild.addEventListener("click", getElement, true);
			div.addEventListener("click", getElement, true);
		}
		categories.addEventListener("click", getElement, true);
		document.body.addEventListener("click", (event) => {
			event.stopPropagation();
		}, true);
		document.documentElement.addEventListener("click", getElement, true);
		document.addEventListener("click", () => {$$result.log("document")}, true);
		window.addEventListener("click", () => {$$result.log("window")}, true);

		divImages[0].firstElementChild.click();
	}

	function testPreventDefault(){
		let links = document.querySelectorAll('#footer div.row div:nth-child(3) ul li a');
		for (let link of links){
			link.addEventListener("click", function(event){
				alert(this.innerText);
				event.preventDefault();
			})
		}
	}

	buttons[4].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold('preventDefault()');
		$$result.log('Enlaces de servicios lanzan alert pero no se produce el cambio de documento.');
		testPreventDefault();
	});

})();

