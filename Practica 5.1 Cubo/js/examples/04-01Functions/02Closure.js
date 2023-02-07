'use strict';
(function (){
	let divExamples = document.getElementById('examples').children[6];
	let buttons = divExamples.getElementsByClassName('tab-pane')[1].getElementsByTagName('button');

	function greetingV3() {
		let message = "Hello";
		let sayHi = function hi() {
			$$result.log(message);
		};
		sayHi(); // Hello
	}

	function greetingV4() {
		let sayHi = function hi() {
			let text = "Hi";
		};
		sayHi();
		try {
			$$result.log(text);
		} catch (error) {
			$$result.log(error.message); //text is not defined
		}
	}

	buttons[0].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold("Acceso a variable en función padre");
		greetingV3();
		$$result.logBold("Acceso a variable en función interna");
		greetingV4();
	});


	function IIFE_V1() {
		(function () {
			$$result.log("Hello"); // Hello
		})();
	}

	function IIFE_V2() {
		(function (name) {
			$$result.log("Hello " + name); // Hello Pablo
		})("Pablo");
	}

	function IIFE_V3() {
		let result = (function () {
			let name = "Pablo";
			return "Hello " + name;
		})();
		$$result.log(result); // Hello Pablo
	}

	buttons[1].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold("Patrón IIFE simple");
		IIFE_V1();
		$$result.logBold("Patrón IIFE con paso de argumentos");
		IIFE_V2();
		$$result.logBold("Valor de retorno de patrón IIFE");
		IIFE_V3();
	});

	function closureV1(){
		function mainFunction() {
			let name = "Pablo";
			function greting() {
				$$result.log("Hello " + name);
			}
			return greting;
		}
		let myGreeting = mainFunction();
		myGreeting(); // Hello Pablo
	}

	function closureV2(){
		function setupCounter(val) {
			let count = val || 0;
			return function counter() {
				return ++count;
			}
		}
		let counter = setupCounter(5);
		$$result.log(counter()); //6
		$$result.log(counter()); //7
	}

	buttons[2].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold("Ejemplo de closure");
		closureV1();
		$$result.logBold("Contador implementado con closure");
		closureV2();
	});

	function closureV3(){
		// app es el objeto global que almacenará la referencia al contenido devuelto.
		let app = (function (id) { // Función principal anónima
			let computerId = id; // Variable con ámbito local solo accesible desde la función anónima y por tanto encapsulada.
			let getId = function () { // función que permite cambiar el contenido de la variable local.
				return computerId;
			};
			return {  // Objeto devuelto por función anónima y asignado a app.
				getId: getId // propiedad del objeto que hace referencia a la función local.
			};
		})(123); // Invocación de la función anónima. Se hace justo en el momento de su declaración.
		// El objeto global puede acceder al ámbito de la función anónima a través de sus funciones internas.
		$$result.log(app.getId());  //123
	}

	buttons[3].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold("Closure con IIFE");
		closureV3();
	});

	function closureV4(){
		$$result.clear();
		function setupCounter(val) {
			let count = val || 0;
			function increment() {
				return ++count;
			}
			function decrement() {
				return --count;
			}
			return {
				increment: increment,
				decrement: decrement
			}
		}

		$$result.logBold("Contador con operaciones de incremento y decremento");
		let counter = setupCounter(5);
		$$result.log(counter.increment()); //6
		$$result.log(counter.increment()); //7
		$$result.log(counter.decrement()); //6
		$$result.log(counter.decrement()); //5
	}

	buttons[4].addEventListener('click', closureV4);

})();

