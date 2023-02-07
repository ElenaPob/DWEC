(function (){
	let divExamples = document.getElementById('examples').children[1];
	let buttons = divExamples.getElementsByTagName('button');

	buttons[0].addEventListener('click', function(){
		// Por cada número 4 condiciones. 4 comparativos.
		function getFizzBuzz(num){
			let str = num;
			if (num % 3 === 0 && num % 5 === 0){
				str = "FizzBuzz"
			} else if (num % 3 === 0) {
				str = "Fizz";
			} else if (num % 5 === 0) {
				str = "Buzz";
			}

			return str;
		}

		function printFizzBuzzNumbers(){
			for (let i = 1; i <= 100; i++){
				$$result.log ("Number: " + getFizzBuzz(i));
			}
			let after = new Date();
		}

		$$result.clear();
		$$result.logBold('FizzBuzz V1');
		let before = new Date();
		printFizzBuzzNumbers();
		let after = new Date();
		$$result.log('Tiempo de ejecución: ' + (after - before));
	});

	buttons[1].addEventListener('click', function(){
		// Por cada número 4 condiciones. 2 comparativos.
		function getFizzBuzzV2(num){
			let buzz = ((num % 5)) ? "":"Buzz"; //0 es false
			let fizz = ((num % 3)) ? "":"Fizz"; //0 es false

			if (fizz || buzz)
				return fizz+buzz;
			else
				return num;
		}

		function printFizzBuzzNumbers(){
			for (let i = 1; i <= 100; i++){
				$$result.log ("Number: " + getFizzBuzzV2(i));
			}
			let after = new Date();
		}

		$$result.clear();
		$$result.logBold('FizzBuzz V2');
		let before = new Date();
		printFizzBuzzNumbers();
		let after = new Date();
		$$result.log('Tiempo de ejecución: ' + (after - before));
	});

	buttons[2].addEventListener('click', function(){
		// Por cada número 3 condiciones. 2 comparativos.
		function getFizzBuzzV3(num){
			let str = "";
			str += ((num % 3)) ? "":"Fizz";
			str += ((num % 5)) ? "":"Buzz";

			return (str || num);
		}

		function printFizzBuzzNumbers(){
			for (let i = 1; i <= 100; i++){
				$$result.log ("Number: " + getFizzBuzzV3(i));
			}
			let after = new Date();
		}

		$$result.clear();
		$$result.logBold('FizzBuzz V3');
		let before = new Date();
		printFizzBuzzNumbers();
		let after = new Date();
		$$result.log('Tiempo de ejecución: ' + (after - before));
	});

})();

