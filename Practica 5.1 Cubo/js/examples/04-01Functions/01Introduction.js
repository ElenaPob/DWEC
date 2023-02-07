'use strict';
(function (){
	let divExamples = document.getElementById('examples').children[6];
	let buttons = divExamples.getElementsByClassName('tab-pane')[0].getElementsByTagName('button');

	function greetingsV1(name) {
		$$result.log("Hello " + name); // Hello Pablo
	}

	function greetingsV2(name) {
		return ("Hello " + name); //Retorna "Hello Pablo"
	}

	function sum(num1, num2) {
		return num1 + num2;
	}

	function printAllV1() {
		for (let i = 0; i < arguments.length; i++) {
			$$result.log(arguments[i]);
		}
	}

	function printAllV2() {
		let values = Array.from(arguments);
		values.sort(function(a, b){return a - b});
		for (let v of values){
			$$result.log(v);
		}
	}

	buttons[0].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold("Invocación con argumentos");
		greetingsV1('Pablo');
		$$result.logBold("Retorno de función");
		$$result.log(greetingsV2('Pablo')); // Hello Pablo
		$$result.logBold("Retorno undefined");
		$$result.log("Hello " + greetingsV1('Pablo')); // Hello undefined
		$$result.logBold("Argumentos");
		$$result.log(sum(2, 3)); //5
		$$result.log(sum(2)); //NaN
		$$result.logBold("Objeto arguments");
		printAllV1(1, 2, 3, 4, 5); // 1 2 3 4 5
		$$result.logBold("Transformar arguments en un array");
		printAllV2(4, 3, 2, 5, 1); // 1 2 3 4 5
	});

	function defaultParamentersV1(){
		function multiply (a = 1, b = 1){
			return a * b;
		}
		$$result.log(multiply()); // 1
		$$result.log(multiply(0)); // 0
		$$result.log(multiply(5)); // 5
		$$result.log(multiply(5, 0)); // 0
	}

	function defaultParamentersV2(){
		function multiply (a = 1, b = a + 1){
			return a * b;
		}
		$$result.log(multiply()); // 2
		$$result.log(multiply(0)); // 0
		$$result.log(multiply(5)); // 30
		$$result.log(multiply(5, 0)); // 0
	}

	function defaultParamentersV3(){
		function getRandom(){
			return Math.floor(Math.random() * 10);
		}
		function multiply (a = 1, b = getRandom()){
			return a * b;
		}
		$$result.log(multiply());
		$$result.log(multiply(0));
		$$result.log(multiply(5));
		$$result.log(multiply(5, 0));
	}

	function defaultParamentersV4(){
		function append(value, array = []) {
			array.push(value)
			return array
		}
		$$result.log (append(1))  // [1]
		$$result.log (append(2))  // [2], no [1, 2]
	}

	buttons[1].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold("Parámetros por defecto");
		defaultParamentersV1();
		$$result.logBold("Expresiones en parámetros por defecto");
		defaultParamentersV2();
		$$result.logBold("Invoación de funciones en parámetros por defecto");
		defaultParamentersV3();
		$$result.logBold("Asignación en la invocación no en la definición");
		defaultParamentersV4();
	});

})();

