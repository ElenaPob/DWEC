'use strict';
(function (){
	let divExamples = document.getElementById('examples').children[7];
	let buttons = divExamples.getElementsByClassName('tab-pane')[3].getElementsByTagName('button');

	function Product(serial, brand, model, price){
		this.serial = serial;
		this.brand = brand;
		this.model = model;
		this.price = price;
		this.toString = function(){
			return "(" + this.serial + ") " + this.brand + " " + this.model;
		}
	}

	function Laptop(serial, brand, model, price, micro, memory, hd){
		Product.call (this, serial, brand, model, price);
		this.micro = micro;
		this.memory = memory;
		this.hd = hd;
		this.toString = function(){
			return "(" + this.serial + ") " + this.brand + " " + this.model +
				". " + this.micro + " " + this.memory + "GB" + " " + this.hd + "GB."
		}
	}
	Laptop.prototype = Object.create(Product.prototype);
	Laptop.prototype.constructor = Laptop;

	function textInheritance(){
		$$result.clear();
		$$result.logBold('Clases Product Subclase Laptop');

		// (111-111-111) HP EliteBook
		let product = new Product ("111-111-111", "HP", "EliteBook", 1200);
		$$result.log(product.toString());

		let laptop = new Laptop ("111-111-111", "HP", "EliteBook", 1200, "i7", 16, 1024);
		$$result.log(laptop.toString());

		$$result.logBold('Cadena de prototipos');
		$$result.log(laptop); //Laptop {...}
		$$result.log(laptop.__proto__); //Laptop {...}
		$$result.log(laptop.__proto__.__proto__); //Product {...}
	}
	buttons[0].addEventListener('click', textInheritance);

})();

