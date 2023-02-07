'use strict';
(function () {
	let divExamples = document.getElementById('examples').children[9];
	let buttons = divExamples.getElementsByClassName('tab-pane')[0].getElementsByTagName('button');

	/*
		IIFE Permite encpasular el contenido de la función principal, la cual es anónima y solo se invoca en la en la creación del objeto global.
	*/
	function testPatternIIFE() {
		$$result.clear();
		$$result.logBold('Testeo del esquema del patrón');

		// app es el objeto global que almacenará la referencia al contenido devuelto.
		let app = (function () { // Función principal anónima
			let carId = 123; // Variable con ámbito local solo accesible desde la función anónima y por tanto encapsulada.
			let getId = function () { // función que permite cambiar el contenido de la variable local.
				return carId;
			};
			return {  // Objeto devuelto por función anónima y asignado a app.
				getId: getId // propiedad del objeto que hace referencia a la función local.
			};
		})(); // Invocación de la función anónima. Se hace justo en el momento de su declaración.
		// El objeto global puede acceder al ámbito de la función anónima a través de sus funciones internas.
		$$result.log(app.getId());  //123
	}
	buttons[0].addEventListener('click', testPatternIIFE);

	function testIIFE() {
		//La variable Book es creada a partir de una función anónima.
		//Esta variable recibe el constructor de objetos Book.
		//La variable es un clousure, por tanto puede acceder a numOfBooks y mantener el contador
		let Book = (function () { //Utilizamos una función anónima.
			// private static field
			// Esta variable es solo accesible desde dentro del objeto.
			let numOfBooks = 0;

			// private static method
			// Este método es solo accesible desde el objeto.
			function checkIsbn(isbn) {
				if (!(/^(\d{3}-\d{2}-\d{5}-\d{2}-\d)$/.test(isbn) ||
					/^(\d-\d{6}-\d\d-\d)$/.test(isbn)))
					throw new TypeError("isbn is not valid!");
			}

			//Construcctor de objetos Book
			function Book(isbn, title) {
				checkIsbn(isbn); //Validamos isbn
				this.isbn = isbn; //Asignamos el isbn
				this.title = title; //Asignamos el title
				++numOfBooks; //Incrementamos el contador. El valor del contador se mantiene porque es un closure
			}
			//Método que devuelve el número de libros creados. Será heredado por todas las instancias creadas.
			Book.prototype.getNumOfBooks = function () {
				return numOfBooks; //Este método hace accesible numOfBooks.
			}

			return Book; //Devolvemos la función constructora.
		})(); //Se invoca la función anónima para obtener el constructor Book.

		$$result.clear();
		$$result.logBold('Constructor Book devuelto desde IIFE');
		let firstBook = new Book("012-94-33296-04-2", "First Title");
		$$result.log(firstBook.title); // First Title
		$$result.log(firstBook.getNumOfBooks()); // 1
		let secondBook = new Book("0-943396-04-2", "Second Title");
		$$result.log(firstBook.title); // First Title
		$$result.log(secondBook.title); // Second Title
		$$result.log(firstBook.getNumOfBooks()); // 2
		$$result.log(secondBook.getNumOfBooks()); // 2
	}
	buttons[1].addEventListener('click', testIIFE);

	//Definición de tipos de abstractos
	//JavaScript no es necesario especificar tipos de una variable cuando se declara, ni en argumentos.
	//Tipos abstractos realmente no son necesarios, pero se pueden utilizar para recoger funcionalidad común para utilizar se la herencia.

	function testAbstractType() {
		(function () { //Función anónima, solo se ejecuta una vez al cargar la página
			let abstractCreateLock = false; //Creamos un seguro para permitir o no instanciar la clase Abstracta. Es accedido desde el closure.

			// abstract type
			// Este constructor se utiliza como clase Abstracta. Podemos definir los métodos y las propiedades que queramos.
			// Los métodos podrían tener implementación o no. En el segundo caso se deberán implementar en la subclase.
			function BaseForm() {
				if (abstractCreateLock) //Si el seguro es false podemos instanciar un BaseForm, si es true lanza una excepción y no deja instanciar.
					throw new Error("Can't instantiate BaseForm!");
				abstractCreateLock = true;	//Reactivamos el seguro justo de después de comprobar que ya se ha validado la invocación.
				this.property = "default"; //Propiedad que será heredada en la subclase
			}
			BaseForm.prototype = {};
			//Método sin implementación. Se debe implementar en la subclase
			BaseForm.prototype.post = function () {
				throw new Error("Not implemented!");
			}
			//Método con implementación. No se puede reutilizar en la subclase.
			BaseForm.prototype.get = function () {
				return ("Get Operation!!!!!!!");
			}

			// Definimos la subclase GridForm que hereda de BaseForm
			function GridForm() {
				abstractCreateLock = false; //Antes de invocar a BaseForm debemos abrir el seguro.
				BaseForm.call(this); //Heredamos las propiedades de la superclase mediante invocación del superconstructor.
			}
			GridForm.prototype = Object.create(BaseForm.prototype); //Definimos la herencia, por tanto debemos poder declarar un objeto BaseForm
			abstractCreateLock = true; //Ya no queremos que se instancien objetos BaseForm, ponemos a true el seguro.
			GridForm.prototype.post = function () {
				// ...
				return "Grid is posted.";
			}

			//Este es un método para que una función anónima devuelva dos objetos que actuen como globales. Ambos son closure.
			window.BaseForm = BaseForm; //Declaramos una función global en window, la cual es un clousure que tiene acceso al seguro y por tanto no deja instaciar este tipo de objeto
			window.GridForm = GridForm; //Declaramos una función global en window, la cual es un clousure aunque no tiene nada que ver con el seguro.
		})(); //Invocamos la función global.

		$$result.clear();
		$$result.logBold('Instanciando objetos')
		let myGrid = new GridForm(); //Instanciamos un objeto GridForm
		$$result.log(myGrid.post()); // Grid is posted.
		$$result.log(myGrid.get()); // Get Operation!!!!!!!
		$$result.log(myGrid.property); // default
		try {
			$$result.logBold('Instanciando objeto de clase abstracta');
			let myForm = new BaseForm(); //Al intentar instaciar se genera la excepción.
		} catch (err) {
			$$result.log(err.message); // Error: Can’t instantiate BaseForm!
		}
		$$result.logBold('Comparando tipos GridForm con BaseForm');
		$$result.log(myGrid instanceof BaseForm); // true. myGrid es una instancia de BaseForm.
	}
	buttons[2].addEventListener('click', testAbstractType);

	//Definición de Interfaces
	//No hay implementación en JavaScript. Se puede imitar con un control de firmas de métodos.

	function testInterface() {
		//Interface es una variable que almacena la función que realizará el chequeo de implementación de métodos.
		let Interface = function (name, methods) {
			this.name = name; //Nombre del Interfaz
			// copies array
			this.methods = methods.slice(0); //Array con el listado de métodos que se deben implementar.
		};

		//La propiedad checkImplements de Interface es una función para verificar que los métodos están implementados
		//Parámetros: obj:Objeto que debe implementar el Interfaz.  interfaceObj:Declaración del interfaz.
		Interface.checkImplements = function (obj, interfaceObj) {
			for (let method of interfaceObj.methods) { //Recorremos el array de métodos
				if (!obj[method] || typeof obj[method] !== "function") {//Comprobamos que el objeto tenga una propiedad con el mismo nombre que los métodos declarados, y que estas propiedades sean funciones.
					// Si no está implementado el método se lanza excepción.
					throw new Error("Interfacenotimplemented! Interface: " + interfaceObj.name + " Method: " + method);
				}
			}
		};

		//Declaramos un interfaz denominado "IMaterial" que debe implementar dos métodos.
		let iMaterial = new Interface("IMaterial", ["getName", "getPrice"]);

		//El siguiente constructor debe implementar el interfaz para poder funcionar.
		function Product(name, price) {
			//Chequeamos sobre el objeto que se está creando si tiene implementados los métodos.
			Interface.checkImplements(this, iMaterial);
			this.name = name;
			this.price = price;
			//Si todos los métodos están implementados se instancia el objeto.
		}
		//El objeto Product tiene asignado en su prototipo el método getName y el getPrice, necesarios para implementar iMaterial.
		Product.prototype.getName = function () {
			return this.name;
		};
		Product.prototype.getPrice = function () {
			return this.price;
		};

		$$result.clear();
		$$result.logBold('Instanciamos objeto Product como Interfaz');
		//Instanciamos un objeto Product
		let p1 = new Product("HP EliteBook", 1500);
		$$result.log(p1.getName() + " " + p1.price); // HP EliteBook 1500

		//Borramos uno de los métodos de Product
		delete Product.prototype.getPrice;
		//Intentamos instanciar un nuevo Product.
		try {
			//No se puede instanciar porque falta un método del interfaz y se genera la excepción.
			let p2 = new Product("HP Pavilion", 1500);
		} catch (err) {
			$$result.log(err.message); // Error: Interface not implemented!
		}
	}
	buttons[3].addEventListener('click', testInterface);

	//Patrón Singleton
	//Más que un patrón, el ejemplo del paper es un mecanismo para activar o desactivar la ejecución de un método.
	//Tenemos dos formas de hacerlo, con declaración en un objeto literal o mediante constructor.

	//Creamos el objeto Singleton que permitirá crear la instancia. Se hace uso de clousure.
	function testSingletonPattern() {
		let Singleton = (function () { //La función anónima devuelve un método getInstance que permite obtener el objeto único
			let instantiated; //Atributo privado que permite guardar la única instancia creada.

			function init() { //Este método se ejecuta una única vez y es el utilizado para crear la única instancia del objeto.
				// singleton here

				// Private methods and variables. Elementos que son privados al objeto, solo accesibles a través de clousure
				function privateMethod() {
					$$result.log("I am private");
				}
				let privateVariable = "Im also private";
				let privateRandomNumber = Math.random();

				return { // Devuelve el objeto que será único. Funciona como un clousure
					publicMethod: function () {
						return 'publicMethod unique instance';
					},
					publicProperty: 'publicProperty unique instance',
					getRandomNumber: function () { //Propiedad que permite acceder a los atributos privados. Closure
						return privateRandomNumber;
					}
				};
			}
			return {
				// Devuelve un objeto con el método getInstance
				getInstance: function () {
					if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
						instantiated = init(); //instantiated contiene el objeto único
					}
					return instantiated; //Si ya está asignado devuelve la asignación.
				}
			};
		})();
		// Para obtener el objeto único invocamos getInstance de la variable global Singleton, la cual siempre devuelve la misma instancia.
		$$result.clear();
		$$result.logBold('Instanciando objeto único');
		$$result.log(Singleton.getInstance().publicMethod()); //publicMethod unique instance
		$$result.log(Singleton.getInstance().publicProperty); //publicProperty unique instance
		$$result.log(Singleton.getInstance().getRandomNumber()); //Random number.
		$$result.logBold('Comparando instancias');
		let instance1 = Singleton.getInstance();
		let instance2 = Singleton.getInstance();
		//Chequeamos si las dos instancias son el mismo objeto.
		$$result.log(instance1 === instance2); //true
	}
	buttons[4].addEventListener('click', testSingletonPattern);

	//El ejemplo construye un sistema de logs.
	function testSingletonV1() {
		//Declaración mediante objeto literal
		let Logger1 = { //Definimos el objeto
			enabled: true, //La propieda enabled dice si se puede ejecutar el método o no.
			log: function (logText) { //Asociamos un método al objeto
				if (!this.enabled) // Comprobamos si la propiedad está activa para ejecutar el método
					return; // Si no está activa salimos del método. Podríamos lanzar una excepción también.
				if (console && console.log) // Ejecutamos el método. Si existe el objeto consola se muestra el mensaje por la consola.
					console.log(logText);
				else //Si no existe se muestra la alerta en la página.
					alert(logText);
			}
		}

		function Logger2() { //Función constructora. Aunque no es necesario instanciar un objeto.
			throw new Error("You can't create a new Logger object.");
		}
		Logger2.enabled = true; //La propieda enabled dice si se puede ejecutar el método o no.
		Logger2.log = function (logText) { //Asociamos un método a la función. El método es estático
			if (!Logger2.enabled) // Comprobamos si la propiedad está activa para ejecutar el método
				return; // Si no está activa salimos del método. Podríamos lanzar una excepción también.
			if (console && console.log) // Ejecutamos el método. Si existe el objeto consola se muestra el mensaje por la consola.
				console.log(logText);
			else //Si no existe se muestra la alerta en la página.
				alert(logText);
		};

		$$result.clear();
		$$result.logBold('Sistemas de log con objetos Singleton');
		$$result.log("Abre la cosola para comprobar los resultados de la ejecución.");
		$$result.log('Logger1');
		Logger1.log("Logger1: test"); // Logger1: test
		Logger1.enabled = false;
		Logger1.log("Logger1: test"); //

		$$result.log('Logger2');
		Logger2.log("Logger2: test"); // Logger2: test
		Logger2.enabled = false;
		Logger2.log("Logger2: test"); //
	}
	buttons[5].addEventListener('click', testSingletonV1);

	function testPatterModule() {
		//someModule será la variable que implementa el módulo
		let someModule = (function () { //Con la función anónima devolvemos el módulo
			// Campos privados. Implementan la funcionalidad del módulo
			let privateVar = 5;

			// Métodos privados
			let privateMethod = function () {
				return 'Private Test';
			};

			return { //Interfaz pública del módulo
				// Propiedades públicas
				publicVar: 10,

				// Métodos públicos
				publicMethod: function () {
					return ' Followed By Public Test ';
				},

				// Métodos que dan acceso a datos privados.
				getData: function () {
					return privateMethod() + this.publicMethod() + privateVar;
				}
			}
		})(); // Invocamos la función anónima.

		//Acceso al módulo para ejecutar su funcionalidad.
		console.log(someModule.getData()); //Private Test Followed By Public Test 5

		//Añadimos funciones extra al módulo.
		//Podemos añadir nueva funcionalidad el módulo para ampliar su uso.
		someModule = (function (someModule) { //A la función anónima le pasamos el módulo original.

			someModule.extension = function () { //Declaramos nueva funcionalidad.
				return "another method!";
			};

			return someModule; //Devolvemos el objeto con la nueva funcionalidad creada.

		})(someModule || {}); //Mecanimos de precaución por si someModule no existe.

		$$result.clear();
		//Comprobamos la funcionalidad antigua y la nueva
		$$result.logBold('Invocación de las operaciones ofrecidas por el módulo');
		$$result.log(someModule.getData()); //Private Test Followed By Public Test 5
		$$result.log(someModule.extension()); //another method!
	}
	buttons[6].addEventListener('click', testPatterModule);

	/*
		Permite iterar sobre una serie de objetos sin importar el contenedor.
	*/
	function testIteratorSchema() {
		function myIterator(start, finish) {
			// Iniciamos variables del closure
			let index = start;
			let count = 0;

			// Devolvemos objeto iterador con método next()
			return {
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
		$$result.logBold('Invocación manual');
		let iterator1 = myIterator(2, 5);
		$$result.log(iterator1.next()); // {done: false, value: 2}
		$$result.log(iterator1.next()); // {done: false, value: 3}
		$$result.log(iterator1.next()); // {done: false, value: 4}
		$$result.log(iterator1.next()); // {done: false, value: 3}

		$$result.logBold('Iteración en bucle');
		let iterator2 = myIterator(2, 5);
		let res = iterator2.next();
		while (!res.done) {
			$$result.log('Índice: ' + res.value);
			res = iterator2.next();
		}
		$$result.log('Número total: ' + res.value); // 3
	}
	buttons[7].addEventListener('click', testIteratorSchema);

	function testIteratorPattern() {

		/* Constructor de un objeto List para almacenar todo tipo de objetos */
		function List() {
			//La función se invoca con el operador new
			if (!(this instanceof List))
				throw new Error("Debes invocar este constructor con el operador new");

			//Contenedor de los objetos que almacenamos en la lista.
			//La variable es privada para que no pueda ser accedida desde fuera del objeto.
			let _list = [];

			// Método para añadir un nuevo objeto en la lista
			// Al acceder a una variable interna debe estar en el cuerpo del constructor y no en el prototipo.
			this.add = function (obj) {
				_list.push(obj);
				return _list.length;
			}

			// Método para borrar un objeto de la lista.
			this.remove = function (position) {
				if (position >= _list.length || position < 0)
					throw new Error("Intento de borrado fuera del límite de la lista.");

				return _list.splice(position, 1);
			}

			// Propiedad que devuelve un iterador para recorrer los objetos de la lista.
			// El array no es devuelto porque se podría modificar su contenido desde fuera del objeto.
			Object.defineProperty(this, 'iterator', {
				get: function () {
					// Variable que mantiene la última posición recorrida por el array.
					// Su estado es mantenido a través del closure.
					let nextIndex = 0;
					// Devolvemos el objeto iterador para recorrer los objetos de la lista.
					// El objeto iterador es un literal.
					// Al contener una función interna, es capaz de acceder y mantener el valor de nextIndex
					return {
						next: function () { // Método del iterador que devuelve el siguiente objeto de la lista.
							// El método devuelve un objeto literal con dos propiedades
							// La propiedad "value" contiene el valor de la lista que vamos a recuperar.
							// La propiedad "done" indica si hemos terminado de iterar cuando es igual a true.
							// El return utiliza un operador ternario.
							return nextIndex < _list.length ?
								//Si el índice es menor que la longitud, tenemos objetos en el array que devolver
								// Si es true devolvemos el literal con el objeto e indicamos que se siga iterando.
								// El índice es incrementado después de acceder al elemento. Postincremento!!!
								{ value: _list[nextIndex++], done: false } :
								{ done: true }; // Si el índice es mayor que la longitud, devolvemos literal con "done" a true.
						}
					}
				}
			});
		}
		List.prototype = {};
		List.prototype.constructor = List;

		$$result.clear();
		let list = new List();
		//Añadimos elementos a la lista
		list.add({ property1: "obj1", property2: 1 });
		list.add({ property1: "obj2", property2: 2 });
		list.add({ property1: "obj3", property2: 3 });

		// Iteramos sobre la lista.
		$$result.logBold('Utilizamos el iterador para recorrer la Lista');
		let iterator = list.iterator; // En un variable obtenemos un iterador sobre la lista.
		let obj = iterator.next(); // Obtenemos el primer elemento a través del iterador si es que existe.
		while (!obj.done) { // Mientras la propiedad "done" no es true debemos iterar para obtener todos los objetos.
			let element = obj.value;
			// Mostramos el valor del objeto obtenido del iterador a través de la propiedad value.
			$$result.log("Objeto: " + element.property1 + " " + element.property2);
			obj = iterator.next(); // Conseguimos el siguiente objeto del iterador.
		}
	}
	buttons[8].addEventListener('click', testIteratorPattern);

})();

