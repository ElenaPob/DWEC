'use strict';
(function (){
	let divExamples = document.getElementById('examples').children[10];
	let buttons = divExamples.getElementsByClassName('tab-pane')[4].getElementsByTagName('button');

	function iteratorProtocol(){
		$$result.clear();
		$$result.logBold("Iteradores ES6");
		let arr = [1,'a',3,'d',5];
		let arrIterator = arr[Symbol.iterator](); // Obtenemos el Iterador a partir las propiedad Symbol.iterator
		$$result.log(arrIterator.next()); // { value: 1, done: false }
		$$result.log(arrIterator.next()); // { value: 'a', done: false }
		$$result.log(arrIterator.next()); // { value: 3, done: false }
		$$result.log(arrIterator.next()); // { value: 'd', done: false }
		$$result.log(arrIterator.next()); // { value: 5, done: false }
		$$result.log(arrIterator.next()); // { value: undefined, done: true }

		$$result.logBold("Iterador con bucle for");
		arrIterator = arr[Symbol.iterator](); // Reiniciamos el iterador
		for (let value of arrIterator){
			$$result.log(value);
		}

		$$result.logBold("Iterador con bucle while");
		arrIterator = arr[Symbol.iterator](); // Reiniciamos el iterador
		let item = arrIterator.next();
		while (!item.done){
			$$result.log(item.value);
			item = arrIterator.next();
		}

		$$result.logBold("Métodos para obtener iteradores");
		for (let value of arr.entries()){ // Obtiene array con posición y el valor
			$$result.log('Posición: ' + value[0] + ' Valor: ' + value[1]);
		}
	}
	buttons[0].addEventListener('click', iteratorProtocol);

	function nativeIterators(){
		$$result.clear();
		$$result.logBold("Iterador en Map");
		let mapExample = new Map();
		mapExample.set(1,'a');
		mapExample.set(2,'b');
		mapExample.set(3,'c');
		let mapIterator = mapExample[Symbol.iterator]();
		for (let value of mapIterator){
			$$result.log(value);
		}

		$$result.logBold("Iterador en String");
		let str = "Quijote";
		let strIterator = str[Symbol.iterator]();
		for (let value of strIterator){
			$$result.log(value);
		}

		$$result.logBold("Iteradores siendo iterables");
		let iterator = [1,'a',3,'d',5].entries();
		$$result.log(iterator.toString()); // [object Array Iterator]
		$$result.log(iterator === iterator[Symbol.iterator]()); // true
	}
	buttons[1].addEventListener('click', nativeIterators);

	function customIterable(){
		function myIterable(start, finish) {
			// Iniciamos variables del closure
			let index = start;
			let count = 0;

			return { // Devolvemos objeto iterable con la propiedad Symbo.iterator
				[Symbol.iterator]() {	// Propiedad con la función que devuelve el iterador
					return { // Devolvemos objeto iterador con método next()
						next() {
							let result;
							// No hemos terminado de iterar
							if (index < finish) {
								// value le asignamos el índice, done es false porque no hemos termiando.
								result = { value: index, done: false };
								index++;
								count++;
							} else { // Condición de salida
								// done es true, value le asignamos la cuenta.
								result = { value: count, done: true }
							}
							return result;
						}
					}
				}
			}
		}

		$$result.clear();
		$$result.logBold('Iteración en for..of');
		let iterable = myIterable(2, 5);
		for (let value of iterable){
			$$result.log(value);
		}
	}
	buttons[2].addEventListener('click', customIterable);

	function buildIteratorAndIterable(){
		function myIterator(start, finish) {
			// Iniciamos variables del closure
			let index = start;
			let count = 0;

			return { // Devolvemos objeto iterable con la propiedad Symbo.iterator
				[Symbol.iterator]() {	// La propiedad devuelve una referecia al propio objeto como iterador
					return this;
				},
				next() {
					let result;
					// No hemos terminado de iterar
					if (index < finish) {
						// value le asignamos el índice, done es false porque no hemos termiando.
						result = { value: index, done: false };
						index++;
						count++;
					} else { // Condición de salida
						// done es true, value le asignamos la cuenta.
						result = { value: count, done: true }
					}
					return result;
				}
			}
		}

		$$result.clear();
		$$result.logBold('Obj iterable e iterador');
		let iterable = myIterator(2, 5);
		const iterator = iterable[Symbol.iterator]();
		$$result.log(iterator === iterable); // true
		$$result.logBold('Iteración en for..of con iterator');
		for (let value of iterator){
			$$result.log(value);
		}

		$$result.logBold('Rompiendo un bucle');
		let iterable2 = myIterator(2, 5);
		for (let value of iterable2){
			$$result.log(value); // 2
			break;
		}
		$$result.logBold('Cotinuamos en un nuevo bucle');
		for (let value of iterable2){
			$$result.log(value);  // 3, 4
		}
	}
	buttons[3].addEventListener('click', buildIteratorAndIterable);

	function returnMethod(){
		function myIterator(start, finish) {
			// Iniciamos variables del closure
			let index = start;
			let count = 0;

			return { // Devolvemos objeto iterable con la propiedad Symbo.iterator
				[Symbol.iterator]() {	// La propiedad devuelve una referecia al propio objeto como iterador
					return this;
				},
				next() {
					let result;
					// No hemos terminado de iterar
					if (index < finish) {
						// value le asignamos el índice, done es false porque no hemos termiando.
						result = { value: index, done: false };
						index++;
						count++;
					} else { // Condición de salida
						// done es true, value le asignamos la cuenta.
						result = { value: count, done: true }
					}
					return result;
				},
				return() {
					$$result.log('Reiniciamos el contador en return');
					index = start;
					return this;
				}
			}
		}

		$$result.clear();

		$$result.logBold('Rompiendo un bucle');
		let iterable = myIterator(2, 5);
		for (let value of iterable){
			$$result.log(value); // 2
			break;
		}
		$$result.logBold('Cotinuamos en un nuevo bucle');
		for (let value of iterable){
			$$result.log(value);  // 2, 3, 4
		}
	}
	buttons[4].addEventListener('click', returnMethod);

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

			get elements(){
				// referencia para habilitar el closure en el objeto
				let array = this.#list;

				return { // Objeto iterable
					[Symbol.iterator]() { // Propiedad con la función que devuelve el iterador
						let nextIndex = 0; // Inicialización del índice para cada iterador
						return {
							next: function () {
								return nextIndex < array.length ?
									{ value: array[nextIndex++], done: false } :
									{ done: true };
							}
						}
					}
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
		$$result.logBold('Iterador en while');
		let iterable = list.elements; // Obtenemos el iterable de la lista.
		const iterator = iterable[Symbol.iterator](); // Obtenemos iterador del iterable
		let obj = iterator.next();
		while (!obj.done) { // Iteramos con while
			let element = obj.value;
			$$result.log("Objeto: " + element.property1 + " " + element.property2);
			obj = iterator.next();
		}

		$$result.logBold('Iterable for..of');
		for (let element of iterable){ // Iteramos sobre el iterable
			$$result.log("Objeto: " + element.property1 + " " + element.property2);
		}
	}
	buttons[5].addEventListener('click', iterableList);

})();

