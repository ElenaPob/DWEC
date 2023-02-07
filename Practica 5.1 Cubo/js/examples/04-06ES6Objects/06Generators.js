'use strict';
(function (){
	let divExamples = document.getElementById('examples').children[10];
	let buttons = divExamples.getElementsByClassName('tab-pane')[5].getElementsByTagName('button');

	function generatorSyntax(){
		function* datesGenerator(){
			$$result.log(Date.now());
		}

		$$result.clear();
		$$result.logBold("Uso de generador");
		datesGenerator(); // El cuerpo de la función no se ejecuta
		$$result.logBold("Nada ha ocurrido.");
		let it = datesGenerator(); // Obtenemos un iterador e iterable
		// Ejecuta el cuerpo del generador mostrando fecha por consola
		it.next(); // 1640085688698
	}
	buttons[0].addEventListener('click', generatorSyntax);

	function keyWordYield(){
		function* datesGenerator(){
			$$result.log('Primera pasada');
			$$result.log(Date.now()); // 1640089550695
			yield;
			$$result.log('Segunda pasada');
			$$result.log(Date.now()); // 1640089550695
		}

		$$result.clear();
		$$result.logBold("Pausar generador");
		let it = datesGenerator(); // Obtenemos un iterador e iterable
		it.next(); // Primera pasada
		it.next(); // Segunda pasada
	}
	buttons[1].addEventListener('click', keyWordYield);

	function generatorAsIterator(){
		function* datesGenerator(num){
			for (let i = 0; i < num; i++){
				yield Date.now();
			}
			return num;
		}

		$$result.clear();
		$$result.logBold("Obtenemos iterable");
		let it = datesGenerator(5); // Obtenemos un iterador e iterable
		$$result.log("Obtenemos fecha");
		$$result.log(it.next()); // {value: 1641984904090, done: false}
		$$result.log("Obtenemos fecha");
		$$result.log(it.next()); // {value: 1641984904090, done: false}
		$$result.log("Obtenemos fecha");
		$$result.log(it.next()); // {value: 1641984904090, done: false}
		$$result.log("Obtenemos fecha");
		$$result.log(it.next()); // {value: 1641984904090, done: false}
		$$result.log("Obtenemos fecha");
		$$result.log(it.next()); // {value: 1641984904090, done: false}
		$$result.log("Hemos finalizado");
		$$result.log(it.next()); // {value: 5, done: true}
	}
	buttons[2].addEventListener('click', generatorAsIterator);

	function iteratingOverGenerator(){
		function* datesGenerator(num){
			for (let i = 0; i < num; i++){
				yield Date.now();
			}
			return num;
		}

		$$result.clear();
		$$result.logBold("Iterando con bucle for..of");
		let it = datesGenerator(5); // Obtenemos un iterador e iterable
		for (const d of it) {
			$$result.log(d); // 1641984904090
		}
		$$result.logBold("Perdemos el valor final");
		$$result.log(it.next()); // {value: undefined, done: true}

		$$result.logBold("Iterando con bucle while");
		let it2 = datesGenerator(5);
		let elem = it2.next();
		while (!elem.done){
			$$result.log(elem.value); // 1641984904090
			elem = it2.next();
		}
		$$result.log(elem); // {value: 5, done: true}

		$$result.logBold("Operador de propagación");
		const arr = [...datesGenerator(3)];
		$$result.log(arr); // [1641984904090, 1641984904090, 1641984904090]
	}
	buttons[3].addEventListener('click', iteratingOverGenerator);

	function communicationWithGenerator(){
		function* datesGenerator(num){
			for (let i = 0, amount = 0; i < num; i++){
				amount = yield Date.now() + amount || 0;
			}
			return num;
		}

		$$result.clear();
		$$result.logBold("Fecha actual incrementada en múltiplo de 10");
		let it = datesGenerator(5); // Obtenemos un iterador e iterable
		let elem = it.next();
		let i = 0;
		while (!elem.done){
			$$result.log(elem.value); // Fecha actual incrementada por un múltiplo de 10
			elem = it.next(++i * 10);
		}
		$$result.log(elem); // Valor final
	}
	buttons[4].addEventListener('click', communicationWithGenerator);

	function trhowMethod(){

		function* datesGenerator(num){
			try {
				for (let i = 0, amount = 0; i < num; i++){
					amount = yield Date.now() + amount || 0;
				}
			} catch (error){
				$$result.log(error.message);
			}
			return num;
		}

		$$result.clear();
		$$result.logBold('Método throw() para lanzar excepciones');
		let it = datesGenerator(5); // Obtenemos un iterador e iterable
		let elem = it.next();
		let i = 0;
		while (!elem.done){
			$$result.log(elem.value); // Fecha actual incrementada por un múltiplo de 10
			if (i === 2)
				it.throw(new Error('Error: Alcanzado el límite de 2.')); // Error: Alcanzado el límite de 2.
				elem = it.next(++i * 10);
		}
		$$result.log(elem); // {value: undefined, done: true}
	}
	buttons[5].addEventListener('click', trhowMethod);

	function iterableList(){

		class List {
			//Campo privado
			#list = [];

			// Método para añadir un nuevo objeto en la lista
			add (obj) {
				this.#list.push(obj);
				return this.#list.length;
			}

			// Método para borrar un objeto de la lista.
			remove (position) {
				if (position >= this.#list.length || position < 0)
					throw new Error("Intento de borrado fuera del límite de la lista.");

				return this.#list.splice(position, 1);
			}

			* elements(){
				for (const obj of this.#list){
					yield obj;
				}
			}

			* [Symbol.iterator]() {
				for (const obj of this.#list){
					yield obj;
				}
	    }
		}

		$$result.clear();
		let list = new List();
		//Añadimos elementos a la lista
		list.add({ property1: "obj1", property2: 1 });
		list.add({ property1: "obj2", property2: 2 });
		list.add({ property1: "obj3", property2: 3 });

		// Iteramos sobre la lista.
		$$result.logBold('Iterador de List a partir de generador');
		for (let element of list.elements()){ // Iteramos sobre el iterable
			$$result.log("Objeto: " + element.property1 + " " + element.property2);
		}

		$$result.logBold('List como iterador');
		for (let element of list){ // Iteramos sobre el iterable
			$$result.log("Objeto: " + element.property1 + " " + element.property2);
		}
	}
	buttons[6].addEventListener('click', iterableList);

	function recursiveGenerator(){

		function* internalGenerator() {
			yield 'internal: 1';
			yield 'internal: 2';
		}

		function* externalGenerator() {
				yield 'external: a';
				yield* internalGenerator();
				yield 'external: b';
		}

		$$result.clear();
		$$result.logBold('Generador sobre generador');
		for (let element of externalGenerator()){
			$$result.log(element); // external: a,	internal: 1,	internal: 2,	external: b
		}
	}
	buttons[7].addEventListener('click', recursiveGenerator);

})();

