'use strict';
(function (){
	let divExamples = document.getElementById('examples').children[7];
	let buttons = divExamples.getElementsByClassName('tab-pane')[2].getElementsByTagName('button');

	function functionPrototype(){
		$$result.clear();
		let myFunction = function(){ }
		$$result.logBold('Prototipo de una función');
		$$result.log(myFunction.prototype); // myFunction { }

		let product = {
			serial: "111-111-111",
			name: "Portátil",
			price: 750
		}
		$$result.logBold('Prototipo objeto literal');
		$$result.log(product.prototype); //undefined
		$$result.logBold('Propiedad __proto__ objeto literal');
		$$result.log(product.__proto__); //Object { }
	}
	buttons[0].addEventListener('click', functionPrototype);

	function comparePrototypes(){
		$$result.clear();

		function Product(serial, name){
			this.serial = serial;
			this.name = name;
		}
		$$result.logBold('Prototipo del constructor Product');
		$$result.log(Product.prototype); // Product { }

		let product = new Product("111-111-111", "Portátil");
		$$result.logBold('Prototipo instancia product en propiedad __proto__');
		$$result.log(product.__proto__); // Product { }
		$$result.logBold('Comparativa de prototype y __proto__');
		$$result.log(Product.prototype === product.__proto__); //true

		$$result.logBold('Propiedades de instancia product');
		$$result.log(product); //Product {serial: 111-111-111,	name: Portátil}

		$$result.logBold('Propiedades creadas en prototype de la función son heredadas');
		Product.prototype.price = 750;
		$$result.log(product); //Product {serial: 111-111-111,name: Portátil,price: 750}

		$$result.logBold('Objetos prototype y __proto__');
		Product.prototype.price = 750;
		//Product {price: 750,}
		$$result.log(Product.prototype);
		//Product {price: 750,}
		$$result.log(product.__proto__);
		$$result.log(Product.prototype === product.__proto__); //true
	}
	buttons[1].addEventListener('click', comparePrototypes);

	function prototypeChain(){
		$$result.clear();
		function Product(serial, name){
			this.serial = serial;
			this.name = name;
		}
		Product.prototype.price = 750;
		let product1 = new Product("111-111-111", "Portátil");
		let product2 = new Product("222-222-222", "Tablet");
		$$result.logBold('Propiedades heredadas del prototipo');
		$$result.log(product1.price); // 750
		$$result.log(product2.price); // 750

		$$result.logBold('Modificación product1.price');
		product1.price = 1000;
		$$result.log(product1.price); // 1000
		$$result.log(product2.price); // 750

		$$result.logBold('El prototipo mantiene valor original');
		$$result.log(product1.__proto__.price); // 750

		$$result.logBold('hasOwnProperty determina si la propiedad es heredada o no');
		$$result.log(product1.hasOwnProperty("price")); // true
		$$result.log(product2.hasOwnProperty("price")); // false
	}
	buttons[2].addEventListener('click', prototypeChain);


	function changingFunctionPrototype(){
		$$result.clear();
		function Product(serial, name){
			this.serial = serial;
			this.name = name;
		}
		Product.prototype.price = 750;
		let product1 = new Product("111-111-111", "Portátil");
		let product2 = new Product("222-222-222", "Tablet");

		Product.prototype = { price: 2000, currency: "euro"}
		let product3 = new Product("333-333-333", "Smartphone");
		// Object {price: 2000,	currency: euro,}
		$$result.logBold('Nuevo prototipo');
		$$result.log(Product.prototype);
		$$result.logBold('Antiguas instancias no cambian');
		$$result.log(product1.price); // 750
		$$result.log(product2.price); // 750
		$$result.logBold('Nuevas instancias apuntan al nuevo prototipo');
		$$result.log(product3.price); // 2000
	}
	buttons[3].addEventListener('click', changingFunctionPrototype);

	buttons[4].addEventListener('click', function(){
		prototypeChain()
	});

	function showingPrototype(){
		$$result.clear();
		function Product(serial, name){
			this.serial = serial;
			this.name = name;
		}
		Product.prototype.price = 750;
		let product1 = new Product("111-111-111", "Portátil");

		// Product {price: 750,}
		$$result.logBold('Propiedad __proto__');
		$$result.log(product1.__proto__);
		// Object { }
		$$result.logBold('Propiedad __proto__.__proto__');
		$$result.log(product1.__proto__.__proto__);
		// null
		$$result.logBold('Propiedad __proto__.__proto__.__proto__');
		$$result.log(product1.__proto__.__proto__.__proto__);

		$$result.logBold('Comparación de cadena de prototipos con instanceof');
		$$result.log(product1 instanceof Product); // true
		$$result.log(product1 instanceof Object); // true
		$$result.log(product1.__proto__ === Product.prototype); //true
	}
	buttons[4].addEventListener('click', showingPrototype);

})();

