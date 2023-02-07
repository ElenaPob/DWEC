'use strict';
(function (){
	let divExamples = document.getElementById('examples').children[7];
	let buttons = divExamples.getElementsByClassName('tab-pane')[1].getElementsByTagName('button');


	function bracketNotation(){
		$$result.clear();
		let product = {
			serial: "111-111-111",
			name: "Portátil",
			price: 750
		}
		for (let propertyName in product){
			$$result.log(propertyName + ": " + product[propertyName]);
		}
	}
	buttons[0].addEventListener('click', bracketNotation);

	function propertyDescriptorV1(){
		let product = {
			serial: "111-111-111",
			name: "Portátil",
			price: 750
		}
		// Object {value: 111-111-111,writable: true,enumerable: true,configurable: true,}
		$$result.log(Object.getOwnPropertyDescriptor(product, "serial"));
	}

	function writablePropertyV1(){
		let product = {
			serial: "111-111-111",
			name: "Portátil",
			price: 750
		}
		Object.defineProperty(product, "serial", {writable: false});
		try{
			product.serial = "222-222-222";
		} catch(error){
			//TypeError: Cannot assign to read only property 'serial' of object '#'
			$$result.log(error.message);
		}
	}

	function writablePropertyV2(){
		let product = {
			serial: "111-111-111",
			name: {
				brand: "HP",
				model: "EliteBook"
			},
			price: 750
		}
		Object.defineProperty(product, "name", {writable: false});
		product.name.model = "Pavilion";
		$$result.log(product.name.model); // Pavilion
	}

	function freezeMethod(){
		let product = {
			serial: "111-111-111",
			name: {
				brand: "HP",
				model: "EliteBook"
			},
			price: 750
		}
		Object.freeze(product.name);
		try{
			product.name.model = "Pavilion";
		} catch(error){
			//TypeError: Cannot assign to read only property 'model' of object '#'
			$$result.log(error.message);
		}
	}

	function enumerablePropertyV1(){
		let product = {
			serial: "111-111-111",
			name: "Portátil",
			price: 750
		}
		Object.defineProperty(product, "name", {enumerable: false});
		// serial: 111-111-111 price: 750
		for (let propertyName in product){
			$$result.log(propertyName + ": " + product[propertyName]);
		}
		$$result.log(product.name); // Portátil
		$$result.log(Object.keys(product)); //serial,price
		//{"serial":"111-111-111","price":750}
		$$result.log(JSON.stringify(product));
	}

	function configurablePropertyV1(){
		let product = {
			serial: "111-111-111",
			name: "Portátil",
			price: 750

		}
		Object.defineProperty(product, "name", {configurable: false});
		try{
			Object.defineProperty(product, "name", {enumerable: false});
		} catch (error){
			// TypeError: Cannot redefine property: name
			$$result.log(error.message);
		}
		try{
			delete(product.name);
		} catch (error){
			// TypeError: Cannot delete property 'name' of #
			$$result.log(error.message);
		}
	}

	buttons[1].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold("Método getOwnPropertyDescriptor");
		propertyDescriptorV1();
		$$result.logBold("Atributo writable");
		writablePropertyV1();
		$$result.logBold("Propiedad objeto como no writable");
		writablePropertyV2();
		$$result.logBold("Congelar un objeto");
		freezeMethod();
		$$result.logBold("Atributo enumerable");
		enumerablePropertyV1();
		$$result.logBold("Atributo configurable");
		configurablePropertyV1();
	});

	function getterAndSetter(){
		let product = {
			serial: "111-111-111",
			name: {
				brand: "HP",
				model: "EliteBook"
			},
			price: 750
		}
		Object.defineProperty(product, "fullName", {
			get: function() {
				return this.name.brand + " " + this.name.model;
			},
			set: function(value){
				let name = value.split(" ");
				this.name.brand = name[0];
				this.name.model = name[1];
			}
		});
		product.fullName = "HP Pavilion";
		$$result.log(product.fullName); // HP Pavilion
		$$result.log(product.name.brand); // HP
		$$result.log(product.name.model); // Pavilion
	}

	function getterAndSetterInLiteral(){
		let soldProducts = {
			soldProducts: [],
			get lastest(){
				return this.soldProducts[this.soldProducts.length-1];
			},
			set lastest(product){
				this.soldProducts.push(product);
			}
		}
		soldProducts.lastest = "111-111-111";
		soldProducts.lastest = "222-222-222";
		$$result.log(soldProducts.lastest); //222-222-222
	}

	buttons[2].addEventListener('click', function(){
		$$result.clear();
		$$result.logBold("Getter y Setter");
		getterAndSetter();
		$$result.logBold("Getter - Setter literales");
		getterAndSetterInLiteral();
	});

})();

