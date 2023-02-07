'use strict';
(function (){
	let divExamples = document.getElementById('examples').children[6];
	let buttons = divExamples.getElementsByClassName('tab-pane')[2].getElementsByTagName('button');


	function arrowV1(){
		function greeting(){
			return "Hello World";
		}
		$$result.log(greeting()); // Hello World

		let arrow = () => "Hello World";
		$$result.log(arrow());  // Hello World
	}

	function arrowV2(){
		function greeting(name){
			return "Hello " + name;
		}
		$$result.log(greeting("Pablo")); // Hello Pablo

		function multiply (a, b){
			return a * b;
		}
		$$result.log(multiply(3, 5)); // 15

		let greet = (name) => "Hello " + name;
		$$result.log(greet("Pablo"));  // Hello Pablo

		let multi = (a, b) => a * b;
		$$result.log(multi(3, 5));  // 15
	}

	function arrowV3(){
		let greet = (name) => {
			return "Hello " + name;
		}
		$$result.log(greet("Pablo"));  // Hello Pablo

		let multi = (a, b) => {
			return a * b;
		}
		$$result.log(multi(3, 5));  // 15
	}

	function arrowV4(){
		let greet = () => ({name: "Pablo"});
		$$result.log(greet("Pablo").name);  // Pablo
	}

	function arrowV5(){
		let multi = (a = 1, b = 1) => a * b;
		$$result.log(multi(3));  // 3
	}

	buttons[0].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold("Función arrow sin parámetros");
		arrowV1();
		$$result.logBold("Función arrow con parámetros");
		arrowV2();
		$$result.logBold("Notación de bloque");
		arrowV3();
		$$result.logBold("Retorno de objetos literales");
		arrowV4();
		$$result.logBold("Parámetros predeterminados");
		arrowV5();
	});


	let computers = [
		{
				computerID: 134,
				brand: 'HP',
				model: 'EliteBook',
				memory: 16,
		},
		{
				computerID: 456,
				brand: 'HP',
				model: 'Pavilion',
				memory: 16,
		},
		{
				computerID: 14,
				brand: 'HP',
				model: 'EliteBook',
				memory: 32,
		},
	];

	function sortComputersByModel(){
		let localComputers = [...computers];
		localComputers.sort((elemA,elemB) => elemA.model.localeCompare(elemB.model));
		//EliteBook,EliteBook,Pavilion
		localComputers.forEach((elem) => $$result.log(elem.model));
	}

	function findHighPerformanceComputer(){
		let computer = computers.find((elem) => elem.memory > 16);
		$$result.log("ID: " + computer.computerID +
			" Brand: " + computer.brand +
			" Memory: " + computer.memory);//ID: 14 Brand: HP Memory: 32
	}

	function findLowPerformanceComputer(){
		let lowPerformanceComputer = computers.filter((elem) => elem.memory <= 16);
		lowPerformanceComputer.forEach((elem) => $$result.log(elem.computerID));
	}

	function ArrayToString(){
		$$result.log (
			computers.reduce((str, elem) => (str += " " + elem.brand + " " + elem.model + "."), "")
		)
	}

	function evenAndOddNumbers(){
		let numbers = [32, -5, 66, 32, 23, 14, 32, 16];
		let evenNumbers = numbers.filter((elem) => !(elem % 2));
		let oddNumbers = numbers.filter((elem) => elem % 2);

		$$result.logBold("Números pares");
		$$result.log(evenNumbers);//32,66,32,14,32,16
		$$result.logBold("Números impares");
		$$result.log(oddNumbers);//-5,23
	}

	buttons[1].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold("Ordenar un array");
		sortComputersByModel();
		$$result.logBold("Encontrar elemento");
		findHighPerformanceComputer();
		$$result.logBold("Filtrar elementos");
		findLowPerformanceComputer();
		$$result.logBold("Transformar un array en string");
		ArrayToString();

		evenAndOddNumbers();
	});

})();

